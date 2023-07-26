import { THEMES } from '@/src/constants';
import { createTheme, ThemeOptions } from '@mui/material';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSansFont = Plus_Jakarta_Sans({
  weight: ['400', '500', '700'],
  display: 'swap',
  subsets: ['latin']
});

const baseOptions: ThemeOptions = {
  palette: {
    common: {
      black: 'hsla(237, 100%, 4%, 1)',
      white: 'hsla(0, 0%, 100%, 1)'
    }
  },
  typography: {
    ...plusJakartaSansFont.style,
    h1: {
      fontSize: '1.5rem',
      lineHeight: 1.25,
      fontWeight: 700
    },
    h2: {
      fontSize: '1.125rem',
      lineHeight: 23 / 18,
      fontWeight: 700
    },
    h3: {
      fontSize: '0.9375rem',
      lineHeight: 19 / 15,
      fontWeight: 700
    },
    h4: {
      fontSize: '0.75rem',
      lineHeight: 1.25,
      fontWeight: 700,
      letterSpacing: 2.4
    },
    body1: {
      fontSize: '0.8125rem',
      lineHeight: 23 / 13,
      fontWeight: 500
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.25,
      fontWeight: 700
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '&:root': {
          '--main-purple': 'hsl(242, 48%, 58%)',
          '--main-purple-hover': 'hsl(242, 100%, 82%)',
          '--dark-grey': 'hsl(235, 12%, 19%)',
          '--medium-grey': 'hsl(216, 15%, 57%)',
          '--red': 'hsl(0, 78%, 63%)',
          '--red-hover': 'hsl(0, 100%, 80%)',

          '--white-alpha': '0, 0%, 100%',
          '--main-purple-alpha': '242, 48%, 58%',
          '--main-purple-hover-alpha': '242, 100%, 82%',
          '--dark-grey-alpha': '235, 12%, 19%',
          '--medium-grey-alpha': '216, 15%, 57%',
          '--red-alpha': '0, 78%, 63%',
          '--red-hover-alpha': '0, 100%, 80%'
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained'
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 20
        },
        sizeLarge: ({ theme }) => {
          return {
            borderRadius: 24,
            ...theme.typography.h3,
            padding: '15px 61.5px 14px'
          };
        },
        sizeSmall: ({ theme }) => {
          return {
            ...theme.typography.body1,
            padding: '8px 69.5px 9px',
            fontWeight: 700
          };
        },
        containedPrimary: {
          background: 'var(--main-purple)',
          '&:hover': {
            background: 'var(--main-purple-hover)'
          }
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          '& .MuiList-root': {
            paddingTop: 12,
            paddingBottom: 12
          },
          borderRadius: 8,
          boxShadow: '0px 10px 20px 0px rgba(54, 78, 126, 0.25)'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            paddingTop: '4px !important',
            paddingBottom: '4px !important',
            minHeight: 'fit-content !important',
            color: 'var(--medium-grey)',
            ...theme.typography.body1
          };
        }
      }
    },
    MuiDialog: {
      defaultProps: {
        maxWidth: 'xs'
      },
      styleOverrides: {
        root: ({ theme, ownerState }) => {
          return {
            '& .MuiPaper-root': {
              maxWidth: ownerState.maxWidth === 'xs' ? 480 : undefined,
              boxShadow: 'none',
              borderRadius: 6,
              [theme.breakpoints.down('sm')]: {
                margin: 16,
                width: 'calc(100% - 32px)'
              }
            }
          };
        }
      }
    },
    MuiDialogTitle: {
      defaultProps: {
        component: 'div'
      },
      styleOverrides: {
        root: ({ theme }) => {
          return {
            padding: '32px 32px 0',
            [theme.breakpoints.down('sm')]: {
              padding: '24px 24px 0'
            }
          };
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            padding: '0 32px 32px',
            [theme.breakpoints.down('sm')]: {
              padding: '0 24px 24px'
            }
          };
        }
      }
    }
  }
};

const themeOptions: Record<keyof typeof THEMES, ThemeOptions> = {
  [THEMES.DARK]: {
    palette: {
      __mode: 'DARK',
      background: {
        default: 'hsla(235, 16%, 15%, 1)'
      },
      text: {
        primary: 'hsla(0, 0%, 100%, 1)'
      },
      divider: 'hsla(235, 12%, 27%, 1)'
    },
    components: {
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            '&.Mui-disabled': {
              color: 'hsla(var(--white-alpha), 0.25)',
              background: 'hsla(var(--main-purple-alpha), 0.25)'
            }
          },
          containedSecondary: {
            background: 'white !important',
            color: 'var(--main-purple)'
          }
        }
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            background: 'var(--dark-grey)'
          }
        }
      }
    }
  },
  [THEMES.LIGHT]: {
    palette: {
      __mode: 'LIGHT',
      background: {
        default: 'hsla(220, 69%, 97%, 1)'
      },
      text: {
        primary: 'hsla(237, 100%, 4%, 1)'
      },
      divider: 'hsla(221, 69%, 94%, 1)'
    },
    components: {
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            '&.Mui-disabled': {
              color: 'white',
              background: 'hsla(var(--main-purple-alpha), 0.25)'
            }
          },
          containedSecondary: {
            background: 'hsla(var(--main-purple-alpha), 0.10)',
            color: 'var(--main-purple)',
            '&:hover': {
              background: 'hsla(var(--main-purple-alpha), 0.25)'
            }
          }
        }
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            background: 'white'
          }
        }
      }
    }
  }
};

export const useCustomTheme = (mode: keyof typeof THEMES) => {
  let theme = themeOptions[mode];

  if (!theme) {
    console.warn('unknown theme was given');
    theme = themeOptions[THEMES.LIGHT];
  }

  return createTheme(baseOptions, theme);
};
