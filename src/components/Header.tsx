import { AppBar, Button, IconButton, Menu, MenuItem, styled, Toolbar, useTheme } from '@mui/material';
import PlusIcon from '@/src/icons/PlusIcon';
import VerticalDotsIcon from '@/src/icons/VerticalDotsIcon';
import NextLink from 'next/link';
import { useState } from 'react';
import MobileNavigation from '@/src/components/MobileNavigation';
import usePageLoadingContext from '@/src/hooks/usePageLoadingContext';
import { useAppDispatch } from '@/src/store';
import { dialogsActions } from '@/src/slices/dialogs';
import { DIALOG_IDS } from '@/src/constants';
import useBoardsSelector from '@/src/hooks/useBoardsSelector';

const Logo = styled('svg')(({ theme }) => ({
  display: 'none',
  marginRight: 16,
  [theme.breakpoints.down('sm')]: {
    display: 'block'
  },
  '&.Logo-pageLoading': {
    '& rect, & path': {
      fill: theme.palette.background.default
    }
  }
}));

const BoardName = styled(NextLink)(({ theme }) => ({
  ...theme.typography.h1,
  textDecoration: 'none',
  color: theme.palette.__mode === 'LIGHT' ? theme.palette.common.black : theme.palette.common.white,
  display: 'flex',
  alignItems: 'center',
  marginRight: 16,
  gap: 8,
  cursor: 'default',
  '& span': {
    maxWidth: '35ch',
    display: 'inline-block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    transition: theme.transitions.create('color')
  },
  '& svg': {
    display: 'none'
  },
  [theme.breakpoints.down('lg')]: {
    '& span': {
      maxWidth: '18ch'
    }
  },
  [theme.breakpoints.down('md')]: {
    // fontSize: '1.25rem'
    fontSize: 'clamp(0.875rem, 0.351rem + 1.405vw, 1.25rem)',
    '& span': {
      maxWidth: '13ch'
    }
  },
  [theme.breakpoints.down('sm')]: {
    ...theme.typography.h2,
    borderRadius: 2,
    paddingLeft: 4,
    paddingRight: 4,
    marginLeft: -4,
    cursor: 'pointer',
    transition: theme.transitions.create('background'),
    userSelect: 'none',
    fontSize: 'clamp(0.625rem, -0.622rem + 7.589vw, 1.156rem)',
    '& svg': {
      display: 'block'
    },
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.04)'
    }
  }
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  paddingTop: 20,
  minHeight: 48,
  '& .plus-icon': {
    display: 'none'
  },
  [theme.breakpoints.down('md')]: {
    paddingTop: 16,
    paddingBottom: 16
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: 32
  }
}));

const AddTaskButton = styled(Button)(({ theme }) => ({
  marginLeft: 'auto',
  paddingLeft: 24,
  paddingRight: 25,
  [theme.breakpoints.between('sm', 'lg')]: {
    fontSize: 'clamp(0.625rem, -0.362rem + 2.632vw, 0.938rem)'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '10px 18px',
    '& .text': {
      display: 'none'
    },
    '& .plus-icon': {
      display: 'inline-block'
    }
  }
}));

const BoardMenuButton = styled(IconButton)(({ theme }) => ({
  marginLeft: '8.5px',
  marginRight: '-15.5px',
  [theme.breakpoints.down('sm')]: {
    marginLeft: '0.5px'
  }
}));

export default function Header() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [isNavigationOpen, setNavigationOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { isPageLoading } = usePageLoadingContext();
  const board = useBoardsSelector(({ boards, activeBoardId }) => boards[activeBoardId]);

  const boardName = board?.name;

  const open = Boolean(anchorEl);

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position='sticky'
      elevation={0}
      color='transparent'
      sx={{
        height: '100%',
        background: theme => (theme.palette.__mode === 'DARK' ? 'var(--dark-grey)' : 'white'),
        borderBottom: theme => `1px solid ${theme.palette.divider}`
      }}
    >
      <StyledToolbar>
        <Logo
          width='24'
          height='25'
          viewBox='0 0 24 25'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={isPageLoading ? 'Logo-pageLoading' : undefined}
        >
          <rect width='6' height='25' rx='2' fill='#635FC7' />
          <rect opacity='0.75' x='9' width='6' height='25' rx='2' fill='#635FC7' />
          <rect opacity='0.5' x='18' width='6' height='25' rx='2' fill='#635FC7' />
        </Logo>
        <BoardName
          sx={{ display: isPageLoading ? 'none' : undefined }}
          href=''
          aria-label='Show Boards'
          id='mobile-navigation-button'
          aria-controls={isNavigationOpen ? 'mobile-navigation' : undefined}
          aria-haspopup='true'
          aria-expanded={isNavigationOpen ? 'true' : undefined}
          onClick={event => {
            event.preventDefault();
            setNavigationOpen(prevState => !prevState);
          }}
        >
          <span>{boardName ?? 'No Board Was Found'}</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='11'
            height='7'
            viewBox='0 0 9 7'
            fill='none'
            style={{
              transform: isNavigationOpen ? 'rotate(180deg)' : undefined
            }}
          >
            <path d='M1 1L5 5L9 1' stroke='#635FC7' strokeWidth='2' />
          </svg>
        </BoardName>
        <AddTaskButton
          size='large'
          aria-label='Add Task'
          disabled={isPageLoading || !board || board?.columns.length === 0}
          onClick={() => {
            dispatch(dialogsActions.showDialog({ id: DIALOG_IDS.TASK_DIALOG, type: 'create' }));
          }}
        >
          <span className='text'>+ Add New Task</span>
          <PlusIcon className='plus-icon' />
        </AddTaskButton>
        <BoardMenuButton
          aria-label='Board Button'
          onClick={event => {
            setAnchorEl(event.currentTarget);
          }}
          disabled={isPageLoading || !board}
        >
          <VerticalDotsIcon sx={{ width: '20px !important' }} />
        </BoardMenuButton>
      </StyledToolbar>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        PaperProps={{
          sx: {
            width: '192px',
            mt: '28px',
            ml: '20px',
            background: theme => (theme.palette.__mode === 'DARK' ? theme.palette.background.default : 'white'),
            [theme.breakpoints.down('md')]: {
              mt: '16px'
            },
            [theme.breakpoints.down('sm')]: {
              mt: '9px'
            }
          }
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem
          onClick={() => {
            dispatch(dialogsActions.showDialog({ id: DIALOG_IDS.BOARD_DIALOG, type: 'edit' }));
            closeMenu();
          }}
        >
          Edit Board
        </MenuItem>
        <MenuItem
          sx={{ color: 'var(--red)' }}
          onClick={() => {
            dispatch(dialogsActions.showDialog({ id: DIALOG_IDS.DELETE_BOARD_DIALOG }));
            closeMenu();
          }}
        >
          Delete Board
        </MenuItem>
      </Menu>
      <MobileNavigation
        open={isNavigationOpen}
        onClose={() => {
          setNavigationOpen(false);
        }}
      />
    </AppBar>
  );
}
