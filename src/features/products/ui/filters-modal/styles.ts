import styled from 'styled-components';
import { Modal } from 'antd';
export const StyledModal = styled(Modal)`
  width: 100%;
  .ant-modal-content {
    border-radius: 12px;
    padding: 24px;
  }

  .ant-modal-header {
    border-bottom: none;
    padding-bottom: 0;
  }

  .ant-modal-body {
    padding: 16px 0;
  }

  .ant-modal-footer {
    border-top: none;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
`;
