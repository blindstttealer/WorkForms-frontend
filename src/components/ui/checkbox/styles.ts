import styled from 'styled-components';
import { Checkbox as AntCheckbox, Typography, Space } from 'antd';
export const StyledCheckboxContainer = styled(Space)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const StyledCheckbox = styled(AntCheckbox)<{
  $error?: boolean;
}>`
  && {
    .ant-checkbox-inner {
      border-color: ${({ $error, theme }) => ($error ? theme.color['Error/Error 40'] : '')};
    }

    .ant-checkbox + span {
      padding-inline-start: 8px;
    }
  }
`;
export const HelperText = styled(Typography.Text)`
  font-size: 12px;
  margin-left: 24px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 40']};
`;
export const ErrorText = styled(Typography.Text)`
  font-size: 12px;
  margin-left: 24px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 40']};
`;
