// ============================================================================
// PERFORMANCE OPTIMIZATION COMPONENT
// ============================================================================

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { GA_TRACKING_ID, FB_PIXEL_ID, pageview } from '@/lib/analytics'

// Preload critical resources
export const PreloadCriticalResources = () => {
  return (
    <>
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* Preload hero images */}
      <link
        rel="preload"
        href="/Imagens/Iphone 16 Pro.png"
        as="image"
        type="image/png"
      />
      
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//connect.facebook.net" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
    </>
  )
}

// Analytics scripts
export const AnalyticsScripts = () => {
  return (
    <>
      {/* Google Analytics */}
      {GA_TRACKING_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* Facebook Pixel */}
      {FB_PIXEL_ID && (
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}
    </>
  )
}

// Service Worker registration
export const ServiceWorkerRegistration = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    }
  }, [])

  return null
}

// Critical CSS loader
export const CriticalCSS = () => {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Critical CSS for above-the-fold content */
        html { scroll-behavior: smooth; }
        body { 
          font-family: Inter, system-ui, -apple-system, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
        }
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-bar {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
        }
        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,.3);
          border-radius: 50%;
          border-top-color: #00CED1;
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `
    }} />
  )
}

// Image optimization hook
export const useImageOptimization = () => {
  useEffect(() => {
    // Lazy load images with Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src || img.src
          img.classList.remove('lazy')
          observer.unobserve(img)
        }
      })
    })

    const images = document.querySelectorAll('img[data-src]')
    images.forEach(img => imageObserver.observe(img))

    return () => {
      images.forEach(img => imageObserver.unobserve(img))
    }
  }, [])
}
