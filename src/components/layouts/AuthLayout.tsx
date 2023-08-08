import { ReactNode } from 'react';
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout(props: AuthLayoutProps) {
  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              '& body': {
                background: 'hsla(220, 69%, 97%, 1) !important'
              }
            }
          }
        }
      })}
    >
      <CssBaseline />
      <Container>
        <Box sx={{ py: '50px', minHeight: '100vh', display: 'grid', placeItems: 'center' }}>{props.children}</Box>
      </Container>
    </ThemeProvider>
  );
}
