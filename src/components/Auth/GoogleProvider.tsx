import GoogleIcon from '@/src/icons/GoogleIcon';
import { Button, ButtonProps } from '@mui/material';

// @ts-ignore
interface GoogleProviderProps extends ButtonProps {
  type: 'signIn' | 'signUp';
}

export default function GoogleProvider(props: GoogleProviderProps) {
  const { sx, type, ...rest } = props;

  const text = {
    signIn: 'Sign in',
    signUp: 'Sign up'
  }[type];

  return (
    <Button
      {...rest}
      fullWidth
      variant='outlined'
      startIcon={<GoogleIcon />}
      sx={{
        borderRadius: '6px',
        fontSize: '1rem',
        textTransform: 'none',
        lineHeight: 1.5,
        color: '#121212',
        borderColor: 'rgba(125, 131, 152, 0.30) !important',
        fontWeight: 400,
        py: '12px',
        '&:hover': {
          background: 'white'
        },
        ...sx
      }}
    >
      {text} with Google
    </Button>
  );
}
