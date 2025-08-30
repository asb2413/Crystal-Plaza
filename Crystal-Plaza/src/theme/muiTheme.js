// src/theme/muiTheme.js
import { createTheme } from '@mui/material/styles';

const paletteBase = {
  primary: { main: '#16423C' },   // أخضر داكن
  secondary: { main: '#C49A3A' }, // ذهبي
  background: { default: '#ffffff' },
  text: { primary: '#1f2937' },
};

const typographyBase = {
  fontFamily: [
    // أضف خطوطك المفضلة هنا عند الحاجة
    'system-ui',
    'Segoe UI',
    'Roboto',
    'Tahoma',
    'Arial',
    'sans-serif',
  ].join(','),
};

export function makeMuiTheme(lang = 'ar') {
  const isRTL = lang === 'ar';
  return createTheme({
    direction: isRTL ? 'rtl' : 'ltr',
    palette: paletteBase,
    typography: typographyBase,
    components: {
      MuiContainer: {
        defaultProps: { maxWidth: 'lg' },
      },
      MuiButton: {
        defaultProps: { variant: 'contained', disableElevation: true },
      },
      MuiCssBaseline: {
        styleOverrides: {
          '*, *::before, *::after': {
            boxSizing: 'border-box',
          },
        },
      },
    },
  });
}
