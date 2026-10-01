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

    try {
      // Préparation des données de commande
      const orderData = {
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          address: formData.address,
          notes: formData.notes || undefined,
        },
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal: subtotal,
        shipping: 0,
        total: subtotal,
        currency: "FCFA",
        paymentMethod: "Email",
      }

      // Envoi de la notification email via API
      const apiResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      const apiResult = await apiResponse.json()

      if (!apiResponse.ok) {
        console.error('Erreur API:', apiResult.error)
        throw new Error('Erreur lors de l\'envoi de la commande')
      }

      // Commande réussie
      console.log('Commande créée avec succès:', apiResult.orderId)
      console.log('Notification email envoyée:', apiResult.emailSent)

      // Clear cart after successful order
      clearCart()
      setIsSubmitting(false)
      onClose()

      // Alert de confirmation
      alert(`✅ Commande effectuée avec succès !\n\nNuméro de commande: ${apiResult.orderId}\n\nVous recevrez une confirmation par email.\nNous vous contacterons bientôt pour finaliser votre commande.`)
    } catch (error) {
      console.error('Erreur lors de la commande:', error)
      setIsSubmitting(false)
      alert('Une erreur est survenue lors de la commande. Veuillez réessayer.')
    }
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
            Remplissez vos informations pour finaliser votre commande
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
              {isSubmitting ? "Traitement en cours..." : "Confirmer la commande"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
