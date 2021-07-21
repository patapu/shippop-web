import './App.css';
import { Waiter } from 'react-wait';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { AppContext } from './contexts/AppContext';
import { useContext } from 'react';
import { useMemo } from 'react';
import { ConfirmProvider } from 'material-ui-confirm';
import Routes from './routes/Routes';
import { SnackbarProvider } from 'notistack';
import { CartProvider } from './contexts/CartContext';

const defaultTheme = {
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Prompt',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#700000',
    },
    secondary: {
      main: '#388e3c',
    },
  },
}

function App() {
  const { setting } = useContext(AppContext)

  const { palette, ...otherTheme } = defaultTheme
  const theme = useMemo(() => createTheme({
    palette: {
      ...palette,
      type: setting.theme
    },
    ...otherTheme
  }), [setting.theme]);

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Waiter>
        <ConfirmProvider
          defaultOptions={{
            confirmationButtonProps: { autoFocus: true }
          }}
        >
          <SnackbarProvider
              maxSnack={1}
              anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
              }}
              autoHideDuration={3000}
          >
            <CartProvider>
              <Routes />
            </CartProvider>
          </SnackbarProvider>
        </ConfirmProvider>
        </Waiter>
      </ThemeProvider>
  );
}

export default App;
