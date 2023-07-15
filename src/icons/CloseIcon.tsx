import { createCustomSvgIcon } from '@/src/libs/createCustomSvgIcon';

const CloseIcon = createCustomSvgIcon(
  <>
    <rect x='12.7275' width='3' height='18' transform='rotate(45 12.7275 0)' fill='#828FA3' />
    <rect y='2.12132' width='3' height='18' transform='rotate(-45 0 2.12132)' fill='#828FA3' />
  </>,
  'CloseIcon',
  {
    viewBox: '0 0 15 15',
    style: {
      width: '15px',
      height: '15px'
    },
    xmlns: 'http://www.w3.org/2000/svg'
  }
);

export default CloseIcon;
