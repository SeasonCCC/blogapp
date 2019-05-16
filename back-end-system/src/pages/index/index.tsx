import { Icon, Layout, Menu } from 'antd'
import * as React from 'react'
import { Link, Redirect, Route, Switch } from 'react-router-dom'
import './index.css'
// const SubMenu = Menu.SubMenu

const { Header, Sider, Content } = Layout

interface IProps {
  routes?: object[];
}

interface IRoute {
  component: JSX.Element;
  path: string;
  routes: {
    component: JSX.Element;
    path: string;
  }[];
}

class Index extends React.Component<IProps, {}> {
  public state = {
    collapsed: false
  }

  // private constructor (props: IndexProps) {
  //   super(props)
  // }

  public toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  // public renderRouter (): void {
  //   const { routes } = this.props
  //   console.log(routes)
  //   if (routes) {
  //     routes.map((route: any, i: number) => {
  //       const Component = (props: any): JSX.Element => (
  //         <route.component {...props} routes={route.routes} />
  //       )

  //       return <Route path={route.path} key={i} render={Component} />
  //     })
  //   }
  // }

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
            // defaultOpenKeys={['sub1', 'sub2', 'sub3']}
            defaultSelectedKeys={['0']}
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
              <Icon type='user' />
              <span>Users</span>
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
                ? this.props.routes.map((route: object, i: number) => {
                  const Component = (): JSX.Element => (
                    <route.component routes={route.routes} />
                  )

                  return (
                    <Route path={route.path} key={i} render={Component} />
                  )
                })
                : ''}

              {/* {this.renderRouter} */}
              <Redirect to='/index/dashboard' />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Index
