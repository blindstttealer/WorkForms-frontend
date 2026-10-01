import styled, { css } from 'styled-components';
import { Button } from '@admiral-ds/react-ui';
export const PageShell = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 16px 48px;
  font-family: 'VTB Group UI', sans-serif;
  text-rendering: geometricPrecision;
`;
export const StickyHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 5;
  margin: 0 -16px;
  padding: 16px 16px 0;
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  border-bottom: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
`;
export const HeaderTopRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 8px;
`;
export const PageTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;
export const PageTitle = styled.h1`
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  line-height: 28px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
`;
export const PageSubtitle = styled.p`
  margin: 0;
  max-width: 520px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 50']};
`;
export const TabBarWrap = styled.div`
  margin-top: 8px;
  padding-bottom: 4px;
`;
export const TabHint = styled.p`
  margin: 12px 0 0;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.color['Neutral/Neutral 60']};
  background: ${({ theme }) => theme.color['Neutral/Neutral 05']};
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
`;
export const TabContentViewport = styled.div`
  margin-top: 20px;
  min-height: min(420px, 55vh);
  max-height: calc(100vh - 200px);
  overflow-x: hidden;
  overflow-y: auto;
  padding-right: 4px;
  scroll-behavior: smooth;

  @media (max-width: 768px) {
    max-height: calc(100vh - 240px);
  }
`;
export const TabSectionStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 8px;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
export const SubTitle = styled.h3`
  margin: 0;
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
`;
export const SpanText = styled.span`
  color: ${({ theme }) => theme.color['Neutral/Neutral 50']};
  font-size: 14px;
  font-weight: 400;
`;
export const labelStyles = css`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
`;
export const LegendText = styled.legend`
  ${labelStyles};
  margin-bottom: -8px;
`;
export const StyledButton = styled(Button)`
  align-self: flex-start;
`;
export const HeaderSaveButton = styled(Button)`
  flex-shrink: 0;
  min-width: 148px;
`;
export const Card = styled.div<{
  hoverable?: boolean;
  background?: string;
}>`
  padding: 24px 32px;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
  width: 100%;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  ${({ background, theme }) => {
    const bg = background ?? 'Neutral/Neutral 00';
    return `
    background: ${theme.color[bg]};
  `;
  }}

  ${({ hoverable = true, theme }) =>
    hoverable &&
    `
    &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    border-color: ${theme.color['Primary/Primary 60 Main']};
    background-color: ${theme.color['Neutral/Neutral 05']};
  }`}
`;
export const Banner = styled.p`
  padding: 16px;
  margin: 0 0 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.color['Neutral/Neutral 05']};
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
`;
