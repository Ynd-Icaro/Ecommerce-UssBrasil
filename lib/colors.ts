/**
 * Sistema de Cores USS Brasil - Padrão Institucional
 * Aplicado em todo o sistema para garantir consistência visual
 */

export const ussColors = {
  // Cores Primárias - Identidade USS Brasil
  primary: {
    main: '#034a6e',      // Azul Profundo (principal)
    hover: '#065a84',     // Azul Médio (hover)
    light: '#54c4cf',     // Turquesa Suave (detalhes e ícones)
    dark: '#022a3d',      // Azul Mais Escuro
  },

  // Cores de Apoio
  accent: {
    blue: '#007aff',      // Azul Elétrico (destaque/CTA)
    silver: '#c0c7cd',    // Prata Metálico (ícones/skeleton)
    success: '#28a745',   // Verde Sucesso
    warning: '#ffc107',   // Amarelo Aviso
    error: '#dc3545',     // Vermelho Erro
  },

  // Neutras - Light Mode
  light: {
    background: {
      primary: '#ffffff',     // Branco Puro
      secondary: '#f5f7fa',   // Cinza Neve
      tertiary: '#e5e8eb',    // Cinza Chumbo Claro
    },
    text: {
      primary: '#1a1a1a',     // Preto para texto principal
      secondary: '#6b7280',   // Cinza para texto secundário
      tertiary: '#9ca3af',    // Cinza claro para texto terciário
    },
    border: {
      primary: '#e5e8eb',     // Bordas principais
      secondary: '#d1d5db',   // Bordas secundárias
      hover: '#034a6e',       // Bordas no hover
    }
  },

  // Neutras - Dark Mode
  dark: {
    background: {
      primary: '#0d1b22',     // Preto Intenso
      secondary: '#121f28',   // Azul Antracito
      tertiary: '#1d2d38',    // Cinza Aço
    },
    text: {
      primary: '#ffffff',     // Branco para texto principal
      secondary: '#d1d5db',   // Cinza claro para texto secundário
      tertiary: '#9ca3af',    // Cinza para texto terciário
    },
    border: {
      primary: '#374151',     // Bordas principais
      secondary: '#4b5563',   // Bordas secundárias
      hover: '#54c4cf',       // Bordas no hover
    }
  }
}

// Função utilitária para obter cores baseadas no tema
export const getThemeColors = (isDark: boolean) => {
  return {
    ...ussColors.primary,
    ...ussColors.accent,
    ...(isDark ? ussColors.dark : ussColors.light)
  }
}

// Classes CSS pré-definidas para uso rápido
export const ussColorClasses = {
  // Backgrounds
  bgPrimary: 'bg-[#034a6e]',
  bgPrimaryHover: 'hover:bg-[#065a84]',
  bgAccent: 'bg-[#54c4cf]',
  bgCTA: 'bg-[#007aff]',
  
  // Text
  textPrimary: 'text-[#034a6e]',
  textAccent: 'text-[#54c4cf]',
  textCTA: 'text-[#007aff]',
  
  // Borders
  borderPrimary: 'border-[#034a6e]',
  borderAccent: 'border-[#54c4cf]',
  
  // Ring (focus states)
  ringPrimary: 'ring-[#034a6e]',
  ringAccent: 'ring-[#54c4cf]',
}

export default ussColors
