import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined, UserSwitchOutlined, ProjectFilled, FileTextFilled, AppstoreAddOutlined,
} from '@ant-design/icons';
import { withRouter } from 'react-router';
import {
  Link,
  Redirect,
  Route,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';
import './main.scss';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const { Header, Sider, Content } = Layout;

const EXCHANGE_RATES = gql`
  {
    getNews {
      id
      title
      content
      status
      createTime
      authorId
    }
  }
`;

const Main = (props: RouteComponentProps & { routes: IRoute[] }) => {
  const { routes, location } = props;
  const [collapsed, setCollapsed] = useState(false);
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  const routeArr = [
    '/main/dashboard',
    '/main/projects',
    '/main/articles',
    '/main/others',
    '/main/users',
  ];

  const keyIndex = routeArr.indexOf(location.pathname).toString();
  const [key, setKey] = useState(() => (keyIndex === '-1' ? '0' : keyIndex));

  useEffect(() => {
    if (location.pathname !== '/main/details') {
      setKey(keyIndex === '-1' ? '0' : keyIndex);
    }
  }, [props, keyIndex]);

  useEffect(() => {
    console.log(loading, error, data);
  }, [loading, error, data]);

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
          defaultSelectedKeys={[key]}
          selectedKeys={[key]}
        >
          <Menu.Item key="0">
            <Link to="/main/dashboard" replace>
              <DashboardOutlined />
              <span>Dashboard</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="1">
            <Link to="/main/projects" replace>
              <ProjectFilled />
              <span>Projects</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="2">
            <Link to="/main/articles" replace>
              <FileTextFilled />
              <span>Articles</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="3">
            <Link to="/main/others" replace>
              <AppstoreAddOutlined />
              <span>Others</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="4">
            <Link to="/main/users" replace>
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
            minHeight: 900,
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
