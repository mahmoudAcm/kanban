import { Box, Button, Dialog, DialogContent, DialogTitle, styled, Typography } from '@mui/material';
import DestructiveButton from '@/src/components/buttons/DestructiveButton';

const Actions = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '16px',
  '& button': {
    padding: '8px 6px 9px'
  },
  [theme.breakpoints.down(400)]: {
    flexDirection: 'column'
  }
}));

interface DeleteDialogProps {
  open: boolean;
  isDeleting?: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

export default function DeleteDialog(props: DeleteDialogProps) {
  return (
    <Dialog open={props.open} fullWidth onClose={props.onClose}>
      <DialogTitle sx={{ color: 'var(--red)' }}>
        <Typography variant='h2'>{props.title}</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant='body1' sx={{ color: 'var(--medium-grey)', mt: '24px' }}>
          {props.content}
        </Typography>
        <Actions sx={{ mt: '24px' }}>
          <DestructiveButton fullWidth onClick={props.onDelete} disabled={props.isDeleting}>
            Delete
          </DestructiveButton>
          <Button color='secondary' fullWidth onClick={props.onCancel} disabled={props.isDeleting}>
            Cancel
          </Button>
        </Actions>
      </DialogContent>
    </Dialog>
  );
}
