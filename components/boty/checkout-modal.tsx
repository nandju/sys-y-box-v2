"use client"

import { useState } from "react"
import { useCart } from "./cart-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function CheckoutModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, subtotal, clearCart } = useCart()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Format order details for WhatsApp
    const orderItems = items.map(item => 
      `• ${item.name} (${item.quantity}x) - ${(item.price * item.quantity).toLocaleString()} FCFA`
    ).join('\n')

    const message = `
🎉 *NOUVELLE COMMANDE SYS'Y BOX EVENTS*

👤 *Informations du client*
Nom: ${formData.name}
Téléphone: ${formData.phone}
Email: ${formData.email}
Adresse: ${formData.address}

📦 *Détails de la commande*
${orderItems}

💰 *Total: ${subtotal.toLocaleString()} FCFA*

📝 *Notes supplémentaires*
${formData.notes || "Aucune note"}

Merci pour votre commande ! Nous vous contacterons bientôt.
    `.trim()

    // WhatsApp number (replace with actual number)
    const whatsappNumber = "2250748447444" // Côte d'Ivoire format
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank')

    // Clear cart after successful order
    clearCart()
    setIsSubmitting(false)
    onClose()
  }

  if (items.length === 0) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-[#572D15]">
            Finaliser votre commande
          </DialogTitle>
          <DialogDescription>
            Remplissez vos informations pour envoyer votre commande via WhatsApp
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Order Summary */}
          <div className="bg-[#FCF8EF] p-4 rounded-lg space-y-2">
            <h3 className="font-medium text-[#572D15]">Récapitulatif de commande</h3>
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} (x{item.quantity})</span>
                <span>{(item.price * item.quantity).toLocaleString()} FCFA</span>
              </div>
            ))}
            <div className="flex justify-between font-medium text-[#572D15] pt-2 border-t border-[#C8982C]">
              <span>Total</span>
              <span>{subtotal.toLocaleString()} FCFA</span>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="name" className="text-[#572D15]">Nom complet *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Votre nom"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-[#572D15]">Téléphone *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+225 XX XX XX XX XX"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-[#572D15]">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="address" className="text-[#572D15]">Adresse de livraison *</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Votre adresse complète"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="notes" className="text-[#572D15]">Notes supplémentaires</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Instructions spéciales, date de livraison souhaitée, etc."
                className="mt-1"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-[#C8982C] text-[#572D15]"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#572D15] text-[#FCF8EF] hover:bg-[#2B160C]"
            >
              {isSubmitting ? "Envoi en cours..." : "Commander sur WhatsApp"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
