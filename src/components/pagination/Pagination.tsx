import React, { ReactNode } from 'react';
import { Pagination as AntdPagination, PaginationProps } from 'antd';

export const Pagination: React.FC<PaginationProps> = ({
  current,
  defaultCurrent = 1,
  pageSize,
  defaultPageSize = 10,
  total = 0,
  showSizeChanger = total > 50,
  pageSizeOptions = [10, 20, 50, 100],
  showQuickJumper = true,
  showTotal,
  disabled,
  hideOnSinglePage = false,
  responsive = true,
  size = 'default',
  onChange,
  ...rest
}) => {
  return (
    <AntdPagination
      current={current}
      defaultCurrent={defaultCurrent}
      pageSize={pageSize}
      defaultPageSize={defaultPageSize}
      total={total}
      showSizeChanger={showSizeChanger}
      pageSizeOptions={pageSizeOptions.map(String)}
      showQuickJumper={showQuickJumper}
      showTotal={showTotal as (total: number, range: [number, number]) => ReactNode}
      disabled={disabled}
      hideOnSinglePage={hideOnSinglePage}
      responsive={responsive}
      size={size}
      onChange={(page, size) => {
        onChange?.(page, size);
      }}
      {...rest}
    />
  );
};
