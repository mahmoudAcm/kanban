import { toast } from 'react-toastify';
import { IconButton, Typography } from '@mui/material';
import SuccessIcon from '@/src/icons/SuccessIcon';
import { ReactNode } from 'react';
import ErrorIcon from '@/src/icons/ErrorIcon';

const mapTypeToIcon: Record<string, ReactNode> = {
  success: <SuccessIcon sx={{ width: '22px !important' }} />,
  error: <ErrorIcon sx={{ width: '22px !important' }} />
};

interface Options {
  type: 'success' | 'error' | 'default';
  isLoading?: boolean;
  onClose?: () => void;
}

export default function $toast(content: string, options: Options) {
  return toast(() => <Typography variant='h3'>{content}</Typography>, {
    icon: options.isLoading ? undefined : mapTypeToIcon[options.type as string],
    type: options.type,
    autoClose: false,
    isLoading: options.isLoading,
    closeOnClick: false,
    draggable: false,
    closeButton: options.isLoading ? (
      <></>
    ) : (
      () => (
        <IconButton
          size='small'
          sx={{ mr: '-12px !important', my: 'auto', ml: 2 }}
          onClick={options.onClose}
          className='Toastify__toast-closeIcon'
        >
          <svg width='22px' height='22px' viewBox='0 0 24 24' data-testid='CloseIcon'>
            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
          </svg>
        </IconButton>
      )
    )
  });
}

export function $toastUpdate(toastId: number | string, options: Partial<Options> & { message: string }) {
  toast.update(toastId, {
    icon: options.isLoading ? undefined : mapTypeToIcon[options.type as string],
    type: options.type,
    isLoading: options.isLoading,
    render: () => <Typography variant='h3'>{options.message}</Typography>,
    closeOnClick: false,
    draggable: false,
    closeButton: options.isLoading ? (
      <></>
    ) : (
      () => (
        <IconButton
          size='small'
          sx={{ mr: '-12px !important', my: 'auto', ml: 2 }}
          onClick={options.onClose}
          className='Toastify__toast-closeIcon'
        >
          <svg width='22px' height='22px' viewBox='0 0 24 24' data-testid='CloseIcon'>
            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
          </svg>
        </IconButton>
      )
    )
  });
}

export const $toastify = toast;
