"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./PremiumFlashSale.module.css";

/**
 * Premium Flash Sale Popup — SYS'Y BOX EVENTS
 * -------------------------------------------
 * - Option pour activer/désactiver : set ENABLED = true/false
 * - S'ouvre automatiquement après un délai
 * - Images qui défilent avec barre de progression
 * - Design avec codes couleurs SYS'Y BOX personnalisables
 * - Effets d'animation et transitions fluides
 */

// 🔧 CONFIGURATION - ACTIVER/DÉSACTIVER LA PROMOTION
const ENABLED = true; // Mettre à false pour désactiver le popup

// ⏱️ DÉLAI D'OUVERTURE (en millisecondes)
const OPEN_DELAY = 3000; // 3 secondes après le chargement

// 🎨 CODES COULEURS SYS'Y BOX EVENTS
const COLORS = {
  chocolate: "#572D15",
  chocolateDark: "#2B160C",
  gold: "#EABC3D",
  goldDeep: "#C8982C",
  cream: "#FCF8EF",
  red: "#AA2D25",
};

// 📸 IMAGES À FAIRE DÉFILER (remplacez par vos vraies images)
const SLIDES = [
    {
    id: 1,
    image: "/image/avatar/avatar-promotion.png",
    title: "PROMOTION IMMÉDIATE !",
    subtitle: "-50% sur votre première box personnalisée !",
    code: "SURPRISE50",
  },
  {
    id: 2,
    image: "/image/deal/deal-1.JPG",
    title: "PROMOTION EXCLUSIVE !",
    subtitle: "-20% sur votre première box personnalisée !",
    code: "SURPRISE20",
  },
  {
    id: 3,
    image: "/image/deal/deal-2.JPG",
    title: "OFFRE LIMITÉE !",
    subtitle: "-15% sur les box événements premium",
    code: "LUXE15",
  },
  {
    id: 4,
    image: "/image/deal/deal-3.JPG",
    title: "DERNIÈRE CHANCE !",
    subtitle: "-25% sur les bouquets argent",
    code: "BOUQUET25",
  },
];

// ⏱️ DURÉE D'AFFICHAGE DE CHAQUE SLIDE (en millisecondes)
const SLIDE_DURATION = 5000; // 5 secondes par slide

export default function PremiumFlashSale() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hasSeen, setHasSeen] = useState(false);

  // Ouvrir le popup après le délai si activé
  useEffect(() => {
    if (!ENABLED || hasSeen) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, OPEN_DELAY);

    return () => clearTimeout(timer);
  }, [hasSeen]);

  // Progression automatique des slides
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((prevSlide) => (prevSlide + 1) % SLIDES.length);
          return 0;
        }
        return prev + 100 / (SLIDE_DURATION / 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, currentSlide]);

  const handleClose = () => {
    setIsOpen(false);
    setHasSeen(true);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Code ${code} copié !`);
  };

  if (!ENABLED || !isOpen) return null;

  const currentSlideData = SLIDES[currentSlide];

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        {/* Bouton de fermeture */}
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Fermer"
        >
          ×
        </button>

        {/* Contenu principal */}
        <div className={styles.content}>
          {/* Section image */}
          <div className={styles.imageSection}>
            <div className={styles.imageWrapper}>
              <Image
                src={currentSlideData.image}
                alt="Promotion SYS'Y BOX"
                fill
                className={styles.productImage}
                priority
              />
            </div>
          </div>

          {/* Section texte */}
          <div className={styles.textSection}>
            {/* Titre fixe */}
            <h2 className={styles.title}>Offre promotionnelle</h2>

            {/* Bulle de dialogue */}
            <div className={styles.speechBubble}>
              <p className={styles.bubbleTitle}>{currentSlideData.title}</p>
              <p className={styles.bubbleSubtitle}>{currentSlideData.subtitle}</p>
              <p className={styles.bubbleAction}>Profitez-en maintenant !</p>
            </div>

            {/* Bouton fixe avec code promo */}
            <button
              type="button"
              className={styles.ctaButton}
              onClick={() => handleCopyCode(currentSlideData.code)}
            >
              Utiliser le code : {currentSlideData.code} →
            </button>

            {/* Barre de progression */}
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Indicateur de slides */}
            <div className={styles.slideIndicators}>
              {SLIDES.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.indicator} ${
                    index === currentSlide ? styles.activeIndicator : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
