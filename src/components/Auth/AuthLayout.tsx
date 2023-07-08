import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Divider,
  styled,
  ThemeProvider,
  Typography
} from '@mui/material';
import { ReactNode, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { Hanken_Grotesk } from 'next/font/google';

const hankenGroteskFont = Hanken_Grotesk({
  weight: ['400', '600'],
  display: 'swap',
  subsets: ['latin']
});

const Logo = styled('svg')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    display: 'none'
  },
  marginBottom: '40px'
}));

const AuthLayoutRoot = styled('form')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'calc(100% - 58%) 58%',
  minHeight: '100vh',
  background: 'white',
  '& .wrapper': {
    paddingTop: 24,
    paddingBottom: 24,
    display: 'grid',
    height: '999px',
    alignItems: 'center'
  },
  ' *::selection': {
    background: '#A8A4FF',
    color: theme.palette.getContrastText('#A8A4FF')
  },
  '& .MuiFormLabel-asterisk': {
    color: 'hsla(5, 82%, 56%, 1)'
  },
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: '1fr 0',
    background: 'hsla(220, 69%, 97%, 1)',
    '& .wrapper': {
      height: 'fit-content',
      background: 'white',
      padding: 32,
      margin: '32px auto',
      borderRadius: 8,
      maxWidth: 467,
      boxShadow: '0px 0px 100px 0px rgba(0, 0, 0, 0.25)'
    },
    alignItems: 'center',
    '& .right-side': {
      display: 'none'
    }
  },
  [theme.breakpoints.down('sm')]: {
    background: 'white',
    '& .wrapper': {
      margin: '0 auto',
      maxWidth: '100%',
      boxShadow: 'none',
      padding: '24px 0'
    }
  }
}));

export const StyledButton = styled(Button)(() => ({
  marginTop: 44,
  fontSize: '1rem',
  lineHeight: 1.5,
  paddingTop: 12,
  paddingBottom: 12,
  textTransform: 'none',
  fontWeight: 400,
  background: 'hsla(235, 16%, 15%, 1)',
  borderRadius: 6,
  '&:hover': {
    background: 'hsla(235, 12%, 27%, 1)'
  }
}));

interface AuthLayoutProps {
  children: ReactNode;
  imageUrl?: string;
  title: string;
  subtitle: string;
}

export const divider = (
  <Divider
    sx={{
      mt: '44px',
      userSelect: 'none',
      background: 'rgba(85, 86, 90, 0.12)'
    }}
  />
);

export default function AuthLayout(props: AuthLayoutProps) {
  const [isImageLoading, setLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (imageRef.current && !imageRef.current.complete) setLoading(true);
  });

  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              '& body': {
                background: 'white !important'
              }
            }
          }
        },
        typography: {
          ...hankenGroteskFont.style
        }
      })}
    >
      <CssBaseline />
      <AuthLayoutRoot>
        <Head>
          <link rel='shortcut icon' href='/favicon.svg' />
        </Head>
        <Container>
          <Box
            className='wrapper'
            sx={{
              maxWidth: '410px',
              mx: 'auto'
            }}
          >
            <Logo width='37' height='38' viewBox='0 0 37 38' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <rect width='9.08687' height='37.8619' rx='4.54343' fill='#635FC7' />
              <rect opacity='0.75' x='13.6304' width='9.08687' height='37.8619' rx='4.54343' fill='#635FC7' />
              <rect opacity='0.5' x='27.2607' width='9.08687' height='37.8619' rx='4.54343' fill='#635FC7' />
            </Logo>

            <Box>
              <Typography
                fontWeight='600'
                sx={{
                  color: '#121212',
                  lineHeight: 1.5,
                  fontSize: 'clamp(1.3125rem, 8vw, 1.75rem)'
                }}
              >
                {props.title}
              </Typography>
              <Typography
                sx={{
                  color: '#7D8398',
                  fontSize: 'clamp(0.640rem, 4vw, 1rem)',
                  lineHeight: 1.5,
                  mt: '6px'
                }}
              >
                {props.subtitle}
              </Typography>
              {props.children}
            </Box>
          </Box>
        </Container>
        <Box
          className='right-side'
          sx={{
            background: '#F4F7FD',
            display: 'grid',
            gridTemplateColumns: 'minmax(905px, 1fr)',
            '& img': {
              userSelect: 'none'
            }
          }}
        >
          <Box
            sx={{
              marginTop: '10.61%',
              marginBottom: '8.2082%',
              marginLeft: '10.765%',
              position: 'relative'
            }}
          >
            <Image
              src='/images/auth/auth.svg'
              aria-hidden='true'
              priority
              alt=''
              width={758}
              height={827}
              ref={imageRef}
              sizes='(min-width: 768px) 50vw'
              style={{
                width: '100%',
                height: 'auto',
                zIndex: isImageLoading ? -1 : 0,
                opacity: isImageLoading ? 0 : 1,
                transition: '250ms opacity',
                boxShadow: '-4px 4px 7px 1px rgba(62, 63, 78, 0.49)',
                borderRadius: 4
              }}
              onLoad={() => {
                setLoading(false);
              }}
            />
          </Box>
        </Box>
      </AuthLayoutRoot>
    </ThemeProvider>
  );
}
