import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout(props: AuthLayoutProps) {
  return (
    <Container>
      <Box sx={{ py: '50px', minHeight: '100vh', display: 'grid', placeItems: 'center' }}>{props.children}</Box>
    </Container>
  );
}
