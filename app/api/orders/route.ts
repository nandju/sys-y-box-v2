/**
 * API Route pour la création de commandes et envoi de notifications email
 * POST /api/orders
 */

import { NextRequest, NextResponse } from "next/server";
import { sendOrderNotification, generateOrderNumber, formatOrderDate } from "@/lib/email/order-email";
import { OrderItem, OrderCustomer, OrderEmailData } from "@/types/order";

interface CreateOrderRequest {
  customer: {
    name: string;
    phone: string;
    email?: string;
    address: string;
    notes?: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
  paymentMethod: string;
}

// Set d'IDs de commandes déjà traitées pour éviter les doublons
const processedOrderIds = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequest = await request.json();

    // Validation des données requises
    if (!body.customer?.name || !body.customer?.phone || !body.customer?.address) {
      return NextResponse.json(
        { error: "Informations client incomplètes" },
        { status: 400 }
      );
    }

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Aucun article dans la commande" },
        { status: 400 }
      );
    }

    // Génération d'un ID unique pour cette commande
    const orderId = generateOrderNumber();

    // Vérification anti-doublon
    if (processedOrderIds.has(orderId)) {
      console.warn(`Commande ${orderId} déjà traitée, ignorée`);
      return NextResponse.json(
        { error: "Commande déjà traitée" },
        { status: 409 }
      );
    }

    // Marquer comme traité
    processedOrderIds.add(orderId);

    // Nettoyage automatique des IDs traités (après 1 heure)
    setTimeout(() => {
      processedOrderIds.delete(orderId);
    }, 60 * 60 * 1000);

    // Préparation des données pour l'email
    const orderEmailData: OrderEmailData = {
      orderNumber: orderId,
      orderDate: formatOrderDate(),
      customer: {
        name: body.customer.name,
        phone: body.customer.phone,
        email: body.customer.email,
        address: body.customer.address,
        notes: body.customer.notes,
      },
      items: body.items,
      subtotal: body.subtotal,
      shipping: body.shipping,
      total: body.total,
      currency: body.currency || "FCFA",
      paymentMethod: body.paymentMethod || "WhatsApp",
      paymentStatus: "En attente",
      orderStatus: "Nouvelle commande",
    };

    // Envoi de la notification email
    const emailResult = await sendOrderNotification(orderEmailData);

    if (!emailResult.success) {
      console.error("Échec de l'envoi d'email:", emailResult.error);
      // On ne bloque pas la commande si l'email échoue, mais on log l'erreur
      // Dans un système de production, on pourrait mettre en place un système de retry
    }

    // Réponse succès
    return NextResponse.json({
      success: true,
      orderId,
      emailSent: emailResult.success,
      emailMessageId: emailResult.messageId,
      message: "Commande créée avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la création de commande:", error);
    return NextResponse.json(
      {
        error: "Erreur lors de la création de commande",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
