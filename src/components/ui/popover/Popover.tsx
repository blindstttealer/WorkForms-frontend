import React, { ReactNode } from 'react';
import { Button, Popover, Space } from 'antd';
import styled from 'styled-components';
type PopoverComponentProps = {
  buttonTitle: string;
  popoverTitle?: string;
  content: ReactNode;
};
export const StyledPopover = styled(Popover)`
  display: flex;
`;
const PopoverContent = styled.div``;
export const PopoverComponent: React.FC<PopoverComponentProps> = ({
  content,
  buttonTitle,
  popoverTitle,
}) => (
  <Space wrap>
    <StyledPopover
      content={<PopoverContent>{content}</PopoverContent>}
      title={popoverTitle || ''}
      trigger="click"
    >
      <Button>{buttonTitle}</Button>
    </StyledPopover>
  </Space>
);
