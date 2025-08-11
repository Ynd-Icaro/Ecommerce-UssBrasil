'use client'

import Head from 'next/head'

interface CategorySEOProps {
  category: {
    name: string
    title: string
    description: string
    slug: string
    image?: string
    productCount: number
  }
  products?: Array<{
    name: string
    brand: string
    price: number
  }>
}

export const CategorySEO = ({ category, products = [] }: CategorySEOProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ussbrasil.com'
  const canonicalUrl = `${baseUrl}/categorias/${category.slug}`
  
  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": category.title,
    "description": category.description,
    "url": canonicalUrl,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Início",
          "item": baseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Categorias",
          "item": `${baseUrl}/categorias`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": category.name,
          "item": canonicalUrl
        }
      ]
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": category.productCount,
      "itemListElement": products.slice(0, 10).map((product, index) => ({
        "@type": "Product",
        "position": index + 1,
        "name": product.name,
        "brand": {
          "@type": "Brand",
          "name": product.brand
        },
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "BRL",
          "availability": "https://schema.org/InStock"
        }
      }))
    },
    "publisher": {
      "@type": "Organization",
      "name": "USS Brasil",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    }
  }

  const ogImage = category.image || `${baseUrl}/og-category-default.jpg`
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{category.title} - USS Brasil | Produtos Premium</title>
      <meta name="description" content={category.description} />
      <meta name="keywords" content={`${category.name}, USS Brasil, produtos premium, tecnologia, eletrônicos`} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${category.title} - USS Brasil`} />
      <meta property="og:description" content={category.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="USS Brasil" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${category.title} - USS Brasil`} />
      <meta name="twitter:description" content={category.description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content="USS Brasil" />
      
      {/* Preload critical resources */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hreflang for internationalization (if needed) */}
      <link rel="alternate" hrefLang="pt-BR" href={canonicalUrl} />
      
      {/* Favicon and Apple Touch Icons */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#034a6e" />
      <meta name="msapplication-TileColor" content="#034a6e" />
    </Head>
  )
}

export default CategorySEO
