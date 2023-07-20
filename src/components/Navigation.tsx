import { Button, styled, Typography } from '@mui/material';
import BoardIcon from '@/src/icons/BoardIcon';
import { NavSkeleton } from '@/src/components/NavigationLoadingScreen';
import usePageLoadingContext from '@/src/hooks/usePageLoadingContext';

export const Nav = styled('nav')(({ theme }) => ({
  '--nav-left': '32px',
  marginTop: 54,
  marginLeft: 'var(--nav-left)',
  gridRow: 'span 1',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    '--nav-left': '24px'
  }
}));

export const List = styled('ul')(() => ({
  margin: 0,
  padding: 0,
  listStyleType: 'none',
  marginTop: 19
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
  marginLeft: 'calc(var(--nav-left) * -1)',
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
  width: '100%',
  ...theme.typography.h3,
  color: 'var(--main-purple)',
  paddingLeft: 'var(--nav-left)',
  minHeight: 19,
  paddingRight: 'calc(var(--nav-left) * 1.5)',
  justifyContent: 'start',
  paddingTop: 14,
  paddingBottom: 15,
  marginLeft: 'calc(var(--nav-left) * -1)',
  marginRight: 24,
  gap: 16,
  borderRadius: 0,
  borderTopRightRadius: 100,
  borderBottomRightRadius: 100,
  '& .MuiButton-startIcon': {
    margin: 0
  },
  [theme.breakpoints.down('md')]: {
    marginRight: 20,
    gap: 12
  }
}));
export default function Navigation() {
  const { isPageLoading } = usePageLoadingContext();

  return (
    <Nav className='Navigation'>
      {isPageLoading ? (
        <NavSkeleton />
      ) : (
        <>
          <Typography variant='h4' color='var(--medium-grey)' className='Navigation-header'>
            ALL BOARDS (3)
          </Typography>
          <List className='Navigation-list'>
            <Item className='active Navigation-item'>
              <BoardIcon />
              Platform Launch
            </Item>
            <Item className='Navigation-item'>
              <BoardIcon />
              Marketing Plan
            </Item>
            <Item className='Navigation-item'>
              <BoardIcon />
              Roadmap
            </Item>
          </List>
          <CreateNewBoardButton startIcon={<BoardIcon />} variant='text' className='Navigation-createNewBoard'>
            + Create New Board
          </CreateNewBoardButton>
        </>
      )}
    </Nav>
  );
}
