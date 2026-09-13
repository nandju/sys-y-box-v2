"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { useCart } from "./cart-context"

type Category = "celebrations" | "decoration" | "coffrets"

const products = [
  // Coffrets cadeaux
  {
    id: "coffret-anniversaire",
    name: "Coffret Anniversaire Premium",
    description: "Box personnalisée pour fêter vos moments spéciaux",
    price: 89,
    originalPrice: null,
    image: "/images/products/serum-bottles-1.png",
    badge: "Meilleure vente",
    category: "coffrets" as Category
  },
  {
    id: "coffret-mariage",
    name: "Coffret Mariage Élégant",
    description: "Set de luxe pour le jour J et les témoins",
    price: 129,
    originalPrice: null,
    image: "/images/products/eye-serum-bottles.png",
    badge: null,
    category: "coffrets" as Category
  },
  {
    id: "coffret-naissance",
    name: "Coffret Naissance Douceur",
    description: "Box bienvenue bébé avec articles personnalisés",
    price: 75,
    originalPrice: null,
    image: "/images/products/amber-dropper-bottles.png",
    badge: "Nouveau",
    category: "coffrets" as Category
  },
  {
    id: "coffret-entreprise",
    name: "Coffret Entreprise Pro",
    description: "Kit corporate personnalisé pour vos événements",
    price: 95,
    originalPrice: 120,
    image: "/images/products/spray-bottles.png",
    badge: "Promo",
    category: "coffrets" as Category
  },
  // Célébrations
  {
    id: "box-anniversaire-adulte",
    name: "Box Anniversaire Adulte",
    description: "Célébration personnalisée pour vos 18, 30, 50 ans",
    price: 65,
    originalPrice: null,
    image: "/images/products/cream-jars-colored.png",
    badge: null,
    category: "celebrations" as Category
  },
  {
    id: "box-bapteme",
    name: "Box Baptême Chéri",
    description: "Décoration et souvenirs pour ce jour unique",
    price: 45,
    originalPrice: 58,
    image: "/images/products/tube-bottles.png",
    badge: "Promo",
    category: "celebrations" as Category
  },
  {
    id: "box-gala",
    name: "Box Soirée de Gala",
    description: "Accessoires et détails pour vos événements formels",
    price: 110,
    originalPrice: null,
    image: "/images/products/jars-wooden-lid.png",
    badge: "Meilleure vente",
    category: "celebrations" as Category
  },
  {
    id: "box-retraite",
    name: "Box Fête de Retraite",
    description: "Célébration de carrière avec personnalisations",
    price: 85,
    originalPrice: null,
    image: "/images/products/pump-bottles-lavender.png",
    badge: null,
    category: "celebrations" as Category
  },
  // Décoration
  {
    id: "kit-decoration-table",
    name: "Kit Décoration Table",
    description: "Ensemble complet pour dressage de table personnalisé",
    price: 55,
    originalPrice: null,
    image: "/images/products/amber-dropper-bottles.png",
    badge: "Nouveau",
    category: "decoration" as Category
  },
  {
    id: "ballons-personnalises",
    name: "Ballons Personnalisés",
    description: "Kit ballons avec textes et photos personnalisés",
    price: 35,
    originalPrice: null,
    image: "/images/products/serum-bottles-1.png",
    badge: null,
    category: "decoration" as Category
  },
  {
    id: "photobooth-accessoires",
    name: "Accessoires Photobooth",
    description: "Kit accessoires fun pour vos photos souvenir",
    price: 42,
    originalPrice: null,
    image: "/images/products/spray-bottles.png",
    badge: null,
    category: "decoration" as Category
  },
  {
    id: "centre-table-luxe",
    name: "Centre de Table Luxe",
    description: "Arrangements floraux et décorations de table",
    price: 78,
    originalPrice: null,
    image: "/images/products/pump-bottles-cream.png",
    badge: "Meilleure vente",
    category: "decoration" as Category
  }
]

const categories = [
  { value: "celebrations" as Category, label: "Célébrations" },
  { value: "decoration" as Category, label: "Décoration" },
  { value: "coffrets" as Category, label: "Coffrets cadeaux" }
]

export function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("celebrations")
  const [isVisible, setIsVisible] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()
  
  const filteredProducts = products.filter(product => product.category === selectedCategory)

  const handleCategoryChange = (category: Category) => {
    if (category !== selectedCategory) {
      setIsTransitioning(true)
      setTimeout(() => {
        setSelectedCategory(category)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 50)
      }, 300)
    }
  }

  // Preload all product images on mount
  useEffect(() => {
    products.forEach((product) => {
      const img = new window.Image()
      img.src = product.image
    })
  }, [])

  useEffect(() => {
    const gridObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (gridRef.current) {
      gridObserver.observe(gridRef.current)
    }

    if (headerRef.current) {
      headerObserver.observe(headerRef.current)
    }

    return () => {
      if (gridRef.current) {
        gridObserver.unobserve(gridRef.current)
      }
      if (headerRef.current) {
        headerObserver.unobserve(headerRef.current)
      }
    }
  }, [])

  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className={`text-sm tracking-[0.3em] uppercase text-primary mb-4 block ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
            Notre collection
          </span>
          <h2 className={`font-serif leading-tight text-foreground mb-4 text-balance text-7xl ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
            Des expériences uniques
          </h2>
          <p className={`text-lg text-muted-foreground max-w-md mx-auto ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}}>
            Des offres imaginées avec soin pour vos plus beaux moments
          </p>
        </div>

        {/* Segmented Control */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[#FCF8EF] rounded-full p-1 gap-1 relative">
            {/* Animated background slide */}
            <div
              className="absolute top-1 bottom-1 bg-[#572D15] rounded-full transition-all duration-300 ease-out shadow-sm"
              style={{
                left: selectedCategory === 'celebrations' ? '4px' : selectedCategory === 'decoration' ? 'calc(33.333% + 2px)' : 'calc(66.666%)',
                width: 'calc(33.333% - 4px)'
              }}
            />
            {categories.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => handleCategoryChange(category.value)}
                className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.value
                    ? "text-[#FCF8EF]"
                    : "text-[#2B160C] hover:text-[#572D15]"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div 
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <Link
              key={`${selectedCategory}-${product.id}`}
              href={`/product/${product.id}`}
              className={`group transition-all duration-500 ease-out ${
                isVisible && !isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: isTransitioning ? '0ms' : `${index * 80}ms` }}
            >
              <div className="bg-[#FCF8EF] rounded-3xl overflow-hidden boty-shadow boty-transition group-hover:scale-[1.02]">
                {/* Image */}
                <div className="relative aspect-square bg-muted overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover boty-transition group-hover:scale-105"
                  />
                  {/* Badge */}
                  {product.badge && (
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs tracking-wide ${
                        product.badge === "Promo"
                          ? "bg-[#AA2D25] text-[#FCF8EF]"
                          : product.badge === "Nouveau"
                          ? "bg-[#EABC3D] text-[#572D15]"
                          : "bg-[#C8982C] text-[#FCF8EF]"
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                  {/* Quick add button */}
                  <button
                    type="button"
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#FCF8EF]/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 boty-transition boty-shadow"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      addItem({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        image: product.image
                      })
                    }}
                    aria-label="Ajouter au panier"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#572D15]" />
                  </button>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-serif text-lg text-[#572D15] mb-1">{product.name}</h3>
                  <p className="text-sm text-[#2B160C] mb-3">{product.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#572D15]">{product.price}€</span>
                    {product.originalPrice && (
                      <span className="text-sm text-[#2B160C] line-through">
                        {product.originalPrice}€
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-[#C8982C] text-[#572D15] px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-[#EABC3D]/10"
          >
            Voir toutes nos offres
          </Link>
        </div>
      </div>
    </section>
  )
}
