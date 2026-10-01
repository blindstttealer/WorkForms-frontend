import styled from 'styled-components';
export const FormFieldsGridRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export const FormFieldsGridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 18px;
  align-items: start;
`;
export const FormFieldsGridCell = styled.div<{
  $span: number;
}>`
  grid-column: span ${({ $span }) => $span};
  min-width: 0;
  box-sizing: border-box;
`;
