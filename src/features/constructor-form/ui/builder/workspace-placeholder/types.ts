import type { WorkspaceNavSection } from '../../../model/store/builder-store';
export type WorkspacePlaceholderSection = Exclude<WorkspaceNavSection, 'workspace'>;
export interface WorkspacePlaceholderProps {
  section: WorkspacePlaceholderSection;
}
