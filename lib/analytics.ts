// ============================================================================
// ANALYTICS CONFIGURATION - GOOGLE ANALYTICS & FACEBOOK PIXEL
// ============================================================================

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || ''

// Google Analytics
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// E-commerce Events
export const purchaseEvent = (transactionId: string, value: number, items: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'BRL',
      items: items,
    })
  }
}

export const addToCartEvent = (itemId: string, itemName: string, price: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'BRL',
      value: price,
      items: [
        {
          item_id: itemId,
          item_name: itemName,
          price: price,
          quantity: 1,
        },
      ],
    })
  }
}

export const viewItemEvent = (itemId: string, itemName: string, category: string, price: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'BRL',
      value: price,
      items: [
        {
          item_id: itemId,
          item_name: itemName,
          category: category,
          price: price,
          quantity: 1,
        },
      ],
    })
  }
}

// Facebook Pixel Events
export const fbPurchase = (value: number, currency: string = 'BRL') => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', { value, currency })
  }
}

export const fbAddToCart = (value: number, currency: string = 'BRL') => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'AddToCart', { value, currency })
  }
}

export const fbViewContent = (value: number, currency: string = 'BRL') => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', { value, currency })
  }
}

export const fbInitiateCheckout = (value: number, currency: string = 'BRL') => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', { value, currency })
  }
}
