import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, BarChartOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router';
import {
  Link,
  Redirect,
  Route,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';
import './main.scss';

const { Header, Sider, Content } = Layout;
// const CountContext = createContext(null);

const Main = (props: any) => {
  const { routes } = props;
  const [collapsed, setCollapsed] = useState(false);
  const [key] = useState('0');


  // useEffect(() => {
  //   console.log(props.routes);
  // });

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        onCollapse={() => { setCollapsed(!collapsed); }}
        collapsed={collapsed}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          openKeys={[key]}
          defaultOpenKeys={['sub1', 'sub2', 'sub3']}
          defaultSelectedKeys={['0']}
        >
          <Menu.Item key="0">
            <Link to="/index/dashboard" replace>
              <DashboardOutlined />
              <span>Dashboard</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="1">
            <Link to="/index/news" replace>
              <BarChartOutlined />
              <span>News</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="2">
            <Link to="/index/tips" replace>
              <BarChartOutlined />
              <span>Tips</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="3">
            <Link to="/index/exposure" replace>
              <BarChartOutlined />
              <span>Exposure</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="4">
            <Link to="/index/users" replace>
              <UserSwitchOutlined />
              <span>Users</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <DashboardOutlined className="trigger" onClick={() => { setCollapsed(!collapsed); }} />
          {/* <Icon
            className="trigger"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          /> */}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            minHeight: 950,
          }}
        >
          <Switch>
            {routes
              ? routes.map((route: IRoute): JSX.Element => {
                const Component = (
                  subProps: RouteComponentProps,
                ): JSX.Element => (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <route.component {...subProps} routes={route.routes} />
                );

                return (
                  <Route path={route.path} key={route.path} render={Component} />
                );
              })
              : ''}
            <Redirect to="/main/dashboard" />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};
export default withRouter(Main);
