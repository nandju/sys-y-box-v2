"use client"

import { useEffect, useRef, useState } from "react"
import { Leaf, Droplets, Sparkles, Flower2 } from "lucide-react"

const badges = [
  {
    icon: Leaf,
    title: "Événements sur mesure",
    description: "Des concepts adaptés à vos envies"
  },
  {
    icon: Droplets,
    title: "Créativité & élégance",
    description: "Une attention à chaque détail"
  },
  {
    icon: Sparkles,
    title: "Expérience inoubliable",
    description: "Des instants qui restent gravés"
  },
  {
    icon: Flower2,
    title: "Accompagnement complet",
    description: "De l’idée à la réalisation"
  }
]

export function TrustBadges() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={sectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {badges.map((badge, index) => (
            <div
              key={badge.title}
              className={`bg-background p-5 sm:p-6 lg:p-8 text-center rounded-xl border border-stone-200 transition-all duration-700 ease-out border-none ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <badge.icon className="text-primary mb-3 sm:mb-4 mx-auto size-9 sm:size-10 lg:size-12" strokeWidth={1} />
              <h3 className="font-serif text-foreground mb-2 text-lg sm:text-xl lg:text-2xl">{badge.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}