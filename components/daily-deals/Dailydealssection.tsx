"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "./Dailydealssection.module.css";

/**
 * Section "Ventes Flash" / Daily Deals — SYS'Y BOX EVENTS
 * ---------------------------------------------------
 * - Bandeau rouge avec compte à rebours en temps réel
 * - Liste horizontale de produits avec images, stock, étoiles, prix
 * - Badge de réduction en vert
 * - Design responsive et moderne
 */

interface Deal {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviewsCount: number;
  stock: number;
}

const DEALS: Deal[] = [
  {
    id: "1",
    name: "Box Douce Attention",
    image: "/image/deal/deal-1.JPG",
    price: 25000,
    oldPrice: 35000,
    rating: 4.9,
    reviewsCount: 24,
    stock: 12,
  },
  {
    id: "2",
    name: "Box Anniversaire Élégante",
    image: "/image/deal/deal-2.JPG",
    price: 35000,
    oldPrice: 45000,
    rating: 4.8,
    reviewsCount: 18,
    stock: 8,
  },
  {
    id: "3",
    name: "Box Romantique",
    image: "/image/deal/deal-3.JPG",
    price: 50000,
    oldPrice: 65000,
    rating: 4.9,
    reviewsCount: 31,
    stock: 5,
  },
  {
    id: "4",
    name: "Box Gourmande",
    image: "/image/deal/deal-4.JPG",
    price: 30000,
    oldPrice: 40000,
    rating: 4.7,
    reviewsCount: 16,
    stock: 15,
  },
  {
    id: "5",
    name: "Box Cocooning",
    image: "/image/deal/deal-5.JPG",
    price: 45000,
    oldPrice: 55000,
    rating: 4.8,
    reviewsCount: 21,
    stock: 9,
  },
  {
    id: "6",
    name: "Box Merci & Reconnaissance",
    image: "/image/deal/deal-6.JPG",
    price: 20000,
    oldPrice: 28000,
    rating: 4.7,
    reviewsCount: 13,
    stock: 20,
  },
  {
    id: "7",
    name: "Box Célébration",
    image: "/image/deal/deal-7.JPG",
    price: 60000,
    oldPrice: 75000,
    rating: 4.9,
    reviewsCount: 27,
    stock: 7,
  },
  {
    id: "8",
    name: "Box Prestige Entreprise",
    image: "/image/deal/deal-8.JPG",
    price: 85000,
    oldPrice: 110000,
    rating: 5.0,
    reviewsCount: 12,
    stock: 3,
  },
];

function discountPercent(price: number, oldPrice: number) {
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

function useCountdown(hoursFromNow: number) {
  const target = useMemo(
    () => Date.now() + hoursFromNow * 60 * 60 * 1000,
    [hoursFromNow]
  );
  const [remaining, setRemaining] = useState(target - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.max(0, target - Date.now()));
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  const totalSeconds = Math.floor(remaining / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return { hours, minutes, seconds };
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
    <span className={styles.stars} aria-label={`${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) return <span key={i}>★</span>;
        if (i === full && hasHalf) return <span key={i}>⯨</span>;
        return (
          <span key={i} className={styles.starEmpty}>
            ★
          </span>
        );
      })}
    </span>
  );
}

function DealCard({ deal }: { deal: Deal }) {
  const percent = discountPercent(deal.price, deal.oldPrice);
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <span className={styles.discountBadge}>-{percent}%</span>
        <Image
          src={deal.image}
          alt={deal.name}
          fill
          sizes="220px"
          className={styles.productImage}
        />
      </div>
      <div className={styles.cardBody}>
        <span className={styles.stockLabel}>{deal.stock} articles en stock</span>
        <h3 className={styles.productName}>{deal.name}</h3>
        <div className={styles.ratingRow}>
          <StarRating rating={deal.rating} />
          <span className={styles.reviewsCount}>({deal.reviewsCount})</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.price}>{deal.price.toLocaleString()} FCFA</span>
          <span className={styles.oldPrice}>{deal.oldPrice.toLocaleString()} FCFA</span>
        </div>
      </div>
    </div>
  );
}

export default function DailyDealsSection() {
  const { hours, minutes, seconds } = useCountdown(8.41);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>Ventes Flash | Chaque jour</h2>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.countdown}>
            <span className={styles.countdownTime}>
              {hours}h: {minutes}m: {seconds}s
            </span>
          </div>

          <button type="button" className={styles.arrowButton}>
            →
          </button>
        </div>
      </div>

      <div className={styles.dealsTrack}>
        {DEALS.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </section>
  );
}
