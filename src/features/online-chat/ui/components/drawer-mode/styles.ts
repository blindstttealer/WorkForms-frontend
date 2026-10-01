import { HEADER_HEIGHT } from '@/shared/const';
import { Drawer } from '@admiral-ds/react-ui';
import { styled } from 'styled-components';
export const StyledDrawer = styled(Drawer)`
  position: fixed;
  /* top: ${HEADER_HEIGHT}px; */
  height: 100vh;
  z-index: 900;
`;
