import { Icon, Layout, Menu } from 'antd'
import * as React from 'react'
// import routes from '../../router/router'

import { Link, Redirect, Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom'
import './index.css'
// const SubMenu = Menu.SubMenu

const { Header, Sider, Content } = Layout

interface IRoute {
  // component: typeof dashboard | typeof Exposure | typeof News| typeof Tips;
  component: React.ReactType;
  path: string;
  routes?: IRoute[];
}

interface IProps extends RouteComponentProps {
  routes?: IRoute[];
}

class Index extends React.Component<IProps, {}> {
  public state = {
    collapsed: false,
    key: '0'
  };

  public componentWillMount (): void {
    // console.log(123)
    let routeArr = [
      '/index/dashboard',
      '/index/news',
      '/index/tips',
      '/index/exposure',
      '/index/users'
    ]
    this.setState({
      key: routeArr.indexOf(this.props.location.pathname).toString()
    })
    console.log(this.props.location.pathname)
  }

  // public constructor (props: IProps) {
  //   super(props)
  // }

  public toggle (): void {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  public render (): JSX.Element {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          onCollapse={this.toggle}
          collapsed={this.state.collapsed}
        >
          <div className='logo' />
          <Menu
            theme='dark'
            mode='inline'
            // openKeys={[this.state.key]}
            // defaultOpenKeys={['sub1', 'sub2', 'sub3']}
            defaultSelectedKeys={[this.state.key]}
          >
            <Menu.Item key='0'>
              <Link to='/index/dashboard' replace>
                <Icon type='dashboard' />
                <span>Dashboard</span>
              </Link>
            </Menu.Item>

            <Menu.Item key='1'>
              <Link to='/index/news' replace>
                <Icon type='bars' />
                <span>News</span>
              </Link>
            </Menu.Item>

            <Menu.Item key='2'>
              <Link to='/index/tips' replace>
                <Icon type='bars' />
                <span>Tips</span>
              </Link>
            </Menu.Item>

            <Menu.Item key='3'>
              <Link to='/index/exposure' replace>
                <Icon type='bars' />
                <span>Exposure</span>
              </Link>
            </Menu.Item>

            <Menu.Item key='4'>
              <Link to='/index/users' replace>
                <Icon type='user' />
                <span>Users</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className='trigger'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              minHeight: 950
            }}
          >
            <Switch>
              {this.props.routes
                ? this.props.routes.map((route: IRoute, i: number) => {
                  const Component = (): JSX.Element => (
                    <route.component routes={route.routes} />
                  )

                  return (
                    <Route path={route.path} key={i} render={Component} />
                  )
                })
                : ''}
              <Redirect to='/index/dashboard' />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(Index)
