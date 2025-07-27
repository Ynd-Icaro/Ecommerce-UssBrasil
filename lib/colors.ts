// ============================================================================
// SISTEMA DE CORES PREMIUM - USS BRASIL 
// ============================================================================

export const colors = {
  // Cores principais da marca
  primary: {
    50: '#e6ffff',
    100: '#b3ffff',
    200: '#80ffff',
    300: '#4dffff',
    400: '#1afcfc',
    500: '#00CED1', // Cor principal
    600: '#00b8bb',
    700: '#00a3a6',
    800: '#008e91',
    900: '#007a7c',
  },
  
  // Cores secundárias
  secondary: {
    50: '#f0fdfd',
    100: '#ccf7f6',
    200: '#99eeeb',
    300: '#5dd9d4',
    400: '#26bcb8',
    500: '#20B2AA', // DarkTurquoise complementar
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  
  // Gradientes premium
  gradients: {
    primary: 'from-[#00CED1] to-[#20B2AA]',
    primaryReverse: 'from-[#20B2AA] to-[#00CED1]',
    soft: 'from-cyan-400/20 to-teal-500/20',
    glass: 'from-white/10 to-white/5',
    dark: 'from-gray-900/90 to-black/90',
    featured: 'from-yellow-400 to-orange-500',
    sale: 'from-red-500 to-pink-600',
    new: 'from-green-500 to-emerald-600',
    success: 'from-emerald-500 to-green-600',
    warning: 'from-amber-500 to-orange-600',
    danger: 'from-red-500 to-rose-600',
  },
  
  // Cores neutras refinadas
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  
  // Cores de estado
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  
  // Cores para glassmorphism
  glass: {
    white: 'rgba(255, 255, 255, 0.1)',
    black: 'rgba(0, 0, 0, 0.1)',
    primary: 'rgba(0, 206, 209, 0.1)',
    blur: 'backdrop-blur-2xl',
  },
  
  // Sombras personalizadas
  shadows: {
    soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
    medium: '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 25px -5px rgba(0, 0, 0, 0.04)',
    large: '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    primary: '0 8px 32px 0 rgba(0, 206, 209, 0.15)',
    glow: '0 0 30px rgba(0, 206, 209, 0.3)',
  }
}

// Utilitários para cores
export const getColorVariant = (color: keyof typeof colors.primary, variant: keyof typeof colors.primary) => {
  return colors.primary[variant]
}

export const getGradient = (name: keyof typeof colors.gradients) => {
  return `bg-gradient-to-r ${colors.gradients[name]}`
}

export const getGlassStyle = () => {
  return 'bg-white/80 dark:bg-black/60 backdrop-blur-2xl border border-white/20'
}

export const getPrimaryShadow = () => {
  return colors.shadows.primary
}
