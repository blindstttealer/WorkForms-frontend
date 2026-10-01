import styled, { keyframes } from 'styled-components';
const fadeSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const modalPopIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.96) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;
export const DocumentGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 120px;
  margin-top: 14px;
  padding: 8px 4px;
`;
export const GridRowWrap = styled.div`
  display: flex;
  align-items: stretch;
  gap: 0;
  min-height: 8px;
  position: relative;
`;
export const GridRowInner = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 18px;
  align-items: start;
  flex: 1;
  min-width: 0;
`;
export const GridCellWrap = styled.div<{
  $span: number;
}>`
  grid-column: span ${({ $span }) => $span};
  min-width: 0;
  position: relative;
  box-sizing: border-box;
`;
export const GapCellWrap = styled.div<{
  $span: number;
}>`
  grid-column: span ${({ $span }) => $span};
  min-width: 0;
  position: relative;
  box-sizing: border-box;
`;
export const CellInsertOverlay = styled.div<{
  $raised?: boolean;
}>`
  position: absolute;
  left: -10px;
  top: 0;
  bottom: 0;
  width: 20px;
  z-index: ${({ $raised }) => ($raised ? 8 : 4)};
`;
export const InlineInsertAreaHost = styled.div<{
  $variant: 'row' | 'column' | 'empty';
  $active?: boolean;
  $hovered?: boolean;
}>`
  position: relative;
  box-sizing: border-box;
  transition:
    min-height 0.18s ease,
    padding 0.18s ease;

  ${({ $variant, $active }) =>
    $variant === 'row'
      ? `
    width: 100%;
    min-height: ${$active ? '52px' : '10px'};
    padding: ${$active ? '4px 0' : '2px 0'};
    cursor: ${$active ? 'default' : 'pointer'};
  `
      : $variant === 'empty'
        ? `
    width: 100%;
    min-height: ${$active ? '72px' : '120px'};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${$active ? '12px' : '24px'};
    cursor: ${$active ? 'default' : 'pointer'};
  `
        : `
    width: 100%;
    height: 100%;
    min-width: 20px;
    cursor: ${$active ? 'default' : 'pointer'};
  `}
`;
export const InlineInsertAreaHint = styled.div<{
  $variant: 'row' | 'column' | 'empty';
  $visible?: boolean;
}>`
  pointer-events: none;
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;

  ${({ $variant, theme }) =>
    $variant === 'row'
      ? `
    position: absolute;
    left: 8%;
    right: 8%;
    top: 50%;
    height: 2px;
    transform: translateY(-50%) scaleX(0.92);
    border-radius: 999px;
    background: ${theme.color['Primary/Primary 30']};
    opacity: 0;
  `
      : $variant === 'empty'
        ? `
    width: 48px;
    height: 48px;
    border-radius: 999px;
    border: 2px dashed ${theme.color['Neutral/Neutral 20']};
    opacity: 0.45;
  `
        : `
    position: absolute;
    left: 50%;
    top: 12%;
    bottom: 12%;
    width: 2px;
    transform: translateX(-50%) scaleY(0.92);
    border-radius: 999px;
    background: ${theme.color['Primary/Primary 30']};
    opacity: 0;
  `}

  opacity: ${({ $visible, $variant }) =>
    $visible ? ($variant === 'empty' ? 1 : 0.85) : undefined};

  ${({ $visible, $variant }) =>
    $visible
      ? `
    transform: ${
      $variant === 'row'
        ? 'translateY(-50%) scaleX(1)'
        : $variant === 'column'
          ? 'translateX(-50%) scaleY(1)'
          : 'none'
    };
  `
      : ''}

  ${InlineInsertAreaHost}:hover & {
    opacity: ${({ $variant }) => ($variant === 'empty' ? 1 : 0.85)};
    transform: ${({ $variant }) =>
      $variant === 'row'
        ? 'translateY(-50%) scaleX(1)'
        : $variant === 'column'
          ? 'translateX(-50%) scaleY(1)'
          : 'none'};
  }
`;
export const InlineInsertAreaPanel = styled.div<{
  $variant?: 'row' | 'column' | 'empty';
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color['Primary/Primary 30']};
  background: ${({ theme }) => theme.color['Primary/Primary 10']};
  box-shadow: 0 4px 16px rgba(0, 98, 255, 0.08);
  animation: ${fadeSlideIn} 0.18s ease;
  box-sizing: border-box;

  ${({ $variant }) =>
    $variant === 'column'
      ? `
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 8;
    width: max(240px, 100%);
    transform: translate(-50%, -50%);
  `
      : ''}
`;
export const InlineInsertAreaInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font: inherit;
  font-size: 14px;
  line-height: 1.4;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};

  &::placeholder {
    color: ${({ theme }) => theme.color['Neutral/Neutral 40']};
  }
`;
export const InlineInsertAreaPlusButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  border: 1px solid ${({ theme }) => theme.color['Primary/Primary 30']};
  transition: all 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
    color: ${({ theme }) => theme.color['Neutral/Neutral 00']};
    border-color: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
  }
`;
export const EmptyDocumentZone = styled.div<{
  $active?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 160px;
  margin: 8px 4px;
  border-radius: 16px;
  border: 2px dashed
    ${({ $active, theme }) =>
      $active ? theme.color['Primary/Primary 40'] : theme.color['Neutral/Neutral 20']};
  background: ${({ $active, theme }) =>
    $active ? theme.color['Primary/Primary 10'] : theme.color['Neutral/Neutral 05']};
  transition:
    border-color 0.18s ease,
    background 0.18s ease;

  &:hover {
    border-color: ${({ $active, theme }) =>
      $active ? theme.color['Primary/Primary 40'] : theme.color['Primary/Primary 30']};
    background: ${({ $active, theme }) =>
      $active ? theme.color['Primary/Primary 10'] : theme.color['Primary/Primary 10']};
  }
`;
export const InsertPopoverBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
`;
export const InsertPopoverPanel = styled.div`
  position: fixed;
  z-index: 101;
  width: min(520px, calc(100vw - 24px));
  max-height: min(70vh, 560px);
  overflow: auto;
  padding: 12px;
  border-radius: 16px;
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
  box-shadow: 0 20px 48px rgba(15, 23, 42, 0.16);
  animation: ${fadeSlideIn} 0.2s ease;
`;
export const InsertPopoverGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;
export const InsertCardRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
  background: ${({ theme }) => theme.color['Neutral/Neutral 05']};
  transition: all 0.18s ease;

  &:hover {
    border-color: ${({ theme }) => theme.color['Primary/Primary 30']};
    box-shadow: 0 8px 20px rgba(0, 98, 255, 0.08);
  }
`;
export const InsertCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const InsertCardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 50']};

  svg {
    display: block;
  }
`;
export const InsertCardPreview = styled.div`
  padding: 8px 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
  min-height: 36px;
  display: flex;
  align-items: center;
`;
export const InsertCardAction = styled.button`
  align-self: flex-end;
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  color: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
  background: ${({ theme }) => theme.color['Primary/Primary 10']};
  transition: all 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
    color: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  }
`;
export const GhostInsertPreview = styled.div<{
  $span: number;
}>`
  flex: 0 0 ${({ $span }) => ($span / 12) * 100}%;
  min-height: 56px;
  margin: 6px 4px;
  border-radius: 12px;
  border: 2px dashed ${({ theme }) => theme.color['Primary/Primary 40']};
  background: ${({ theme }) => theme.color['Primary/Primary 10']};
  animation: ${fadeSlideIn} 0.2s ease;
`;
export const ResizeControlWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
`;
export const SpanChip = styled.button<{
  $active?: boolean;
}>`
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.color['Primary/Primary 40'] : theme.color['Neutral/Neutral 10']};
  background: ${({ $active, theme }) =>
    $active ? theme.color['Primary/Primary 10'] : theme.color['Neutral/Neutral 00']};
  color: ${({ $active, theme }) =>
    $active ? theme.color['Primary/Primary 60 Main'] : theme.color['Neutral/Neutral 50']};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.color['Primary/Primary 30']};
  }
`;
export const BuilderFieldShell = styled.div<{
  $active?: boolean;
  $isDragging?: boolean;
}>`
  position: relative;
  border-radius: 12px;
  padding: 10px;
  border: 2px solid
    ${({ $active, $isDragging, theme }) =>
      $isDragging
        ? theme.color['Primary/Primary 30']
        : $active
          ? theme.color['Primary/Primary 60 Main']
          : 'transparent'};
  background: ${({ $isDragging, theme }) =>
    $isDragging ? theme.color['Primary/Primary 10'] : 'transparent'};
  transition:
    border-color 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease,
    opacity 0.18s ease;
  cursor: grab;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }

  &:hover {
    border-color: ${({ $active, $isDragging, theme }) =>
      $isDragging
        ? theme.color['Primary/Primary 30']
        : $active
          ? theme.color['Primary/Primary 60 Main']
          : theme.color['Primary/Primary 30']};
  }

  ${({ $active, $isDragging }) =>
    $active && !$isDragging
      ? `
    box-shadow: 0 8px 24px rgba(0, 98, 255, 0.12);
  `
      : ''}

  ${({ $isDragging }) =>
    $isDragging
      ? `
    opacity: 0.4;
  `
      : ''}
`;
export const BuilderFieldLabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px 2px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 50']};

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.color['Neutral/Neutral 50']};
  }
`;
export const DragOverlayCard = styled.div`
  cursor: grabbing;
  box-sizing: border-box;
`;
export const BuilderFieldChrome = styled.div<{
  $visible?: boolean;
}>`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 6;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border-radius: 10px;
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.1);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transition: opacity 0.15s ease;

  ${BuilderFieldShell}:hover & {
    opacity: 1;
    pointer-events: auto;
  }
`;
export const BuilderFieldContent = styled.div`
  padding: 4px 8px 8px;
  pointer-events: auto;
  user-select: none;

  input,
  textarea,
  button,
  select {
    user-select: text;
  }
`;
export const InsertModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(15, 23, 42, 0.52);
  backdrop-filter: blur(4px);
  animation: ${fadeIn} 0.2s ease;
`;
export const InsertModalViewport = styled.div`
  position: fixed;
  inset: 0;
  z-index: 201;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  pointer-events: none;
`;
export const InsertModalPanel = styled.div`
  position: relative;
  pointer-events: auto;
  width: min(920px, calc(100vw - 48px));
  max-height: min(85vh, 780px);
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
  box-shadow: 0 32px 64px rgba(15, 23, 42, 0.2);
  animation: ${modalPopIn} 0.22s ease;
  overflow: hidden;
`;
export const InsertModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 24px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
`;
export const InsertModalBody = styled.div`
  flex: 1;
  overflow: auto;
  padding: 16px 24px 24px;
`;
export const InsertModalSearchWrap = styled.div`
  padding: 0 24px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
`;
export const InsertCategoryTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px 24px 0;
`;
export const InsertCategoryTab = styled.button<{
  $active?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.color['Primary/Primary 40'] : theme.color['Neutral/Neutral 10']};
  background: ${({ $active, theme }) =>
    $active ? theme.color['Primary/Primary 10'] : theme.color['Neutral/Neutral 00']};
  color: ${({ $active, theme }) =>
    $active ? theme.color['Primary/Primary 60 Main'] : theme.color['Neutral/Neutral 50']};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.color['Primary/Primary 30']};
  }
`;
export const InsertModalCloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 24px;
  line-height: 1;
  color: ${({ theme }) => theme.color['Neutral/Neutral 50']};
  background: ${({ theme }) => theme.color['Neutral/Neutral 05']};
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.color['Neutral/Neutral 10']};
    color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
  }
`;
export const InsertCardDescription = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
  color: ${({ theme }) => theme.color['Neutral/Neutral 50']};
`;
export const InsertCardPreviewWrap = styled.div`
  padding: 8px 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
  pointer-events: none;
  user-select: none;
`;
export { DropIndicatorHost, RowDropIndicatorHost } from '../grid/drop-indicator.styles';
