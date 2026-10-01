import React from 'react';
import { Table, Empty, Button, ConfigProvider } from 'antd';
import type { TableProps, ColumnsType } from 'antd/es/table';
interface ReusableTableProps<T> extends Omit<TableProps<T>, 'title'> {
  columns: ColumnsType<T>;
  data: T[];
  title?: React.ReactNode;
  toggleButtonLabel?: string;
  onToggleData?: () => void;
  emptyDescription?: React.ReactNode;
}
export function AntdTableComponent<
  T extends {
    key?: React.Key;
  },
>({
  columns,
  data,
  title,
  toggleButtonLabel = 'Toggle Data',
  onToggleData,
  emptyDescription = 'No Data',
  ...restProps
}: ReusableTableProps<T>) {
  const dataWithKeys = React.useMemo(() => {
    return data.map((item, index) => (item.key ? item : { ...item, key: index }));
  }, [data]);
  const renderEmpty = () => <Empty description={emptyDescription} />;
  const toggleButton = onToggleData ? (
    <Button type="primary" onClick={onToggleData} style={{ marginBottom: 12 }}>
      {toggleButtonLabel}
    </Button>
  ) : null;
  return (
    <ConfigProvider renderEmpty={renderEmpty}>
      {title && <h3>{title}</h3>}
      {toggleButton}
      <Table<T> columns={columns} dataSource={dataWithKeys} {...restProps} />
    </ConfigProvider>
  );
}
