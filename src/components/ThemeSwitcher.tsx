import { Box, styled, Switch } from '@mui/material';
import LightIcon from '@/src/icons/LightIcon';
import DarkIcon from '@/src/icons/DarkIcon';
import useCustomTheme from '@/src/hooks/useCustomTheme';

const pxToRem = (px: number, oneRemPx = 16) => `${px / oneRemPx}rem`;

const width = pxToRem(40);
const height = pxToRem(20);
const size = pxToRem(14);
const gap = (20 - 14) / 2;

const SwitchRoot = styled(Switch)(({ theme }) => ({
  width,
  height,
  padding: 0,
  overflow: 'unset',
  '& .MuiSwitch-switchBase': {
    padding: pxToRem(gap),
    border: 'none',
    '&.Mui-checked': {
      color: '#fff',
      transform: `translateX(calc(${width} - ${size} - ${pxToRem(2 * gap)}))`,
      '& + .MuiSwitch-track': {
        backgroundColor: 'var(--main-purple)',
        opacity: 1
      }
    }
  },
  '&:hover .MuiSwitch-track': {
    backgroundColor: 'var(--main-purple-hover) !important'
  },
  '& .MuiSwitch-track': {
    borderRadius: 40,
    backgroundColor: 'var(--main-purple)',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
    boxSizing: 'border-box'
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    backgroundColor: 'white',
    width: size,
    height: size
  }
}));

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
  const { mode, toggleTheme } = useCustomTheme();

  return (
    <ThemeSwitcherRoot>
      <LightIcon />
      <SwitchRoot checked={mode === 'DARK'} onChange={toggleTheme} />
      <DarkIcon />
    </ThemeSwitcherRoot>
  );
}
