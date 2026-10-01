import { CheckboxField, FieldSet } from '@admiral-ds/react-ui';
import styled from 'styled-components';
import { css } from 'styled-components';
const labelStyles = css`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
`;
const LegendText = styled.legend`
  ${labelStyles};
  margin-bottom: -8px;
`;
type Props = {
  title: string;
  name: string;
  data: {
    id: string;
    value: string;
  }[];
};
export const CheckboxGroup = ({ title, name, data }: Props) => {
  return (
    <FieldSet flexDirection={'row'} name={name}>
      <LegendText>{title}</LegendText>
      {data.map((option) => (
        <StyledCheckboxField key={option.id}>{option.value}</StyledCheckboxField>
      ))}
    </FieldSet>
  );
};
const StyledCheckboxField = styled(CheckboxField)`
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
  border-radius: 8px;
  padding: 10px;
  max-width: 180px;
  width: 100%;
`;
