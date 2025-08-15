import { notFound } from 'next/navigation'
import ProductPage from '@/components/product-page'
import productsData from '@/data/db.json'
import { Product } from '@/types'

interface ProductPageProps {
  params: {
    id: string
  }
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    // Find the product in the JSON data
    const product = productsData.products.find((p: any) => p.id === id || p.slug === id)
    
    if (!product) {
      return null
    }

    // Map the product data to match our Product interface
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      discountPrice: product.discountPrice || undefined,
      category: product.category,
      subcategory: product.subcategory,
      marca: product.marca,
      sku: product.sku,
      image: product.image,
      images: product.images || [product.image],
      video: product.video,
      description: product.description,
      shortDescription: product.shortDescription,
      longDescription: product.longDescription,
      stock: product.stock,
      rating: product.rating,
      reviewsCount: product.reviewsCount,
      featured: product.featured,
      isNew: product.isNew,
      bestSeller: product.bestSeller,
      vipOnly: product.vipOnly,
      limitedEdition: product.limitedEdition,
      specifications: product.specifications || {},
      colors: product.colors,
      variants: product.variants?.map((v: any) => ({
        storage: v.storage,
        memory: v.memory,
        price: v.price,
        discountPrice: v.discountPrice || undefined
      })),
      tags: product.tags || [],
      benefits: product.benefits || [],
      warranty: product.warranty || 'Garantia de 1 ano',
      deliveryTime: product.deliveryTime || '2-5 dias úteis',
      seo: product.seo || {
        metaTitle: product.name,
        metaDescription: product.shortDescription || product.description
      }
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await params
  const product = await getProduct(resolvedParams.id)
  
  if (!product) {
    return {
      title: 'Produto não encontrado - USS Brasil',
      description: 'O produto que você está procurando não foi encontrado.'
    }
  }

  return {
    title: `${product.name} - ${product.marca} | USS Brasil`,
    description: product.shortDescription || product.description,
    keywords: [product.marca, product.category, product.subcategory, ...product.tags].join(', '),
    openGraph: {
      title: `${product.name} - ${product.marca}`,
      description: product.shortDescription || product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        }
      ],
      type: 'website',
      siteName: 'USS Brasil',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - ${product.marca}`,
      description: product.shortDescription || product.description,
      images: [product.image],
    }
  }
}

export default async function Page({ params }: ProductPageProps) {
  const resolvedParams = await params
  const product = await getProduct(resolvedParams.id)

  if (!product) {
    notFound()
  }

  // Get all products for related products section
  const allProducts = productsData.products.map((p: any) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    discountPrice: p.discountPrice || undefined,
    category: p.category,
    subcategory: p.subcategory,
    marca: p.marca,
    sku: p.sku,
    image: p.image,
    images: p.images || [p.image],
    video: p.video,
    description: p.description,
    shortDescription: p.shortDescription,
    longDescription: p.longDescription,
    stock: p.stock,
    rating: p.rating,
    reviewsCount: p.reviewsCount,
    featured: p.featured,
    isNew: p.isNew,
    bestSeller: p.bestSeller,
    vipOnly: p.vipOnly,
    limitedEdition: p.limitedEdition,
    specifications: p.specifications || {},
    colors: p.colors,
    variants: p.variants?.map((v: any) => ({
      storage: v.storage,
      memory: v.memory,
      price: v.price,
      discountPrice: v.discountPrice || undefined
    })),
    tags: p.tags || [],
    benefits: p.benefits || [],
    warranty: p.warranty || 'Garantia de 1 ano',
    deliveryTime: p.deliveryTime || '2-5 dias úteis',
    seo: p.seo || {
      metaTitle: p.name,
      metaDescription: p.shortDescription || p.description
    }
  }))

  return (
    <div>
      <ProductPage product={product} allProducts={allProducts} />
    </div>
  )
}

// Generate static params for known products
export async function generateStaticParams() {
  try {
    return productsData.products.map((product: any) => ({
      id: product.slug || product.id,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
