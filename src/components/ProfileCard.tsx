import { Avatar, Box, Menu, MenuItem, styled, Typography } from '@mui/material';
import { Roboto } from 'next/font/google';
import HorizontalDotsIcon from '@/src/icons/HorizontalDotsIcon';
import { MouseEvent, useEffect, useId, useRef, useState } from 'react';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { dialogsActions } from '@/src/slices/dialogs';
import { DIALOG_IDS } from '@/src/constants';
import { useAppDispatch } from '@/src/store';

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

const StyledTypography = styled(Typography)(({ theme }) => ({
  ...robotoFont.style,
  width: '20ch',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  '&.name': {
    transition: theme.transitions.create('color')
  },
  [theme.breakpoints.down('md')]: {
    width: '18ch'
  }
}));

export default function ProfileCard() {
  const dispatch = useAppDispatch();
  const id = useId();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user } = useUser();
  const userRef = useRef<typeof user>();

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (anchorEl) {
      anchorEl.blur();
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress && user.fullName) {
      userRef.current = user;
    }
  }, [user]);

  const email = (user ?? userRef.current)?.primaryEmailAddress?.emailAddress;
  const fullName = (user ?? userRef.current)?.fullName;
  const imageUrl = (user ?? userRef.current)?.imageUrl ?? '';

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
            minWidth: 273,
            overflow: 'visible',
            // boxShadow: '0px 0px 13px -2px rgba(54, 78, 126, 0.25)',
            background: theme => (theme.palette.__mode === 'DARK' ? theme.palette.background.default : 'white'),
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              bottom: -10,
              left: '50%',
              width: 10,
              height: 10,
              background: theme => (theme.palette.__mode === 'DARK' ? theme.palette.background.default : 'white'),
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        MenuListProps={{
          'aria-labelledby': id + 'profile-button'
        }}
      >
        <MenuItem
          onClick={() => {
            dispatch(dialogsActions.showDialog({ id: DIALOG_IDS.PROFILE_DIALOG }));
            handleClose();
          }}
        >
          Manage Account Information
        </MenuItem>
        <SignOutButton>
          <MenuItem>
            <span style={{ width: '26ch', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              Log out {email}
            </span>
          </MenuItem>
        </SignOutButton>
      </Menu>
      <ProfileCardRoot
        id={id + 'profile-button'}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        tabIndex={0}
        onKeyDown={event => {
          if (event.key === 'Enter') setAnchorEl(event.currentTarget);
        }}
      >
        <Avatar src={imageUrl} sx={{ width: '38px', height: '38px' }} alt='' />
        <Box sx={{ display: 'grid', gap: '5px', flex: 1, userSelect: 'none' }}>
          <StyledTypography sx={{ fontSize: '0.8125rem', lineHeight: 15 / 13, fontWeight: 600 }} className='name'>
            {fullName}
          </StyledTypography>
          <StyledTypography
            sx={{
              fontSize: '0.75rem',
              lineHeight: 15 / 12,
              color: 'var(--medium-grey)'
            }}
          >
            {email}
          </StyledTypography>
        </Box>
        <HorizontalDotsIcon />
      </ProfileCardRoot>
    </>
  );
}
