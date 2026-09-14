"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, SlidersHorizontal, X } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

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
    category: "femme"
  },
  {
    id: "femme-2",
    name: "Coffret Femme Premium",
    description: "Set de luxe pour célébrer en beauté",
    price: 35000,
    originalPrice: null,
    image: "/image/shop/catalogue-femme/IMG_2288.JPG",
    badge: null,
    category: "femme"
  },
  {
    id: "femme-3",
    name: "Box Femme Romantique",
    description: "Création délicate pour les âmes romantiques",
    price: 28000,
    originalPrice: null,
    image: "/image/shop/catalogue-femme/IMG_2289.JPG",
    badge: "Nouveau",
    category: "femme"
  },
  {
    id: "femme-4",
    name: "Coffret Femme Soirée",
    description: "Kit parfait pour vos événements élégants",
    price: 40000,
    originalPrice: 50000,
    image: "/image/shop/catalogue-femme/IMG_2692.JPG",
    badge: "Promo",
    category: "femme"
  },
  {
    id: "femme-5",
    name: "Box Femme Classic",
    description: "Collection classique pour femmes exigeantes",
    price: 22000,
    originalPrice: null,
    image: "/image/shop/catalogue-femme/IMG_2693.JPG",
    badge: null,
    category: "femme"
  },
  {
    id: "femme-6",
    name: "Coffret Femme Luxe",
    description: "Création luxueuse pour les grandes occasions",
    price: 45000,
    originalPrice: null,
    image: "/image/shop/catalogue-femme/IMG_3625.JPG",
    badge: "Meilleure vente",
    category: "femme"
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
    category: "homme"
  },
  {
    id: "homme-2",
    name: "Coffret Homme Executive",
    description: "Set premium pour le professionnel accompli",
    price: 45000,
    originalPrice: 55000,
    image: "/image/shop/catalogue-homme/IMG_2684.JPG",
    badge: "Promo",
    category: "homme"
  },
  {
    id: "homme-3",
    name: "Box Homme Sportif",
    description: "Collection dynamique pour hommes actifs",
    price: 32000,
    originalPrice: null,
    image: "/image/shop/catalogue-homme/IMG_2685.JPG",
    badge: "Meilleure vente",
    category: "homme"
  },
  {
    id: "homme-4",
    name: "Coffret Homme Luxe",
    description: "Création exclusive pour les moments précieux",
    price: 55000,
    originalPrice: null,
    image: "/image/shop/catalogue-homme/IMG_2859.JPG",
    badge: null,
    category: "homme"
  },
  {
    id: "homme-5",
    name: "Box Homme Business",
    description: "Kit professionnel pour hommes d'affaires",
    price: 38000,
    originalPrice: null,
    image: "/image/shop/catalogue-homme/IMG_2870.JPG",
    badge: "Nouveau",
    category: "homme"
  },
  {
    id: "homme-6",
    name: "Coffret Homme Signature",
    description: "Notre création signature exclusive",
    price: 60000,
    originalPrice: null,
    image: "/image/shop/catalogue-homme/IMG_3768.JPG",
    badge: null,
    category: "homme"
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
    category: "bouquets"
  },
  {
    id: "bouquet-2",
    name: "Bouquet Argent Premium",
    description: "Composition florale luxueuse et exceptionnelle",
    price: 35000,
    originalPrice: null,
    image: "/image/shop/catalogue-bouquet-argent/IMG_5297.jpg",
    badge: null,
    category: "bouquets"
  },
  {
    id: "bouquet-3",
    name: "Bouquet Argent Royal",
    description: "Création majestueuse pour les grandes occasions",
    price: 50000,
    originalPrice: null,
    image: "/image/shop/catalogue-bouquet-argent/IMG_5298.jpg",
    badge: null,
    category: "bouquets"
  },
  {
    id: "bouquet-4",
    name: "Bouquet Argent Signature",
    description: "Notre création signature, inoubliable et unique",
    price: 65000,
    originalPrice: null,
    image: "/image/shop/catalogue-bouquet-argent/IMG_5299.jpg",
    badge: "Meilleure vente",
    category: "bouquets"
  },
  {
    id: "bouquet-5",
    name: "Bouquet Argent Élégance",
    description: "Arrangement sophistiqué pour moments précieux",
    price: 28000,
    originalPrice: null,
    image: "/image/shop/catalogue-bouquet-argent/IMG_5301.jpg",
    badge: null,
    category: "bouquets"
  },
  {
    id: "bouquet-6",
    name: "Bouquet Argent Prestige",
    description: "Composition haut de gamme pour événements luxe",
    price: 75000,
    originalPrice: 90000,
    image: "/image/shop/catalogue-bouquet-argent/IMG_5317.jpg",
    badge: "Promo",
    category: "bouquets"
  }
]

const categories = ["all", "femme", "homme", "bouquets"]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(p => p.category === selectedCategory)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (gridRef.current) {
      observer.observe(gridRef.current)
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current)
      }
    }
  }, [])

  // Reset animation when category changes
  useEffect(() => {
    setIsVisible(false)
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [selectedCategory])

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
              Notre Collection
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 text-balance">
              Toutes nos Box
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Découvrez notre gamme complète de box personnalisées pour tous vos événements
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-border/50">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden inline-flex items-center gap-2 text-sm text-foreground"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Desktop Categories */}
            <div className="hidden lg:flex items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm boty-transition bg-popover ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground/70 hover:text-foreground boty-shadow"
                  }`}
                >
                  {category === "all" ? "Tous" : category === "femme" ? "Femme" : category === "homme" ? "Homme" : "Bouquets"}
                </button>
              ))}
            </div>

            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? "article" : "articles"}
            </span>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-background">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-serif text-2xl text-foreground">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setShowFilters(false)}
                    className="p-2 text-foreground/70 hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(category)
                        setShowFilters(false)
                      }}
                      className={`w-full px-6 py-4 rounded-2xl text-left boty-transition ${
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-foreground boty-shadow"
                      }`}
                    >
                      {category === "all" ? "Tous" : category === "femme" ? "Femme" : category === "homme" ? "Homme" : "Bouquets"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div 
            ref={gridRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id}
                product={product}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

function ProductCard({ 
  product, 
  index, 
  isVisible 
}: { 
  product: typeof products[0]
  index: number
  isVisible: boolean
}) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Link
      href={`/product/${product.id}`}
      className={`group transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="bg-card rounded-3xl overflow-hidden boty-shadow boty-transition group-hover:scale-[1.02]">
        {/* Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          {/* Skeleton */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br from-muted via-muted/50 to-muted animate-pulse transition-opacity duration-500 ${
              imageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          />
          
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className={`object-cover boty-transition group-hover:scale-105 transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
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
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 boty-transition boty-shadow"
            onClick={(e) => {
              e.preventDefault()
            }}
            aria-label="Ajouter au panier"
          >
            <ShoppingBag className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Info */}
        <div className="p-6">
          <h3 className="font-serif text-xl text-foreground mb-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-foreground">{product.price.toLocaleString()} FCFA</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {product.originalPrice.toLocaleString()} FCFA
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
