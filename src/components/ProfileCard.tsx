import { Avatar, Box, Menu, MenuItem, styled, Typography } from '@mui/material';
import { Roboto } from 'next/font/google';
import HorizontalDotsIcon from '@/src/icons/HorizontalDotsIcon';
import { MouseEvent, useState } from 'react';

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
  '&:hover, &:focus': {
    background: 'rgba(0, 0, 0, 0.04)',
    cursor: 'pointer'
  },
  '&:focus': {
    outlineColor: theme.palette.common.black
  },
  [theme.breakpoints.down('md')]: {
    '--profile-card-root': '13px'
  }
}));

const StyledTypography = styled(Typography)(() => ({
  ...robotoFont.style
}));

export default function ProfileCard() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (anchorEl) {
      anchorEl.blur();
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        PaperProps={{
          sx: {
            mt: '-9px',
            width: 273,
            overflow: 'visible',
            // boxShadow: '0px 0px 13px -2px rgba(54, 78, 126, 0.25)',
            background: theme => (theme.palette.__mode === 'DARK' ? theme.palette.background.default : 'white'),
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              bottom: -10,
              left: (273 - 10) / 2,
              width: 10,
              height: 10,
              background: theme => (theme.palette.__mode === 'DARK' ? theme.palette.background.default : 'white'),
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        MenuListProps={{
          'aria-labelledby': 'profile-button'
        }}
      >
        <MenuItem onClick={handleClose}>Add an existing account</MenuItem>
        <MenuItem onClick={handleClose}>Log out @Mahmoud03066050</MenuItem>
      </Menu>
      <ProfileCardRoot
        id='profile-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        tabIndex={0}
        onKeyDown={event => {
          if (event.key === 'Enter') setAnchorEl(event.currentTarget);
        }}
      >
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
    </>
  );
}
