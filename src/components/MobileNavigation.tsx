import Navigation from '@/src/components/Navigation';
import { Box, Dialog, useMediaQuery, useTheme } from '@mui/material';
import ProfileCard from '@/src/components/ProfileCard';
import ThemeSwitcher from '@/src/components/ThemeSwitcher';

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(() => theme.breakpoints.down('sm'));

  return (
    <Dialog
      id='mobile-navigation'
      aria-labelledby='mobile-navigation-button'
      disableEnforceFocus
      open={open && isMobile}
      onClose={onClose}
      sx={{
        zIndex: theme.zIndex.appBar - 1,
        '& .MuiDialog-container': {
          alignItems: 'start',
          marginTop: '79px'
        }
      }}
      PaperProps={{
        sx: {
          maxWidth: '264px !important',
          boxShadow: '0px 10px 20px 0px rgba(54, 78, 126, 0.25) !important',
          '& .Navigation': {
            mt: '16px'
          },
          '& .PerfectScrollbar': {
            maxHeight: 'calc(48px * 3) !important'
          },
          '& .Navigation-item, & .Navigation-createNewBoard': {
            '--nav-left': '24px',
            marginRight: '24px'
          }
        }
      }}
    >
      <Navigation onMobileNavigationClose={onClose} />
      <Box sx={{ height: '100%', display: 'grid', gap: '16px', paddingBottom: '16px', mt: '26px' }}>
        <ProfileCard />
        <ThemeSwitcher />
      </Box>
    </Dialog>
  );
}
