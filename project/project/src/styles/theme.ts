export const theme = {
  colors: {
    primary: {
      main: '#4F46E5', // Indigo
      light: '#818CF8',
      dark: '#3730A3',
    },
    secondary: {
      main: '#8B5CF6', // Purple
      light: '#A78BFA',
      dark: '#6D28D9',
    },
    accent: {
      main: '#EC4899', // Pink
      light: '#F472B6',
      dark: '#BE185D',
    },
    background: {
      default: '#F3F4F6',
      paper: '#FFFFFF',
      gradient: 'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 50%, #EC4899 100%)',
    },
    text: {
      primary: '#111827',
      secondary: '#4B5563',
      light: '#9CA3AF',
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
  },
  animations: {
    transition: 'all 0.3s ease-in-out',
    hover: {
      scale: 'transform: scale(1.05)',
      lift: 'transform: translateY(-4px)',
    },
    keyframes: {
      fadeIn: '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }',
      slideIn: '@keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }',
      pulse: '@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
};
