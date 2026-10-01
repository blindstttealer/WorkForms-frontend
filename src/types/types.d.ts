import 'styled-components';
import type { Theme as AdmiralTheme } from '@admiral-ds/react-ui';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- module augmentation for Admiral theme
  export interface DefaultTheme extends AdmiralTheme {}
}
