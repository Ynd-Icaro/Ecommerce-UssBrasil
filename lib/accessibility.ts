export const a11yConfig = {
  // Configurações de contraste
  contrast: {
    minimum: 4.5, // WCAG AA
    enhanced: 7,   // WCAG AAA
  },

  // Tamanhos mínimos de toque
  touch: {
    minimum: 44, // pixels
    recommended: 48,
  },

  // Configurações de foco
  focus: {
    outline: '2px solid',
    outlineColor: 'var(--uss-primary)',
    outlineOffset: '2px',
    borderRadius: '4px',
  },

  // Configurações de texto
  text: {
    minimumSize: 16, // pixels
    lineHeight: 1.5,
    maxLineLength: 80, // caracteres
  },

  // Configurações de animação
  animation: {
    respectMotionPreference: true,
    defaultDuration: 300, // ms
    reducedDuration: 150, // ms para prefers-reduced-motion
  }
}

// Classes utilitárias para acessibilidade
export const a11yClasses = {
  // Skip links
  skipLink: 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-uss-primary text-white p-2 rounded z-50',
  
  // Screen reader only
  srOnly: 'sr-only',
  
  // Focus visível
  focusVisible: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-uss-primary focus-visible:ring-offset-2',
  
  // Estado interativo
  interactive: 'transition-colors duration-200 hover:opacity-80 focus:opacity-80',
  
  // Indicadores de estado
  loading: 'opacity-50 pointer-events-none',
  disabled: 'opacity-40 cursor-not-allowed',
  
  // Contraste alto
  highContrast: 'text-uss-gray-900 bg-white border-uss-gray-700',
}
