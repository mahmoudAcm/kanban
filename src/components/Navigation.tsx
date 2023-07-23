import { Button, styled, Typography } from '@mui/material';
import BoardIcon from '@/src/icons/BoardIcon';
import { NavSkeleton } from '@/src/components/NavigationLoadingScreen';
import usePageLoadingContext from '@/src/hooks/usePageLoadingContext';
import useBoardsSelector from '@/src/hooks/useBoardsSelector';
import { useAppDispatch } from '@/src/store';
import { dialogsActions } from '@/src/slices/dialogs';
import { DIALOG_IDS } from '@/src/constants';
import { boardsActions } from '@/src/slices/boards';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Nav = styled('nav')(({ theme }) => ({
  '--nav-left': '32px',
  marginTop: 54,
  gridRow: 'span 1',
  height: '100%',
  '& .ps__rail-y': {
    background: 'transparent !important'
  },
  [theme.breakpoints.down('md')]: {
    '--nav-left': '24px'
  }
}));

export const List = styled('ul')(() => ({
  margin: 0,
  padding: 0,
  listStyleType: 'none'
}));

export const Item = styled('li')(({ theme }) => ({
  ...theme.typography.h3,
  color: 'var(--medium-grey)',
  display: 'flex',
  gap: 16,
  alignItems: 'center',
  minHeight: 19,
  paddingLeft: 'var(--nav-left)',
  paddingTop: 14,
  paddingBottom: 15,
  cursor: 'pointer',
  userSelect: 'none',
  position: 'relative',
  isolation: 'isolate',
  marginRight: 24,
  borderTopRightRadius: 100,
  borderBottomRightRadius: 100,
  transition: theme.transitions.create(['background', 'color'], {
    duration: 150
  }),
  '&.active': {
    background: 'var(--main-purple)',
    color: 'white'
  },
  '&:hover': {
    background: theme.palette.__mode === 'DARK' ? 'white' : 'hsla(var(--main-purple-alpha), 0.10000000149011612)',
    color: 'var(--main-purple)'
  },
  [theme.breakpoints.down('md')]: {
    marginRight: 20,
    gap: 12
  }
}));

export const CreateNewBoardButton = styled(Button)(({ theme }) => ({
  width: 'calc(100% - 25px)',
  ...theme.typography.h3,
  color: 'var(--main-purple)',
  paddingLeft: 'var(--nav-left)',
  minHeight: 19,
  marginRight: 24,
  justifyContent: 'start',
  paddingTop: 14,
  paddingBottom: 15,
  gap: 16,
  borderRadius: 0,
  borderTopRightRadius: 100,
  borderBottomRightRadius: 100,
  '& .MuiButton-startIcon': {
    margin: 0
  },
  [theme.breakpoints.down('md')]: {
    // width: 'calc(100% - 21px)',
    marginRight: 20,
    gap: 12
  }
}));

export default function Navigation({ onMobileNavigationClose }: { onMobileNavigationClose?: () => void }) {
  const dispatch = useAppDispatch();
  const { isPageLoading } = usePageLoadingContext();
  const count = useBoardsSelector<'count'>(({ count }) => count);
  const boards = useBoardsSelector<'boards'>(({ boards }) => boards);
  const activeBoardId = useBoardsSelector<'activeBoardId'>(({ activeBoardId }) => activeBoardId);

  return (
    <Nav className='Navigation'>
      {isPageLoading ? (
        <NavSkeleton />
      ) : (
        <>
          <Typography
            variant='h4'
            color='var(--medium-grey)'
            className='Navigation-header'
            sx={{ paddingBottom: '19px', paddingLeft: 'var(--nav-left)' }}
          >
            ALL BOARDS ({count})
          </Typography>
          <PerfectScrollbar style={{ maxHeight: 48 * 3 }}>
            <List className='Navigation-list'>
              {Object.values(boards).map(board => (
                <Item
                  className={['Navigation-item', board.id === activeBoardId ? 'active' : ''].filter(Boolean).join(' ')}
                  key={board.id}
                  onClick={() => {
                    dispatch(boardsActions.setActiveBoardId(board.id));
                    if (onMobileNavigationClose) onMobileNavigationClose();
                  }}
                >
                  <BoardIcon />
                  {board.name}
                </Item>
              ))}
            </List>
          </PerfectScrollbar>
          <CreateNewBoardButton
            startIcon={<BoardIcon />}
            variant='text'
            className='Navigation-createNewBoard'
            onClick={() => {
              dispatch(dialogsActions.showDialog({ id: DIALOG_IDS.BOARD_DIALOG, type: 'create' }));
            }}
          >
            + Create New Board
          </CreateNewBoardButton>
        </>
      )}
    </Nav>
  );
}
