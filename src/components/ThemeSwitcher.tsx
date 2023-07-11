import { Box, styled } from '@mui/material';
import LightIcon from '@/src/icons/LightIcon';
import DarkIcon from '@/src/icons/DarkIcon';

const ThemeSwitcherRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: 23.67,
  alignItems: 'center',
  justifyContent: 'center',
  width: 251,
  minHeight: 20,
  padding: '14px 16px',
  background: theme.palette.background.default,
  marginLeft: 24,
  borderRadius: 6,
  [theme.breakpoints.down('md')]: {
    width: 235,
    marginLeft: 13
  }
}));

export default function ThemeSwitcher() {
  return (
    <ThemeSwitcherRoot>
      <LightIcon />
      <svg
        width='40'
        height='20'
        viewBox='0 0 40 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        style={{ cursor: 'pointer' }}
      >
        <rect width='40' height='20' rx='10' fill='#635FC7' />
        <circle cx='10' cy='10' r='7' fill='white' />
      </svg>
      <DarkIcon />
    </ThemeSwitcherRoot>
  );
}
