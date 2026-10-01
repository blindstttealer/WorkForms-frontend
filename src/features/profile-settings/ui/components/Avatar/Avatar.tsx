import { FileInput } from '@admiral-ds/react-ui';
import { useCallback } from 'react';
import { MAX_PHOTO_BYTES, PHOTO_ACCEPT } from './const';
import { AvatarBlockProps } from './types';
import { AvatarImage, AvatarWrapper } from './styles';
export const AvatarPhoto = ({ imageSrc, onPhotoSelected, onPhotoError }: AvatarBlockProps) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (!file) {
      onPhotoSelected(null);
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      onPhotoError?.('Файл больше 5 МБ');
      onPhotoSelected(null);
      return;
    }
    onPhotoSelected(file);
  }, []);
  return (
    <AvatarWrapper>
      <AvatarImage key={imageSrc} src={imageSrc} alt="Фото пользователя" />
      <FileInput
        title="Загрузить фото"
        dimension="m"
        accept={PHOTO_ACCEPT}
        onChange={handleChange}
      />
    </AvatarWrapper>
  );
};
