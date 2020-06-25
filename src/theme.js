import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  typography: {
    fontFamily: 'Lato, Helvetica Neue, Helvetica, Arial, sans-serif'
  },
  palette: {
    primary: {
      main: '#5BC5A7',
      contrastText: 'white'
    },
    secondary: {
      main: '#FF652F',
      contrastText: 'white'
    },
  },
});
