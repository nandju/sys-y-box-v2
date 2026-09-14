"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { useCart } from "./cart-context"

type Category = "femme" | "homme" | "bouquets"

const products = [
  // Catalogue Femme
  {
    id: "femme-1",
    name: "Box Femme Élégance",
    description: "Collection exclusive pour les moments spéciaux",
    price: 25000,
    originalPrice: null,
    image: "/image/shop/catalogue-femme/IMG_2287.JPG",
    badge: "Meilleure vente",
    category: "femme" as Category
  },
  {
    id: "femme-2",
    name: "Coffret Femme Premium",
    description: "Set de luxe pour célébrer en beauté",
    price: 35000,
    originalPrice: null,
    image: "/image/shop/catalogue-femme/IMG_2288.JPG",
    badge: null,
    category: "femme" as Category
  },
  {
    id: "femme-3",
    name: "Box Femme Romantique",
    description: "Création délicate pour les âmes romantiques",
    price: 28000,
    originalPrice: null,
    image: "/image/shop/catalogue-femme/IMG_2289.JPG",
    badge: "Nouveau",
    category: "femme" as Category
  },
  {
    id: "femme-4",
    name: "Coffret Femme Soirée",
    description: "Kit parfait pour vos événements élégants",
    price: 40000,
    originalPrice: 50000,
    image: "/image/shop/catalogue-femme/IMG_2692.JPG",
    badge: "Promo",
    category: "femme" as Category
  },
  // Catalogue Homme
  {
    id: "homme-1",
    name: "Box Homme Classique",
    description: "Collection intemporelle pour hommes exigeants",
    price: 30000,
    originalPrice: null,
    image: "/image/shop/catalogue-homme/IMG_2290.JPG",
    badge: null,
    category: "homme" as Category
  },
  {
    id: "homme-2",
    name: "Coffret Homme Executive",
    description: "Set premium pour le professionnel accompli",
    price: 45000,
    originalPrice: 55000,
    image: "/image/shop/catalogue-homme/IMG_2684.JPG",
    badge: "Promo",
    category: "homme" as Category
  },
  {
    id: "homme-3",
    name: "Box Homme Sportif",
    description: "Collection dynamique pour hommes actifs",
    price: 32000,
    originalPrice: null,
    image: "/image/shop/catalogue-homme/IMG_2685.JPG",
    badge: "Meilleure vente",
    category: "homme" as Category
  },
  {
    id: "homme-4",
    name: "Coffret Homme Luxe",
    description: "Création exclusive pour les moments précieux",
    price: 55000,
    originalPrice: null,
    image: "/image/shop/catalogue-homme/IMG_2859.JPG",
    badge: null,
    category: "homme" as Category
  },
  // Bouquets Argent
  {
    id: "bouquet-1",
    name: "Bouquet Argent Classic",
    description: "Arrangement floral élégant et raffiné",
    price: 20000,
    originalPrice: null,
    image: "/image/shop/catalogue-bouquet-argent/IMG_5296.jpg",
    badge: "Nouveau",
    category: "bouquets" as Category
  },
  {
    id: "bouquet-2",
    name: "Bouquet Argent Premium",
    description: "Composition florale luxueuse et exceptionnelle",
    price: 35000,
    originalPrice: null,
    image: "/image/shop/catalogue-bouquet-argent/IMG_5297.jpg",
    badge: null,
    category: "bouquets" as Category
  },
  {
    id: "bouquet-3",
    name: "Bouquet Argent Royal",
    description: "Création majestueuse pour les grandes occasions",
    price: 50000,
    originalPrice: null,
    image: "/image/shop/catalogue-bouquet-argent/IMG_5298.jpg",
    badge: null,
    category: "bouquets" as Category
  },
  {
    id: "bouquet-4",
    name: "Bouquet Argent Signature",
    description: "Notre création signature, inoubliable et unique",
    price: 65000,
    originalPrice: null,
    image: "/image/shop/catalogue-bouquet-argent/IMG_5299.jpg",
    badge: "Meilleure vente",
    category: "bouquets" as Category
  }
]

const categories = [
  { value: "femme" as Category, label: "Femme" },
  { value: "homme" as Category, label: "Homme" },
  { value: "bouquets" as Category, label: "Bouquets Argent" }
]

export function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("femme")
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
                left: selectedCategory === 'femme' ? '4px' : selectedCategory === 'homme' ? 'calc(33.333% + 2px)' : 'calc(66.666%)',
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
                    <span className="font-medium text-[#572D15]">{product.price.toLocaleString()} FCFA</span>
                    {product.originalPrice && (
                      <span className="text-sm text-[#2B160C] line-through">
                        {product.originalPrice.toLocaleString()} FCFA
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
