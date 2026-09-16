"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: '#FCF8EF' }}>
      {/* Background Video */}
      <div className="border-b border-border/50 p-6 py-2" style={{ backgroundColor: '#FCF8EF' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'cover'
          }}
        >
          <source src="/movie/247338.mp4" type="video/mp4" />
        </video>
        {/* Bottom fade gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full pt-20 lg:pt-24 mr-0 lg:mr-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full lg:max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <span className="text-xs sm:text-sm uppercase mb-4 sm:mb-6 block text-[#572D15] animate-blur-in opacity-0 tracking-normal" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Créateur d'événements mémorables
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-4 sm:mb-6 text-balance text-[#572D15]">
              <span className="block animate-blur-in opacity-0 font-semibold" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>Box cadeaux</span>
              <span className="block animate-blur-in opacity-0 font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>personnalisées.</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 lg:mb-10 max-w-md mx-auto lg:mx-0 text-[#572D15] animate-blur-in opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
              Transformez chaque occasion en moment inoubliable avec nos box événements personnalisées, pour particuliers et entreprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-blur-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-full text-xs sm:text-sm tracking-wide boty-transition hover:bg-primary/90 boty-shadow"
              >
                Découvrir nos offres
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 boty-transition" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#572D15]">
        <span className="text-xs tracking-widest uppercase font-bold">Défiler</span>
        <div className="w-px h-12 bg-[#572D15]/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#572D15]/60 animate-pulse" />
        </div>
      </div>
    </section>
  )
}