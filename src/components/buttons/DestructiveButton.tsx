import { Button, ButtonProps } from '@mui/material';

export default function DestructiveButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      sx={{
        background: 'var(--red)',
        px: '67.5px',
        '&:hover': {
          background: 'var(--red-hover)'
        },
        ...props?.sx
      }}
    >
      {props.children}
    </Button>
  );
}
