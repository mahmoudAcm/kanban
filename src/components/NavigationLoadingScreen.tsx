import { Box, Skeleton } from '@mui/material';

export function NavSkeleton() {
  return (
    <Box sx={{ paddingLeft: 'var(--nav-left)' }}>
      <Skeleton
        animation='wave'
        variant='rounded'
        sx={{
          background: theme => theme.palette.background.default,
          width: '126px',
          height: '10.5px'
        }}
      />
      <Box sx={{ mt: '37.5px', display: 'grid', gap: '29px', '& .row': { display: 'flex', gap: '16px' } }}>
        <Box className='row'>
          <Skeleton
            animation='wave'
            variant='circular'
            sx={{
              background: theme => theme.palette.background.default,
              width: '16px',
              height: '16px'
            }}
          />
          <Skeleton
            animation='wave'
            variant='rounded'
            sx={{
              background: theme => theme.palette.background.default,
              width: '88px',
              height: '13.13px'
            }}
          />
        </Box>
        <Box className='row'>
          <Skeleton
            animation='wave'
            variant='circular'
            sx={{
              background: theme => theme.palette.background.default,
              width: '16px',
              height: '16px'
            }}
          />
          <Skeleton
            animation='wave'
            variant='rounded'
            sx={{
              background: theme => theme.palette.background.default,
              width: '59px',
              height: '13.13px'
            }}
          />
        </Box>
        <Box className='row'>
          <Skeleton
            animation='wave'
            variant='circular'
            sx={{
              background: theme => theme.palette.background.default,
              width: '16px',
              height: '16px'
            }}
          />
          <Skeleton
            animation='wave'
            variant='rounded'
            sx={{
              background: theme => theme.palette.background.default,
              width: '50px',
              height: '13.13px'
            }}
          />
        </Box>
        <Box className='row'>
          <Skeleton
            animation='wave'
            variant='circular'
            sx={{
              background: theme => theme.palette.background.default,
              width: '16px',
              height: '16px'
            }}
          />
          <Skeleton
            animation='wave'
            variant='rounded'
            sx={{
              background: theme => theme.palette.background.default,
              width: '142px',
              height: '13.13px'
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export function ProfileCardSkeleton() {
  return (
    <Box sx={{ display: 'flex', gap: '13px', mx: 'auto', minHeight: '38px', width: 'min(252px, calc(100% - 32px))' }}>
      <Skeleton
        animation='wave'
        variant='circular'
        sx={{
          background: theme => theme.palette.background.default,
          minWidth: '38px',
          minHeight: '38px'
        }}
      />
      <Box sx={{ width: 'max-content', flex: 1 }}>
        <Skeleton
          animation='wave'
          variant='rounded'
          sx={{
            background: theme => theme.palette.background.default,
            width: '95px',
            height: '11.375px'
          }}
        />

        <Skeleton
          animation='wave'
          variant='rounded'
          sx={{
            background: theme => theme.palette.background.default,
            width: '120px',
            height: '10.5px',
            mt: '8.62px'
          }}
        />
      </Box>
    </Box>
  );
}

export function ThemeSwitcherSkeleton() {
  return (
    <Skeleton
      animation='wave'
      variant='rounded'
      sx={{
        mx: 'auto',
        width: 'min(251px, calc(100% - 32px))',
        height: '48px',
        background: theme => theme.palette.background.default
      }}
    ></Skeleton>
  );
}
