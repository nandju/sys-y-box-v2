/**
 * Service d'envoi d'emails de commande SYS'Y BOX EVENTS
 * Utilise Resend pour l'envoi d'emails transactionnels
 */

import { Resend } from "resend";
import { OrderEmailData } from "@/types/order";
import { generateOrderEmailHTML, generateOrderEmailText } from "./order-email-template";

// Validation des variables d'environnement
const REQUIRED_ENV_VARS = [
  "RESEND_API_KEY",
  "ORDER_EMAIL_TO",
  "ORDER_EMAIL_FROM",
] as const;

function validateEnvVars(): void {
  const missing = REQUIRED_ENV_VARS.filter((varName) => !process.env[varName]);
  if (missing.length > 0) {
    throw new Error(
      `Variables d'environnement manquantes: ${missing.join(", ")}`
    );
  }
}

// Initialisation du client Resend
function getResendClient(): Resend {
  validateEnvVars();
  return new Resend(process.env.RESEND_API_KEY!);
}

/**
 * Envoie une notification de commande par email
 * @param orderData - Données de la commande
 * @returns Promise avec le résultat de l'envoi
 */
export async function sendOrderNotification(
  orderData: OrderEmailData
): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    // Validation des données
    if (!orderData.orderNumber || !orderData.customer.name || !orderData.customer.phone) {
      throw new Error("Données de commande incomplètes");
    }

    // Nettoyage et validation des données
    const sanitizedData = sanitizeOrderData(orderData);

    const resend = getResendClient();

    // Génération des contenus email
    const htmlContent = generateOrderEmailHTML(sanitizedData);
    const textContent = generateOrderEmailText(sanitizedData);

    // Construction du sujet
    const subject = `[SYS'Y BOX] Nouvelle commande #${sanitizedData.orderNumber} — TOTAL ${sanitizedData.total.toLocaleString()} ${sanitizedData.currency}`;

    // Envoi de l'email
    const { data, error } = await resend.emails.send({
      from: process.env.ORDER_EMAIL_FROM!,
      to: process.env.ORDER_EMAIL_TO!,
      subject,
      html: htmlContent,
      text: textContent,
      replyTo: sanitizedData.customer.email || undefined,
    });

    if (error) {
      console.error("Erreur d'envoi d'email:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    console.log("Email de commande envoyé avec succès:", data?.id);
    return {
      success: true,
      messageId: data?.id,
    };
  } catch (error) {
    console.error("Erreur lors de l'envoi de notification de commande:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
    };
  }
}

/**
 * Nettoie et valide les données de commande pour éviter les injections
 */
function sanitizeOrderData(data: OrderEmailData): OrderEmailData {
  return {
    orderNumber: sanitizeString(data.orderNumber),
    orderDate: sanitizeString(data.orderDate),
    customer: {
      name: sanitizeString(data.customer.name),
      phone: sanitizeString(data.customer.phone),
      email: data.customer.email ? sanitizeEmail(data.customer.email) : undefined,
      address: sanitizeString(data.customer.address),
      notes: data.customer.notes ? sanitizeString(data.customer.notes) : undefined,
    },
    items: data.items.map((item) => ({
      ...item,
      name: sanitizeString(item.name),
      description: sanitizeString(item.description),
    })),
    subtotal: data.subtotal,
    shipping: data.shipping,
    total: data.total,
    currency: sanitizeString(data.currency),
    paymentMethod: sanitizeString(data.paymentMethod),
    paymentStatus: sanitizeString(data.paymentStatus),
    orderStatus: sanitizeString(data.orderStatus),
  };
}

/**
 * Nettoie une chaîne de caractères pour éviter les injections
 */
function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Supprime les caractères HTML dangereux
    .substring(0, 500); // Limite la longueur
}

/**
 * Valide et nettoie une adresse email
 */
function sanitizeEmail(email: string): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Adresse email invalide");
  }
  return email.trim().toLowerCase().substring(0, 254);
}

/**
 * Génère un numéro de commande unique
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `SYS-${timestamp}-${random}`;
}

/**
 * Formate la date actuelle pour l'email
 */
export function formatOrderDate(): string {
  return new Date().toLocaleString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
