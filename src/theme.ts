import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    background: {
      paper: '#F7F7F7',
    },
    primary: {
      main: '#5d5d5d',
      contrastText: '#FFFFFF',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    body1: {
      fontFamily: 'Montserrat, sans-serif',
    },
    body2: {
      fontFamily: 'Montserrat, sans-serif',
    },
    button: {
      fontFamily: 'Montserrat, sans-serif',
    },
    overline: {
      fontFamily: 'Montserrat, sans-serif',
    },
    caption: {
      fontFamily: 'Montserrat, sans-serif',
    },
    subtitle1: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '1.5rem',
    },
    subtitle2: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '1.25rem',
    },
    h1: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '2.75rem',
      fontWeight: 'bold',
    },
    h2: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '2.5rem',
      fontWeight: 'bold',
    },
    h3: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '2.25rem',
      fontWeight: 'bold',
    },
    h4: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '2rem',
    },
    h5: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '1.75rem',
    },
    h6: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '1.5rem',
    },
  },
});

export default theme;
