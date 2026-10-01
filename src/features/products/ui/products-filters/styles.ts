import styled from 'styled-components';
import { Card } from 'antd';
export const StyledFilters = styled(Card)`
  width: 100%;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 20px;
  margin-right: 24px;

  .ant-collapse {
    background: transparent;
    border: none;
  }

  .ant-collapse-item {
    border-bottom: 1px solid #f0f0f0;
  }

  .ant-collapse-header {
    padding: 12px 0 !important;
    font-weight: 500;
  }

  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .price-inputs {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  }

  .filter-actions {
    display: flex;
    gap: 8px;
    margin-top: 16px;
  }
`;
