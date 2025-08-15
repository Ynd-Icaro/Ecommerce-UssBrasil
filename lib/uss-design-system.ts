export const ussDesignSystem = {
  // Paleta de cores USS Brasil Premium
  colors: {
    // Cores institucionais
    primary: {
      blue: '#034a6e',      // Azul institucional
      turquoise: '#54c4cf', // Turquesa/ícone
      petrol: '#0d1b22',    // Azul petróleo profundo para fundos escuros
    },
    
    // Cinzas calibrados
    dark: {
      900: '#0f172a',       // Mais escuro
      800: '#111827',       // Médio escuro
      700: '#1f2937',       // Claro escuro
    },
    
    light: {
      50: '#f5f7fa',        // Mais claro
      100: '#e5e7eb',       // Médio claro
      200: '#d1d5db',       // Escuro claro
    },
    
    // Superfícies
    white: '#ffffff',       // Branco puro para leitura
    
    // Exclusividade VIP
    gold: '#d4af37',        // Dourado VIP
    
    // Feedbacks utilitários
    success: '#22c55e',     // Verde
    warning: '#f59e0b',     // Laranja
    error: '#ef4444',       // Vermelho
    
    // Realce ciano (com opacidade no dark)
    accent: {
      cyan: '#20b2aa',
      cyanDark: '#20b2aa1a',  // Com opacidade para dark theme
    }
  },
  
  // Typography Inter/SF-like
  typography: {
    fontFamily: {
      sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    },
    fontSize: {
      // Hierarquia clara
      h1: '32px',           // ~32px/700
      h2: '28px',           // ~28px/600
      h3: '24px',           // ~24px/600
      body: '16px',         // 16px/regular
      micro: '14px',        // 14px microtexto
    },
    fontWeight: {
      h1: 700,
      h2: 600,
      h3: 600,
      body: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    }
  },
  
  // Spacing System
  spacing: {
    // Espaçamentos internos mínimos
    internal: {
      xs: '8px',
      sm: '12px',
      md: '16px',
      lg: '20px',
      xl: '24px',
    },
    
    // Respiros entre blocos
    blocks: {
      sm: '24px',
      md: '32px',
      lg: '48px',
      xl: '64px',
    }
  },
  
  // Border Radius
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',           // Padrão 14-16px
    xl: '20px',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  
  // Animations
  animations: {
    duration: {
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
    },
    easing: {
      out: 'cubic-bezier(0, 0, 0.2, 1)',     // ease-out para entradas
      in: 'cubic-bezier(0.4, 0, 1, 1)',      // ease-in para saídas
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-in-out
    },
    hover: {
      scale: 'scale(1.02)',
      shadow: '0 8px 25px -8px rgb(0 0 0 / 0.2)',
    }
  },
  
  // Z-index hierarchy
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
  
  // Breakpoints
  breakpoints: {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Container max widths
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
  }
} as const

export type USSDesignSystem = typeof ussDesignSystem
