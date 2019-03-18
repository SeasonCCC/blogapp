import { Icon, Layout, Menu } from 'antd'
import * as React from 'react'
import { Link, Redirect, Route, Switch } from 'react-router-dom'
import './index.css'
// const SubMenu = Menu.SubMenu

const { Header, Sider, Content } = Layout

interface IndexProps {
  routes: object[];
}

class Index extends React.Component<IndexProps, {}> {
  public state = {
    collapsed: false
  };

  // private constructor (props: IndexProps) {
  //   super(props)
  // }

  public toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  };

  public componentDidMount (): void {
    // console.log(this.props)
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
            // defaultOpenKeys={['sub1', 'sub2', 'sub3']}
            defaultSelectedKeys={['0']}
          >
            <Menu.Item key='0'>
              <Link to='/dashboard' replace>
                <Icon type='dashboard' />
                <span>Dashboard</span>
              </Link>
            </Menu.Item>

            <Menu.Item key='1'>
              <Link to='/news' replace>
                <Icon type='bars' />
                <span>News</span>
              </Link>
            </Menu.Item>

            <Menu.Item key='2'>
              <Link to='/tips' replace>
                <Icon type='bars' />
                <span>Tips</span>
              </Link>
            </Menu.Item>

            <Menu.Item key='3'>
              <Link to='/exposure' replace>
                <Icon type='bars' />
                <span>Exposure</span>
              </Link>
            </Menu.Item>

            {/* <SubMenu
              key='1'
              title={
                <span>
                  <Icon type='bars' />
                  <span>News</span>
                </span>
              }
            >
              <Menu.Item key='1'>
                <Link to='/news' replace>
                  <Icon type='file-add' />
                  <span>Add News</span>
                </Link>
              </Menu.Item>
              <Menu.Item key='2'>
                <Link to='/'>
                  <Icon type='edit' />
                  <span>Edit News</span>
                </Link>
              </Menu.Item>
            </SubMenu> */}

            {/* <SubMenu
              key='sub2'
              title={
                <span>
                  <Icon type='bars' />
                  <span>Tips</span>
                </span>
              }
            >
              <Menu.Item key='3'>
                <Link to='/tips' replace>
                  <Icon type='file-add' />
                  <span>Add Tips</span>
                </Link>
              </Menu.Item>
              <Menu.Item key='4'>
                <Icon type='edit' />
                <span>Edit Tips</span>
              </Menu.Item>
            </SubMenu> */}

            {/* <SubMenu
              key='sub3'
              title={
                <span>
                  <Icon type='bars' />
                  <span>Exposure</span>
                </span>
              }
            >
              <Menu.Item key='5'>
                <Icon type='file-add' />
                <span>Add Exposure</span>
              </Menu.Item>
              <Menu.Item key='6'>
                <Icon type='edit' />
                <span>Edit Exposure</span>
              </Menu.Item>
            </SubMenu> */}

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
              {this.props.routes.map((route: any, i: number) => {
                const Component = (props: any): JSX.Element => (
                  <route.component {...props} routes={route.routes} />
                )

                return (
                  <Route path={route.path} key={i} render={Component} />
                )
              })}
              <Redirect to='/dashboard' />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Index
