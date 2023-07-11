import { createCustomSvgIcon } from '@/src/libs/createCustomSvgIcon';

const PlusIcon = createCustomSvgIcon(
  <path d='M7.368 12V7.344H12V4.632H7.368V0H4.656V4.632H0V7.344H4.656V12H7.368Z' fill='white' />,
  'PlusIcon',
  {
    viewBox: '0 0 12 12',
    style: {
      width: '12px',
      height: '12px'
    },
    xmlns: 'http://www.w3.org/2000/svg'
  }
);

export default PlusIcon;
