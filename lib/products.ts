export type Category = "femme" | "homme" | "bouquets"

export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  originalPrice: number | null
  image: string
  sizes: string[]
  details: string
  howToUse: string
  ingredients: string
  delivery: string
  badge: string | null
  category: Category
}

export const products: Record<string, Product> = {
  // Catalogue Femme
  "femme-1": {
    id: "femme-1",
    name: "Box Femme Élégance",
    tagline: "Collection exclusive pour les moments spéciaux",
    description: "Box personnalisée pour célébrer vos moments les plus précieux avec style et raffinement.",
    price: 25000,
    originalPrice: null,
    image: "/image/shop/catalogue-femme/IMG_2287.JPG",
    sizes: ["Standard", "Premium"],
    details: "Cette box exclusive contient une sélection de produits soigneusement choisis pour créer une expérience mémorable. Parfaite pour les anniversaires, les événements spéciaux ou simplement pour vous faire plaisir.",
    howToUse: "Chaque produit est emballé avec soin et livré dans notre packaging élégant. Les instructions d'utilisation sont incluses dans chaque box.",
    ingredients: "Produits sélectionnés selon vos préférences et l'occasion. Tous nos produits sont de haute qualité.",
    delivery: "Livraison gratuite partout en Côte d'Ivoire. Délai de livraison: 2-5 jours ouvrables.",
    badge: "Meilleure vente",
    category: "femme"
  },
  "femme-2": {
    id: "femme-2",
    name: "Coffret Femme Premium",
    tagline: "Set de luxe pour célébrer en beauté",
    description: "Notre collection premium pour les femmes qui exigent l'excellence pour leurs événements.",
    price: 35000,
    originalPrice: null,
    image: "/image/shop/catalogue-femme/IMG_2288.JPG",
    sizes: ["Standard", "Deluxe"],
    details: "Le coffret premium inclut des articles de luxe personnalisables selon vos besoins. Idéal pour les grandes occasions et les célébrations importantes.",
    howToUse: "Personnalisation complète disponible. Contactez-nous pour discuter de vos préférences.",
    ingredients: "Produits premium personnalisables. Qualité garantie.",
    delivery: "Livraison gratuite partout en Côte d'Ivoire. Délai de livraison: 2-5 jours ouvrables.",
    badge: null,
    category: "femme"
  },
  "femme-3": {
    id: "femme-3",
    name: "Box Femme Romantique",
    tagline: "Création délicate pour les âmes romantiques",
    description: "Une box pensée pour les moments romantiques et les déclarations d'amour.",
    price: 28000,
    originalPrice: null,
    image: "/image/shop/catalogue-femme/IMG_2289.JPG",
    sizes: ["Standard", "Premium"],
    details: "La box romantique contient des éléments soigneusement choisis pour créer une ambiance romantique inoubliable. Parfaite pour les anniversaires de rencontre ou les occasions spéciales.",
    howToUse: "Chaque élément est accompagné d'instructions pour créer la ambiance parfaite.",
    ingredients: "Produits romantiques personnalisables. Qualité et élégance garanties.",
    delivery: "Livraison gratuite partout en Côte d'Ivoire. Délai de livraison: 2-5 jours ouvrables.",
    badge: "Nouveau",
    category: "femme"
  },
  "femme-4": {
    id: "femme-4",
    name: "Coffret Femme Soirée",
    tagline: "Kit parfait pour vos événements élégants",
    description: "Tout ce qu'il faut pour briller lors de vos soirées et événements formels.",
    price: 40000,
    originalPrice: 50000,
    image: "/image/shop/catalogue-femme/IMG_2692.JPG",
    sizes: ["Standard", "VIP"],
    details: "Le coffret soirée inclut des accessoires et articles de luxe pour vos événements. Promotion limitée.",
    howToUse: "Instructions d'utilisation incluses pour chaque article. Parfait pour les galas, mariages et événements corporatifs.",
    ingredients: "Accessoires de luxe personnalisables. Qualité premium garantie.",
    delivery: "Livraison gratuite partout en Côte d'Ivoire. Délai de livraison: 2-5 jours ouvrables.",
    badge: "Promo",
    category: "femme"
  },
  // Catalogue Homme
  "homme-1": {
    id: "homme-1",
    name: "Box Homme Classique",
    tagline: "Collection intemporelle pour hommes exigeants",
    description: "Une box classique et élégante pour les hommes qui apprécient la qualité et le raffinement.",
    price: 30000,
    originalPrice: null,
    image: "/image/shop/catalogue-homme/IMG_2290.JPG",
    sizes: ["Standard", "Executive"],
    details: "La box homme classique contient des articles sélectionnés pour répondre aux besoins des hommes modernes. Idéale pour les cadeaux et les occasions spéciales.",
    howToUse: "Chaque article est choisi pour sa qualité et son utilité. Parfait pour le quotidien ou les événements.",
    ingredients: "Produits de qualité premium sélectionnés pour hommes.",
    delivery: "Livraison gratuite partout en Côte d'Ivoire. Délai de livraison: 2-5 jours ouvrables.",
    badge: null,
    category: "homme"
  },
  "homme-2": {
    id: "homme-2",
    name: "Coffret Homme Executive",
    tagline: "Set premium pour le professionnel accompli",
    description: "Notre collection executive pour les hommes d'affaires et les professionnels.",
    price: 45000,
    originalPrice: 55000,
    image: "/image/shop/catalogue-homme/IMG_2684.JPG",
    sizes: ["Standard", "Premium"],
    details: "Le coffret executive inclut des articles de luxe adaptés au monde professionnel. Promotion limitée.",
    howToUse: "Personnalisation disponible pour inclure votre logo ou vos couleurs d'entreprise.",
    ingredients: "Articles de luxe personnalisables. Qualité professionnelle garantie.",
    delivery: "Livraison gratuite partout en Côte d'Ivoire. Délai de livraison: 2-5 jours ouvrables.",
    badge: "Promo",
    category: "homme"
  },
  "homme-3": {
    id: "homme-3",
    name: "Box Homme Sportif",
    tagline: "Collection dynamique pour hommes actifs",
    description: "Une box pensée pour les hommes sportifs et actifs qui aiment le style et la performance.",
    price: 32000,
    originalPrice: null,
    image: "/image/shop/catalogue-homme/IMG_2685.JPG",
    sizes: ["Standard", "Pro"],
    details: "La box sportif contient des articles adaptés au mode de vie actif. Parfaite pour les cadeaux et les occasions sportives.",
    howToUse: "Articles sélectionnés pour leur qualité et leur performance. Idéal pour les sportifs et les hommes actifs.",
    ingredients: "Produits sportifs de qualité premium. Performance et style garantis.",
    delivery: "Livraison gratuite partout en Côte d'Ivoire. Délai de livraison: 2-5 jours ouvrables.",
    badge: "Meilleure vente",
    category: "homme"
  },
  "homme-4": {
    id: "homme-4",
    name: "Coffret Homme Luxe",
    tagline: "Création exclusive pour les moments précieux",
    description: "Notre création la plus exclusive pour les moments vraiment spéciaux.",
    price: 55000,
    originalPrice: null,
    image: "/image/shop/catalogue-homme/IMG_2859.JPG",
    sizes: ["Standard", "Royal"],
    details: "Le coffret luxe est notre création la plus exclusive. Parfait pour les grandes occasions et les cadeaux exceptionnels.",
    howToUse: "Personnalisation complète disponible. Chaque détail est pensé pour vous.",
    ingredients: "Articles de luxe ultra-personnalisables. Qualité exceptionnelle garantie.",
    delivery: "Livraison gratuite partout en Côte d'Ivoire. Délai de livraison: 2-5 jours ouvrables.",
    badge: null,
    category: "homme"
  },
  // Bouquets Argent
  "bouquet-1": {
    id: "bouquet-1",
    name: "Bouquet Argent Classic",
    tagline: "Arrangement floral élégant et raffiné",
    description: "Un bouquet classique dans notre collection argent, élégant et raffiné pour toutes les occasions.",
    price: 20000,
    originalPrice: null,
    image: "/image/shop/catalogue-bouquet-argent/IMG_5296.jpg",
    sizes: ["Petit", "Moyen", "Grand"],
    details: "Le bouquet classic est notre proposition élégante pour les occasions standards. Composition florale soigneusement arrangée avec des fleurs de saison.",
    howToUse: "Livré avec instructions de soin pour maximiser la durée de vie des fleurs. Idéal pour les anniversaires et les remerciements.",
    ingredients: "Fleurs de saison fraîches, feuillage, emballage élégant.",
    delivery: "Livraison gratuite partout en Abidjan et environs. Délai de livraison: 1-3 jours ouvrables.",
    badge: "Nouveau",
    category: "bouquets"
  },
  "bouquet-2": {
    id: "bouquet-2",
    name: "Bouquet Argent Premium",
    tagline: "Composition florale luxueuse et exceptionnelle",
    description: "Notre bouquet premium pour les occasions qui méritent l'exceptionnel.",
    price: 35000,
    originalPrice: null,
    image: "/image/shop/catalogue-bouquet-argent/IMG_5297.jpg",
    sizes: ["Moyen", "Grand", "Royal"],
    details: "Le bouquet premium utilise des fleurs rares et des arrangements sophistiqués. Pour les occasions vraiment spéciales.",
    howToUse: "Livré avec soins spécialisés pour les fleurs premium. Instructions détaillées incluses.",
    ingredients: "Fleurs premium rares, feuillage luxueux, emballage signature.",
    delivery: "Livraison prioritaire partout en Abidjan et environs. Délai de livraison: 1-2 jours ouvrables.",
    badge: null,
    category: "bouquets"
  },
  "bouquet-3": {
    id: "bouquet-3",
    name: "Bouquet Argent Royal",
    tagline: "Création majestueuse pour les grandes occasions",
    description: "Notre bouquet royal pour les événements d'exception qui demandent le meilleur.",
    price: 50000,
    originalPrice: null,
    image: "/image/shop/catalogue-bouquet-argent/IMG_5298.jpg",
    sizes: ["Grand", "Royal", "Imperial"],
    details: "Le bouquet royal est notre création la plus majestueuse. Arrangement floral grandiose pour les occasions exceptionnelles.",
    howToUse: "Installation de livraison disponible. Entretien inclus pour une semaine.",
    ingredients: "Fleurs exceptionnelles, arrangement royal, emballage impérial.",
    delivery: "Livraison VIP avec installation disponible partout en Côte d'Ivoire. Délai de livraison: 1-2 jours ouvrables.",
    badge: null,
    category: "bouquets"
  },
  "bouquet-4": {
    id: "bouquet-4",
    name: "Bouquet Argent Signature",
    tagline: "Notre création signature, inoubliable et unique",
    description: "Le bouquet signature est notre création la plus exclusive et personnalisable.",
    price: 65000,
    originalPrice: null,
    image: "/image/shop/catalogue-bouquet-argent/IMG_5299.jpg",
    sizes: ["Signature", "Custom"],
    details: "Le bouquet signature est entièrement personnalisable selon vos envies. Notre création la plus exclusive.",
    howToUse: "Consultation personnalisée incluse. Design sur mesure garanti.",
    ingredients: "Fleurs sur mesure, arrangement signature, emballage personnalisé.",
    delivery: "Livraison personnalisée avec service dédié. Délai selon la personnalisation.",
    badge: "Meilleure vente",
    category: "bouquets"
  }
}

export const categories = [
  { value: "femme" as Category, label: "Femme" },
  { value: "homme" as Category, label: "Homme" },
  { value: "bouquets" as Category, label: "Bouquets Argent" }
]

export const filterCategories = ["all", "femme", "homme", "bouquets"] as const

export const getProductById = (id: string): Product | undefined => {
  return products[id]
}

export const getProductsByCategory = (category: Category): Product[] => {
  return Object.values(products).filter(product => product.category === category)
}

export const getAllProducts = (): Product[] => {
  return Object.values(products)
}
