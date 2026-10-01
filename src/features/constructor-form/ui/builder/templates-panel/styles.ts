import styled from 'styled-components';
import { Panel, PanelBody, PanelHeader, PanelHeaderTitle } from '../../shared/styles';
export const TemplatesPanelShell = styled(Panel)``;
export const TemplatesPanelHeader = styled(PanelHeader)``;
export const TemplatesPanelTitle = styled(PanelHeaderTitle)``;
export const TemplatesScroll = styled(PanelBody)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
`;
export const TemplateCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
`;
export const TemplateCardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;
export const TemplateCardActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
export const StatusBadge = styled.span<{
  $variant?: 'draft' | 'published';
}>`
  display: inline-flex;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme, $variant }) =>
    $variant === 'published'
      ? theme.color['Success/Success 50 Main']
      : theme.color['Neutral/Neutral 50']};
  background: ${({ theme, $variant }) =>
    $variant === 'published'
      ? theme.color['Success/Success 10']
      : theme.color['Neutral/Neutral 10']};
`;
