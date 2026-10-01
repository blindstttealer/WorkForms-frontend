import { Outlet } from 'react-router';
import React from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { observer } from 'mobx-react-lite';
function MainLayout() {
  const [collapsed, setCollapsed] = React.useState(false);
  const toggleCollapse = () => setCollapsed(!collapsed);
  return (
    <AppLayout collapsed={collapsed} toggleCollapse={toggleCollapse}>
      <Outlet />
    </AppLayout>
  );
}
export default observer(MainLayout);
