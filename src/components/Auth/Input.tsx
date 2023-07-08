import { FormControl, FormLabel, InputBase, InputProps as DefaultInputProps, styled } from '@mui/material';
import { useId } from 'react';

const StyledInput = styled(InputBase)(() => ({
  border: '1px solid rgba(125, 131, 152, 0.30)',
  boxShadow: '0px 3px 6px 0px rgba(18, 18, 18, 0.03)',
  borderRadius: '6px',
  overflow: 'hidden',
  '& input': {
    padding: '12px 16px'
  },
  '& ::placeholder': {
    fontWeight: 400,
    color: 'hsla(227, 12%, 54%, 1)',
    // opacity: '1 !important',
    fontSize: '1rem',
    lineHeight: 1.5
  }
}));

interface InputProps {
  label: string;
  inputProps?: DefaultInputProps;
}

export default function Input(props: InputProps) {
  const id = useId();

  return (
    <FormControl variant='standard' fullWidth required sx={{ gap: '6px' }}>
      <FormLabel sx={{ fontSize: '1rem', lineHeight: 1.5 }} htmlFor={id}>
        {props.label}
      </FormLabel>
      <StyledInput {...props.inputProps} id={id} />
    </FormControl>
  );
}
