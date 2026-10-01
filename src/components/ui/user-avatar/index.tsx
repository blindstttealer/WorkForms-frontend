import React, { forwardRef } from 'react';
import { Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
const UserName = styled.span`
  margin-left: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
`;
interface UserAvatarProps {
  name?: string;
  email?: string;
}
export const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(
  ({ email = '', name = '' }, ref) => (
    <div>
      <Space align="center" size="middle">
        <Avatar ref={ref} size="default" icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
        <UserName>{name}</UserName>
        <UserName>{email}</UserName>
      </Space>
    </div>
  ),
);
