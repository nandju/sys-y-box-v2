/**
 * Template d'email de notification de commande SYS'Y BOX EVENTS
 * Génère les versions HTML et texte des emails de commande
 */

import { OrderEmailData } from "@/types/order";

// Couleurs SYS'Y BOX EVENTS
const COLORS = {
  chocolate: "#572D15",
  chocolateDark: "#2B160C",
  gold: "#EABC3D",
  goldDeep: "#C8982C",
  cream: "#FCF8EF",
  red: "#AA2D25",
};

export function generateOrderEmailHTML(data: OrderEmailData): string {
  const {
    orderNumber,
    orderDate,
    customer,
    items,
    subtotal,
    shipping,
    total,
    currency,
    paymentMethod,
    paymentStatus,
    orderStatus,
  } = data;

  const orderItemsHTML = items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid ${COLORS.goldDeep};">
        <div style="font-weight: 600; color: ${COLORS.chocolate};">${item.name}</div>
        <div style="font-size: 12px; color: ${COLORS.chocolateDark}; margin-top: 4px;">${
          item.description
        }</div>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid ${COLORS.goldDeep}; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid ${COLORS.goldDeep}; text-align: right;">
        ${item.price.toLocaleString()} ${currency}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid ${COLORS.goldDeep}; text-align: right; font-weight: 600;">
        ${(item.price * item.quantity).toLocaleString()} ${currency}
      </td>
    </tr>
  `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Commande #${orderNumber} - SYS'Y BOX EVENTS</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: ${COLORS.cream};">
  <div style="max-width: 600px; margin: 0 auto; background-color: ${COLORS.cream};">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, ${COLORS.chocolate} 0%, ${COLORS.chocolateDark} 100%); padding: 30px; text-align: center;">
      <h1 style="color: ${COLORS.gold}; margin: 0; font-size: 28px; font-weight: 700;">SYS'Y BOX EVENTS</h1>
      <p style="color: ${COLORS.cream}; margin: 10px 0 0 0; font-size: 16px;">Nouvelle commande reçue</p>
    </div>

    <!-- Order Info -->
    <div style="background: white; padding: 25px; margin: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(87, 45, 21, 0.1);">
      <h2 style="color: ${COLORS.chocolate}; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid ${COLORS.gold}; padding-bottom: 10px;">
        Commande #${orderNumber}
      </h2>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
        <div>
          <strong style="color: ${COLORS.chocolateDark};">Date:</strong>
          <span style="color: ${COLORS.chocolate};">${orderDate}</span>
        </div>
        <div>
          <strong style="color: ${COLORS.chocolateDark};">Statut:</strong>
          <span style="color: ${COLORS.red}; font-weight: 600;">${orderStatus}</span>
        </div>
      </div>

      <!-- Customer Info -->
      <div style="background: ${COLORS.cream}; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
        <h3 style="color: ${COLORS.chocolate}; margin: 0 0 15px 0; font-size: 16px;">Informations du client</h3>
        <div style="line-height: 1.8; color: ${COLORS.chocolateDark};">
          <div><strong>Nom:</strong> ${customer.name}</div>
          <div><strong>Téléphone:</strong> ${customer.phone}</div>
          ${customer.email ? `<div><strong>Email:</strong> ${customer.email}</div>` : ""}
          <div><strong>Adresse:</strong> ${customer.address}</div>
          ${customer.notes ? `<div><strong>Notes:</strong> ${customer.notes}</div>` : ""}
        </div>
      </div>

      <!-- Order Items -->
      <h3 style="color: ${COLORS.chocolate}; margin: 0 0 15px 0; font-size: 16px;">Articles commandés</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background: ${COLORS.gold}; color: ${COLORS.chocolateDark};">
            <th style="padding: 12px; text-align: left; font-weight: 600;">Article</th>
            <th style="padding: 12px; text-align: center; font-weight: 600;">Qté</th>
            <th style="padding: 12px; text-align: right; font-weight: 600;">Prix unitaire</th>
            <th style="padding: 12px; text-align: right; font-weight: 600;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${orderItemsHTML}
        </tbody>
      </table>

      <!-- Totals -->
      <div style="background: ${COLORS.chocolate}; color: ${COLORS.cream}; padding: 20px; border-radius: 6px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span>Sous-total:</span>
          <span>${subtotal.toLocaleString()} ${currency}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span>Livraison:</span>
          <span>${shipping === 0 ? "Offerte" : shipping.toLocaleString() + " " + currency}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: 700; border-top: 1px solid ${COLORS.gold}; padding-top: 10px;">
          <span>TOTAL:</span>
          <span>${total.toLocaleString()} ${currency}</span>
        </div>
      </div>

      <!-- Payment Info -->
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid ${COLORS.goldDeep};">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
          <div>
            <strong style="color: ${COLORS.chocolateDark};">Mode de paiement:</strong>
            <span style="color: ${COLORS.chocolate};">${paymentMethod}</span>
          </div>
          <div>
            <strong style="color: ${COLORS.chocolateDark};">Statut paiement:</strong>
            <span style="color: ${paymentStatus === "Payé" ? COLORS.gold : COLORS.red}; font-weight: 600;">${paymentStatus}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding: 20px; color: ${COLORS.chocolateDark}; font-size: 12px;">
      <p style="margin: 0;">© ${new Date().getFullYear()} SYS'Y BOX EVENTS - Tous droits réservés</p>
      <p style="margin: 10px 0 0 0;">Cet email a été généré automatiquement par le système de commande.</p>
    </div>
  </div>
</body>
</html>
  `;
}

export function generateOrderEmailText(data: OrderEmailData): string {
  const {
    orderNumber,
    orderDate,
    customer,
    items,
    subtotal,
    shipping,
    total,
    currency,
    paymentMethod,
    paymentStatus,
    orderStatus,
  } = data;

  const orderItemsText = items
    .map(
      (item) =>
        `  • ${item.name} (x${item.quantity}) - ${item.price.toLocaleString()} ${currency} = ${(item.price * item.quantity).toLocaleString()} ${currency}`
    )
    .join("\n");

  return `
SYS'Y BOX EVENTS - NOUVELLE COMMANDE
=====================================

COMMANDE #${orderNumber}
Date: ${orderDate}
Statut: ${orderStatus}

INFORMATIONS DU CLIENT
----------------------
Nom: ${customer.name}
Téléphone: ${customer.phone}
${customer.email ? `Email: ${customer.email}` : ""}
Adresse: ${customer.address}
${customer.notes ? `Notes: ${customer.notes}` : ""}

ARTICLES COMMANDÉS
-----------------
${orderItemsText}

RÉCAPITULATIF FINANCIER
----------------------
Sous-total: ${subtotal.toLocaleString()} ${currency}
Livraison: ${shipping === 0 ? "Offerte" : shipping.toLocaleString() + " " + currency}
TOTAL: ${total.toLocaleString()} ${currency}

Mode de paiement: ${paymentMethod}
Statut paiement: ${paymentStatus}

=====================================
© ${new Date().getFullYear()} SYS'Y BOX EVENTS
  `.trim();
}
