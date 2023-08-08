import { SignUpTheme } from '@clerk/types/dist/appearance';
import { Hanken_Grotesk } from 'next/font/google';

const hankenGroteskFont = Hanken_Grotesk({
  weight: ['400', '600'],
  display: 'swap',
  subsets: ['latin']
});

export const clerkAppearanceElements: SignUpTheme['elements'] = {
  logoBox: {
    width: 'max-content',
    height: '37px'
  },
  logoImage: {
    height: '37px'
  },
  rootBox: {
    '@media(max-width:400px)': {
      width: '100%'
    }
  },
  card: {
    '@media(max-width:400px)': {
      width: '100%'
    },
    padding: '2rem',
    boxShadow: '0px 0px 100px 0px rgba(0, 0, 0, 0.25)'
  },
  formButtonPrimary: {
    backgroundColor: 'rgb(32, 33, 44)',
    '&:hover, &:focus, &:active': {
      backgroundColor: 'rgb(61, 62, 77)'
    }
  },
  footerActionLink: {
    ...hankenGroteskFont.style,
    color: 'rgb(32, 33, 44)',
    fontWeight: '500',
    '&:hover, &:focus, &:active': {
      color: 'rgb(61, 62, 77)'
    }
  }
};
