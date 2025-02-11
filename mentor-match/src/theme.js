import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black for primary elements
    },
    secondary: {
      main: '#f5f5dc', // Beige for secondary elements
    },
    background: {
      default: '#f5f5dc', // Beige background
      paper: '#ffffff', // White for paper elements
    },
    text: {
      primary: '#000000', // Black text
      secondary: '#555555', // Gray text
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 'bold',
    },
  },
});

export default theme;
