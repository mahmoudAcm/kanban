import { Box, Button, styled, Typography } from '@mui/material';

const EmptyBoardRoot = styled(Box)(({ theme }) => ({
  display: 'grid',
  justifyItems: 'center',
  gap: '32px',
  paddingTop: '365px',
  paddingBottom: '460px',
  [theme.breakpoints.down('md')]: {
    padding: '329px 24px 496px',
    gap: '24px'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '211px 16px 274px',
    gap: '25px'
  }
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    maxWidth: '459px'
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%'
  }
}));

export default function EmptyBoard() {
  return (
    <EmptyBoardRoot>
      <StyledTypography variant='h2' sx={{ color: 'var(--medium-grey)', textAlign: 'center' }}>
        This board is empty. Create a new column to get started.
      </StyledTypography>
      <Button size='large' sx={{ paddingLeft: '17px', paddingRight: '18px', width: 'fit-content' }}>
        + Add New Column
      </Button>
    </EmptyBoardRoot>
  );
}
