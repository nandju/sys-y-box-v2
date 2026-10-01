# Guide de Configuration du Système de Notification Email - SYS'Y BOX EVENTS

## 📋 Vue d'ensemble

Ce système permet d'envoyer automatiquement des notifications email détaillées lorsqu'une commande est passée sur SYS'Y BOX EVENTS.

## 🏗️ Architecture

```
SYS'Y BOX EVENTS (Next.js)
    ↓
API Route /api/orders
    ↓
Service Resend (envoi d'emails)
    ↓
nlbmd17@gmail.com (version test)
    ↓
Plus tard: commandes@sysyboxevents.com
```

**Séparation des responsabilités:**
- **Réception emails**: Cloudflare Email Routing (pour recevoir les emails des clients)
- **Envoi notifications**: Resend (pour envoyer les emails de commande)

## 📁 Fichiers Créés/Modifiés

### Nouveaux fichiers:
1. **types/order.ts** - Types TypeScript pour les commandes
2. **lib/email/order-email-template.ts** - Templates HTML et texte des emails
3. **lib/email/order-email.ts** - Service d'envoi d'emails avec Resend
4. **app/api/orders/route.ts** - API Route pour la création de commandes
5. **.env.example** - Exemple de configuration environnement
6. **.env.local** - Configuration locale (à compléter)
7. **EMAIL_SETUP_GUIDE.md** - Ce guide

### Fichiers modifiés:
1. **components/boty/checkout-modal.tsx** - Intégration de l'API email
2. **package.json** - Ajout de la dépendance Resend

## 📦 Packages Installés

```bash
pnpm add resend
```

## 🔧 Variables d'Environnement

### Variables requises dans `.env.local`:

```env
RESEND_API_KEY=re_votre_clé_api_ici
ORDER_EMAIL_TO=nlbmd17@gmail.com
ORDER_EMAIL_FROM=votre_email_verifié_sur_resend@exemple.com
```

### Description des variables:

- **RESEND_API_KEY**: Clé API pour le service Resend
- **ORDER_EMAIL_TO**: Email de réception des notifications de commande
- **ORDER_EMAIL_FROM**: Email d'expédition (doit être vérifié sur Resend)

## 🚀 Étapes de Configuration

### 1. Obtenir une clé API Resend

1. Créez un compte sur https://resend.com
2. Allez dans API Keys: https://resend.com/api-keys
3. Cliquez sur "Create API Key"
4. Nommez la clé "SYS'Y BOX EVENTS"
5. Copiez la clé générée
6. Ajoutez-la à `.env.local`: `RESEND_API_KEY=re_votre_clé_ici`

### 2. Vérifier un email d'expédition sur Resend

1. Dans Resend, allez dans "Domains"
2. Ajoutez votre domaine ou utilisez votre email personnel
3. Resend enverra un email de vérification
4. Cliquez sur le lien de vérification
5. Utilisez cet email comme `ORDER_EMAIL_FROM`

### 3. Configurer Cloudflare Email Routing (Réception)

**Pour la version test, cette étape est optionnelle mais recommandée pour la production:**

1. Connectez-vous à Cloudflare: https://dash.cloudflare.com
2. Sélectionnez votre domaine sysyboxevents.com
3. Allez dans "Email" > "Email Routing"
4. Cliquez sur "Enable Email Routing"
5. Cliquez sur "Create custom address"
6. Configurez:
   - **Custom address**: `commandes`
   - **Destination**: `nlbmd17@gmail.com`
7. Cloudflare enverra un email de vérification à nlbmd17@gmail.com
8. Cliquez sur le lien de vérification

**Architecture finale:**
```
commandes@sysyboxevents.com → Cloudflare → nlbmd17@gmail.com
```

### 4. Tester le système

1. Démarrez le serveur de développement:
   ```bash
   pnpm dev
   ```

2. Accédez à http://localhost:3000

3. Ajoutez des produits au panier

4. Complétez le checkout avec des informations test

5. Vérifiez que:
   - L'email est reçu sur nlbmd17@gmail.com
   - L'email contient toutes les informations de commande
   - Le design est cohérent avec SYS'Y BOX EVENTS
   - Le WhatsApp s'ouvre toujours normalement

## 🔄 Changer l'Email de Réception

Pour remplacer `nlbmd17@gmail.com` par l'adresse professionnelle:

1. Modifiez `.env.local`:
   ```env
   ORDER_EMAIL_TO=votre_nouvel_email@sysyboxevents.com
   ```

2. Redémarrez le serveur de développement

3. Testez une nouvelle commande

## 🛡️ Sécurité

- ✅ Aucune clé API exposée dans le frontend
- ✅ Toutes les clés dans les variables d'environnement
- ✅ Validation et nettoyage des données
- ✅ Protection contre les injections HTML
- ✅ Mécanisme anti-doublon
- ✅ `.env.local` dans `.gitignore`

## 📧 Contenu de l'Email

L'email de notification contient:

- ✅ Numéro de commande unique
- ✅ Date et heure
- ✅ Nom complet du client
- ✅ Numéro de téléphone
- ✅ Email du client (si disponible)
- ✅ Adresse de livraison
- ✅ Notes du client
- ✅ Liste complète des produits
- ✅ Quantités et prix unitaires
- ✅ Sous-total et total
- ✅ Frais de livraison
- ✅ Mode de paiement
- ✅ Statut de paiement

## 🎨 Design de l'Email

- Couleurs SYS'Y BOX EVENTS intégrées
- Responsive (mobile, tablette, desktop)
- Compatible Gmail, Outlook, Apple Mail
- Version HTML et texte brut

## 🔍 Dépannage

### L'email n'est pas reçu:

1. Vérifiez que les variables d'environnement sont correctement définies
2. Vérifiez que la clé API Resend est valide
3. Vérifiez que l'email d'expédition est vérifié sur Resend
4. Consultez les logs du serveur pour les erreurs

### Erreur "Variables d'environnement manquantes":

1. Assurez-vous que `.env.local` existe à la racine du projet
2. Vérifiez que toutes les variables requises sont définies
3. Redémarrez le serveur de développement

### L'email est reçu mais le design est cassé:

1. Certains clients email ne supportent pas bien le HTML
2. La version texte brut est incluse pour ces cas
3. Vérifiez que le client email supporte le HTML

## 🚀 Pour la Production

1. Obtenez un nom de domaine professionnel
2. Configurez Cloudflare Email Routing pour la réception
3. Obtenez une clé API Resend de production
4. Configurez les variables d'environnement de production
5. Testez thoroughly avant le déploiement

## 📝 Notes Importantes

- Le système WhatsApp existant est **entièrement conservé**
- L'email est une **notification supplémentaire** pour le propriétaire
- Le client ne voit aucune clé API ou information technique
- En cas d'échec d'envoi d'email, la commande continue via WhatsApp
- Les emails ne sont envoyés que depuis le serveur (API Route)

## 🔮 Fonctionnalités Futures (Non implémentées)

L'architecture est prête pour:
- Email de confirmation au client
- Email de statut de commande
- Email de préparation/expédition
- Notification WhatsApp automatique
- Système de retry pour les emails échoués

## ✅ Checklist de Validation

- [ ] Package Resend installé
- [ ] Variables d'environnement configurées
- [ ] Clé API Resend obtenue et ajoutée
- [ ] Email d'expédition vérifié sur Resend
- [ ] API Route /api/orders fonctionne
- [ ] Email de notification reçu sur nlbmd17@gmail.com
- [ ] Design email cohérent avec SYS'Y BOX EVENTS
- [ ] WhatsApp fonctionne toujours normalement
- [ ] Aucune clé API exposée dans le frontend
- [ ] `.env.local` dans `.gitignore`
- [ ] Cloudflare Email Routing configuré (optionnel pour test)
