import { FormControl, FormLabel, InputAdornment, InputBase, InputBaseProps, styled } from '@mui/material';
import { ReactNode, useId } from 'react';

const Label = styled(FormLabel)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.__mode === 'DARK' ? theme.palette.common.white + ' !important' : 'var(--medium-grey) !important'
}));

const Input = styled(InputBase)(({ theme }) => ({
  border: '1px solid hsla(var(--medium-grey-alpha), 0.25)',
  borderRadius: 4,
  padding: 0,
  ...theme.typography.body1,
  '& input, & textarea': {
    padding: '8px 16px 9px',
    height: 'auto',
    color: theme.palette.__mode === 'DARK' ? theme.palette.common.white : theme.palette.common.black
  },
  '& ::placeholder': {
    opacity: 0.25,
    color: theme.palette.__mode === 'DARK' ? theme.palette.common.white : theme.palette.common.black,
    ...theme.typography.body1
  },
  '&.Mui-error': {
    borderColor: 'var(--red)',
    '& .MuiInputAdornment-root ': {
      marginLeft: 0,
      '& .MuiTypography-root': {
        color: 'var(--red)',
        background: theme.palette.background.default,
        paddingRight: 16
      }
    }
  }
}));

interface TextFieldProps extends Omit<InputBaseProps, 'endAdornment'> {
  label: string;
  helperText?: ReactNode | string;
}

export default function TextField(props: TextFieldProps) {
  const id = useId();
  const { sx, fullWidth, error, label, placeholder, multiline, helperText, ...rest } = props;

  return (
    <FormControl sx={{ gap: '8px', ...sx }} fullWidth={fullWidth} error={error}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        placeholder={placeholder}
        multiline={multiline}
        {...rest}
        sx={{ overflow: 'hidden' }}
        endAdornment={
          helperText && !props.multiline && props.error && <InputAdornment position='end'>{helperText}</InputAdornment>
        }
      />
    </FormControl>
  );
}
