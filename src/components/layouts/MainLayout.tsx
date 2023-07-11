import { ReactNode } from 'react';
import { Box, styled } from '@mui/material';
import Header from '@/src/components/Header';
import Sidebar from '@/src/components/Sidebar';

const MainLayoutRoot = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '300px minmax(280px, 1fr)',
  gridTemplateRows: '96px minmax(400px, 1fr)',
  minHeight: '100vh',
  transition: theme.transitions.create('grid-template-columns'),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '260px minmax(280px, 1fr)',
    gridTemplateRows: '80px minmax(400px, 1fr)'
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gridTemplateRows: '64px minmax(400px, 1fr)'
  }
}));

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <MainLayoutRoot>
      <Sidebar />
      <Header />
      <Box component='main' sx={{ height: '100%', overflow: 'auto' }}>
        {children}
      </Box>
    </MainLayoutRoot>
  );
}
