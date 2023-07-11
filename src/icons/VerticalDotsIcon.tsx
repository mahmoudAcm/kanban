import { createCustomSvgIcon } from '@/src/libs/createCustomSvgIcon';

const VerticalDotsIcon = createCustomSvgIcon(
  <>
    <circle cx='2.30769' cy='2.30769' r='2.30769' fill='#828FA3' />
    <circle cx='2.30769' cy='10' r='2.30769' fill='#828FA3' />
    <circle cx='2.30769' cy='17.6923' r='2.30769' fill='#828FA3' />
  </>,
  'VerticalDotsIcon',
  {
    viewBox: '0 0 5 20',
    style: {
      width: '5px',
      height: '20px'
    },
    xmlns: 'http://www.w3.org/2000/svg'
  }
);

export default VerticalDotsIcon;
