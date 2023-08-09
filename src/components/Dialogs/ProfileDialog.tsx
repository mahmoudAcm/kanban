import { Box, useTheme } from '@mui/material';
import { UserProfile } from '@clerk/nextjs';
import useDialogsSelector from '@/src/hooks/useDialogsSelector';
import { DIALOG_IDS } from '@/src/constants';
import { useAppDispatch } from '@/src/store';
import { dialogsActions } from '@/src/slices/dialogs';
import { Drawer } from 'vaul';

export default function ProfileDialog() {
  const dispatch = useAppDispatch();
  const {
    [DIALOG_IDS.PROFILE_DIALOG]: { show }
  } = useDialogsSelector();
  const theme = useTheme();

  const handleClose = () => {
    dispatch(dialogsActions.closeDialog(DIALOG_IDS.PROFILE_DIALOG));
  };

  const mode = theme.palette.__mode;

  return (
    <Drawer.Root
      open={show}
      dismissible
      closeThreshold={0.7}
      onOpenChange={open => {
        if (!open) handleClose();
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.25)',
            zIndex: theme.zIndex.drawer
          }}
          onClick={handleClose}
        />
        <Drawer.Content
          style={{
            background: mode === 'DARK' ? 'var(--dark-grey)' : 'white',
            position: 'fixed',
            left: 0,
            bottom: 0,
            right: 0,
            height: '98%',
            zIndex: theme.zIndex.drawer,
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8
          }}
        >
          <Box sx={{ overflow: 'auto', height: '98%' }}>
            <Box
              sx={{
                background: mode === 'DARK' ? 'rgba(212, 212, 216, 0.5)' : 'rgba(212, 212, 216, 1)',
                width: '60px',
                height: '6px',
                borderRadius: 9999,
                mx: 'auto',
                mt: '20px'
              }}
            />
            <UserProfile
              appearance={{
                elements: {
                  rootBox: {
                    width: '100%',
                    '& input': {
                      background: 'transparent',
                      borderColor: 'hsla(var(--medium-grey-alpha), 0.25)',
                      color: mode === 'DARK' ? theme.palette.common.white : theme.palette.common.black,
                      boxShadow: 'none !important'
                    },
                    "& [data-localization-key$='formButtonReset']": {
                      '--accent': 'var(--main-purple) !important',
                      '&:focus': {
                        boxShadow: 'var(--main-purple-hover) 0px 0px 0px 3px !important'
                      },
                      '&:active,&:hover': {
                        boxShadow: 'none !important',
                        color: 'white !important',
                        background: 'transparent !important'
                      }
                    },
                    ['& ' +
                    "[data-localization-key$='imageFormTitle']," +
                    "[data-localization-key$='formHint'], " +
                    "[data-localization-key$='detailsTitle__primary'], " +
                    "[data-localization-key$='destructiveActionTitle'], " +
                    "[data-localization-key$='formHint__noAccounts']"]: {
                      color: mode === 'DARK' ? 'white !important' : undefined
                    },
                    "[data-localization-key$='detailsSubtitle__primary'], [data-localization-key$='destructiveActionSubtitle']":
                      {
                        color: mode === 'DARK' ? 'var(--medium-grey) !important' : undefined
                      }
                  },
                  pageScrollBox: {
                    [theme.breakpoints.down('md')]: {
                      paddingTop: 0,
                      paddingLeft: 16,
                      paddingRight: 16
                    }
                  },
                  card: {
                    width: '100vw',
                    margin: 'auto !important',
                    borderRadius: 0,
                    background: 'transparent',
                    boxShadow: 'none',
                    '&  > :last-child': {
                      background: 'var(--main-purple) !important',
                      display: 'none !important'
                    }
                  },
                  navbar: { display: 'none' },
                  navbarMobileMenuButton: { display: 'none' },
                  badge: {
                    color: 'white !important',
                    background: 'var(--main-purple) !important'
                  },
                  profilePage__security: { display: 'none' },
                  profileSectionContent__profile: {
                    '& svg': {
                      stroke: 'white !important'
                    }
                  },
                  profileSectionTitle: {
                    borderColor: theme.palette.divider + '!important'
                  },
                  profileSectionTitleText: {
                    color: mode === 'DARK' ? 'white !important' : undefined
                  },
                  userPreviewMainIdentifier: {
                    color: mode === 'DARK' ? 'white !important' : undefined
                  },
                  userPreviewSecondaryIdentifier: {
                    color: mode === 'DARK' ? 'var(--medium-grey) !important' : undefined
                  },
                  headerTitle: { color: mode === 'DARK' ? 'white !important' : undefined },
                  headerSubtitle: {
                    color: 'var(--medium-grey) !important'
                  },
                  formFieldLabel: {
                    ...theme.typography.body2,
                    color:
                      mode === 'DARK' ? theme.palette.common.white + ' !important' : 'var(--medium-grey) !important'
                  },
                  formFieldErrorText: {
                    color: 'var(--red) !important'
                  },
                  profileSectionPrimaryButton: {
                    '--accent': mode === 'DARK' ? 'white' : theme.palette.common.black,
                    background: theme.palette.background.default,
                    '&:active': {
                      boxShadow: 'none !important',
                      background: theme.palette.background.default + ' !important',
                      ...theme.typography.body2
                    }
                  },
                  formButtonPrimary: {
                    '--accent': 'var(--main-purple) !important',
                    '&:focus': {
                      boxShadow: 'var(--main-purple-hover) 0px 0px 0px 3px !important'
                    },
                    '&:active,&:hover': {
                      background: 'var(--main-purple) !important'
                    }
                  },
                  accordionContent: {
                    '& *': {
                      '--accent': 'var(--red) !important'
                    }
                  },
                  accordionTriggerButton: {
                    color: mode === 'DARK' ? 'rgba(255, 255, 255, 0.8) !important' : undefined,
                    boxShadow: 'none !important',
                    '& svg': {
                      opacity: '1 !important',
                      stroke: 'var(--main-purple) !important'
                    }
                  },
                  avatarImageActionsRemove: { color: 'var(--red) !important' },
                  avatarImageActionsUpload: { color: 'var(--main-purple) !important' },
                  breadcrumbsItem: { color: mode === 'DARK' ? 'white !important' : undefined },
                  breadcrumbsItemDivider: { color: mode === 'DARK' ? 'white !important' : undefined },
                  breadcrumbsItem__currentPage: {
                    color: mode === 'DARK' ? 'var(--medium-grey) !important' : undefined
                  }
                }
              }}
            />
          </Box>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
