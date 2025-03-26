import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor marginTop={0.3} width="80%" height="80%" src={`/assets/icons/navbar/${name}.svg`}  />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: icon('dashboard'),
  },
  {
    title: 'User',
    path: '/user',
    icon: icon('users'),
  },
  {
    title: 'Post',
    path: '/post',
    icon: icon('add-post'),
  },
  {
    title: 'Report Post',
    path: '/reportpost',
    icon: icon('ic-report'),
  },
  {
    title: 'Settings',
    path: '/setting',
    icon: icon('settings'),
  },
  
];
