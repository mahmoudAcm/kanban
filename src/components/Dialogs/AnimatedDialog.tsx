import { Dialog, DialogProps, Fade, Slide, SlideProps, useMediaQuery, useTheme } from '@mui/material';
import { useMemo } from 'react';

interface AnimatedDialogProps extends Omit<DialogProps, 'TransitionComponent' | 'TransitionProps'> {
  TransitionProps?: DialogProps['TransitionProps'] & {
    direction: SlideProps['direction'];
  };
}

export default function AnimatedDialog(props: AnimatedDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(() => theme.breakpoints.down('sm'));

  const TransitionComponent = useMemo(() => {
    return isMobile ? Fade : Slide;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  return <Dialog {...props} TransitionComponent={TransitionComponent} />;
}
