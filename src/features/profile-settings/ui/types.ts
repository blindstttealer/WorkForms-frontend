import type { ComponentType, ReactNode } from 'react';
export type SettingsTabId = 'profile' | 'work' | 'notifications' | 'privacy' | 'account';
export type CheckboxOptionItem = {
  id: string;
  value: string;
};
export type SelectOptionItem = {
  value: string;
  label: string;
};
export type SettingsBlockProps = {
  children: ReactNode;
  title: string;
  icon?: ComponentType<{
    width?: number;
    height?: number;
  }>;
};
export type GeneralProps = {
  avatarSrc: string;
  onPhotoSelected: (file: File | null) => void;
  onPhotoError?: (message: string) => void;
};
export type AccountProps = {
  emailFromServer?: string;
};
