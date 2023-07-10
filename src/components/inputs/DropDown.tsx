import { FormControl, FormLabel, Select, SelectProps, styled } from '@mui/material';
import { ReactNode, useId } from 'react';

const Label = styled(FormLabel)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.__mode === 'DARK' ? theme.palette.common.white + ' !important' : 'var(--medium-grey) !important'
}));

const Input = styled(Select)(({ theme }) => ({
  border: '1px solid hsla(var(--medium-grey-alpha), 0.25)',
  borderRadius: 4,
  padding: 0,
  ...theme.typography.body1,
  '& .MuiSelect-select': {
    padding: '8px 16px 9px',
    height: 'auto',
    color: theme.palette.__mode === 'DARK' ? theme.palette.common.white : theme.palette.common.black
  },
  '& ::placeholder': {
    opacity: 0.25,
    color: theme.palette.__mode === 'DARK' ? theme.palette.common.white : theme.palette.common.black,
    ...theme.typography.body1
  },
  '& fieldset': {
    border: 'none'
  },
  '&.Mui-focused': {
    borderColor: 'var(--main-purple)'
  }
}));

interface DropDownProps extends Pick<SelectProps, 'sx' | 'fullWidth' | 'error' | 'children' | 'value'> {
  label: string;
  helperText?: ReactNode | string;
}

export default function DropDown(props: DropDownProps) {
  const id = useId();
  const { sx, fullWidth, error, label, helperText, children, ...rest } = props;

  return (
    <FormControl sx={{ gap: '8px', ...sx }} fullWidth={fullWidth} error={error}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        value={props.value}
        sx={{ overflow: 'hidden' }}
        MenuProps={{
          sx: {
            '& .MuiPaper-root': {
              background: theme => theme.palette.background.default,
              marginTop: '5px'
            }
          }
        }}
        IconComponent={() => {
          return (
            <svg
              width='11'
              height='8'
              viewBox='0 0 11 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              style={{ position: 'absolute', right: 15.8, pointerEvents: 'none' }}
            >
              <path d='M0.798462 1.54865L5.49694 6.24713L10.1954 1.54865' stroke='#635FC7' strokeWidth='2' />
            </svg>
          );
        }}
      >
        {children}
      </Input>
    </FormControl>
  );
}
