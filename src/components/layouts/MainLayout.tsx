import { ReactNode } from 'react';
import { Box, styled } from '@mui/material';
import Header from '@/src/components/Header';
import Sidebar from '@/src/components/Sidebar';

const MainLayoutRoot = styled(Box)(({ theme }) => ({
  '--header-height': '96px',
  display: 'grid',
  gridTemplateColumns: '300px minmax(280px, 1fr)',
  gridTemplateRows: 'var(--header-height) auto',
  height: '100vh',
  overflow: 'auto',
  transition: theme.transitions.create('grid-template-columns'),
  [theme.breakpoints.down('md')]: {
    '--header-height': '80px',
    gridTemplateColumns: '260px minmax(280px, 1fr)',
    gridTemplateRows: 'var(--header-height) auto'
  },
  [theme.breakpoints.down('sm')]: {
    '--header-height': '64px',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'var(--header-height) auto'
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
