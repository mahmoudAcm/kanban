import { Box, Checkbox, styled, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const SubtaskRoot = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  borderRadius: 4,
  padding: 3,
  display: 'flex',
  alignItems: 'center',
  gap: 7,
  position: 'relative',
  overflow: 'hidden',
  isolation: 'isolate',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    opacity: 0.25,
    transition: theme.transitions.create('background')
  },
  '&:hover::after': {
    background: 'var(--main-purple)'
  }
}));

interface SubtaskProps {
  title: string;
  checked?: boolean;
  onChange?: () => void;
}

export default function Subtask(props: SubtaskProps) {
  const [checked, setChecked] = useState(!!props.checked);

  useEffect(() => {
    setChecked(!!props.checked);
  }, [props.checked]);

  return (
    <SubtaskRoot>
      <Checkbox
        indeterminate={!checked}
        checked={checked}
        sx={{
          color: 'var(--main-purple)',
          '--fill': theme => (theme.palette.__mode === 'DARK' ? theme.palette.background.default : 'white')
        }}
        onChange={() => {
          setChecked(prevState => !prevState);
          if (props.onChange) props.onChange();
        }}
        onKeyDown={event => {
          if (event.key === 'Enter') setChecked(prevState => !prevState);
        }}
        indeterminateIcon={
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect width='16' height='16' rx='2' fill='var(--fill)' />
            <rect x='0.5' y='0.5' width='15' height='15' rx='1.5' stroke='rgba(130, 143, 163, 0.25)' />
          </svg>
        }
        checkedIcon={
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect width='16' height='16' rx='2' fill='var(--main-purple)' />
            <path d='M4.27588 8.06593L7.03234 10.8224L12.0323 5.82239' stroke='white' strokeWidth='2' />
          </svg>
        }
        inputProps={{
          'aria-label': 'complete subtask'
        }}
      />
      <Typography
        variant='body2'
        sx={{
          opacity: checked ? 0.5 : 1,
          textDecorationLine: checked ? 'line-through' : undefined,
          color: theme => (theme.palette.__mode === 'DARK' ? theme.palette.common.white : theme.palette.common.black),
          py: '9px'
        }}
      >
        {props.title}
      </Typography>
    </SubtaskRoot>
  );
}
