import { Avatar, Box, styled, Typography } from '@mui/material';
import { Roboto } from 'next/font/google';
import HorizontalDotsIcon from '@/src/icons/HorizontalDotsIcon';

const robotoFont = Roboto({
  weight: ['400', '700'],
  display: 'swap',
  subsets: ['latin']
});

const ProfileCardRoot = styled(Box)(({ theme }) => ({
  '--profile-card-root': '24px',
  width: 'calc(100% - var(--profile-card-root) * 2)',
  display: 'flex',
  minHeight: '38px',
  alignItems: 'center',
  gap: 13,
  padding: 6,
  borderRadius: 100,
  marginLeft: 'var(--profile-card-root)',
  marginRight: 'var(--profile-card-root)',
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.04)',
    cursor: 'pointer'
  },
  [theme.breakpoints.down('md')]: {
    '--profile-card-root': '13px'
  }
}));

const StyledTypography = styled(Typography)(() => ({
  ...robotoFont.style
}));

export default function ProfileCard() {
  return (
    <ProfileCardRoot>
      <Avatar src='/images/profile.svg' sx={{ width: '38px', height: '38px' }} alt='' />
      <Box sx={{ display: 'grid', gap: '5px', flex: 1, userSelect: 'none' }}>
        <StyledTypography sx={{ fontSize: '0.8125rem', lineHeight: 15 / 13, fontWeight: 600 }}>
          Mahmoud Tarek
        </StyledTypography>
        <StyledTypography sx={{ fontSize: '0.75rem', lineHeight: 15 / 12, color: 'var(--medium-grey)' }}>
          @Mahmoud03066050
        </StyledTypography>
      </Box>
      <HorizontalDotsIcon />
    </ProfileCardRoot>
  );
}
