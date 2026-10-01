import { T } from '@admiral-ds/react-ui';
import { APP_UI_ICONS } from '@/shared/icons';
import { PlaceholderIconWrap, PlaceholderPanel } from './styles';
import type { WorkspacePlaceholderProps } from './types';
const PLACEHOLDER_CONTENT: Record<
  WorkspacePlaceholderProps['section'],
  {
    title: string;
    description: string;
    icon: keyof typeof APP_UI_ICONS;
  }
> = {
  templates: {
    title: 'Templates',
    description: 'Готовые шаблоны форм появятся здесь. Пока создавайте формы в My workspace.',
    icon: 'templates',
  },
  'whats-new': {
    title: "What's new",
    description: 'Обновления конструктора и новые возможности будут отображаться в этом разделе.',
    icon: 'whatsNew',
  },
  archive: {
    title: 'Архив',
    description: 'Архивированные формы можно восстановить в Templates.',
    icon: 'archive',
  },
};
export function WorkspacePlaceholder({ section }: WorkspacePlaceholderProps) {
  const content = PLACEHOLDER_CONTENT[section];
  const Icon = APP_UI_ICONS[content.icon];
  return (
    <PlaceholderPanel>
      <PlaceholderIconWrap>
        <Icon width={32} height={32} />
      </PlaceholderIconWrap>
      <T font="Header/H4" as="h2">
        {content.title}
      </T>
      <T
        font="Body/Body 1 Long"
        color="Neutral/Neutral 50"
        as="p"
        style={{ marginTop: 12, maxWidth: 360 }}
      >
        {content.description}
      </T>
    </PlaceholderPanel>
  );
}
WorkspacePlaceholder.displayName = 'WorkspacePlaceholder';
