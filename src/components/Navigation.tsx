import { Button, styled, Typography } from '@mui/material';
import BoardIcon from '@/src/icons/BoardIcon';
import { NavSkeleton } from '@/src/components/NavigationLoadingScreen';
import usePageLoadingContext from '@/src/hooks/usePageLoadingContext';
import useBoardsSelector from '@/src/hooks/useBoardsSelector';
import { useAppDispatch } from '@/src/store';
import { dialogsActions } from '@/src/slices/dialogs';
import { DIALOG_IDS } from '@/src/constants';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

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
  const router = useRouter();
  const { isPageLoading } = usePageLoadingContext();
  const __boards = useBoardsSelector(({ isBoardsReady, ...rest }) => rest);
  const containerRef = useRef<HTMLElement | null>(null);
  const scrolledToActiveItemRef = useRef(false);

  //scrolls to the current active item we only do this for the first render only
  useEffect(() => {
    if (scrolledToActiveItemRef.current) return;

    const board = __boards?.boards[__boards?.activeBoardId];
    const container = containerRef.current;

    if (board && container) {
      container.scrollTop = board.index * 48;
      scrolledToActiveItemRef.current = true;
    }
  }, [__boards?.boards, __boards?.activeBoardId]);

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
            ALL BOARDS ({__boards?.count ?? 0})
          </Typography>
          <PerfectScrollbar
            className='PerfectScrollbar'
            containerRef={container => (containerRef.current = container)}
            style={{ maxHeight: 48 * 5, height: 'auto' }}
          >
            <List className='Navigation-list'>
              {Object.values(__boards?.boards ?? {}).map(board => (
                <Item
                  className={['Navigation-item', board.id === __boards?.activeBoardId ? 'active' : '']
                    .filter(Boolean)
                    .join(' ')}
                  key={board.id}
                  onClick={async () => {
                    await router.push('/boards/' + board.id);
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
