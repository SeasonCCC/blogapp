import { Icon, Layout, Menu } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import "./index.css";
const SubMenu = Menu.SubMenu;

const { Header, Sider, Content } = Layout;

class Index extends React.Component {
  public state = {
    collapsed: false
  };

  public toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  public render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible={true}
          onCollapse={this.toggle}
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={["sub1", "sub2", "sub3"]}
            defaultSelectedKeys={["1"]}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="bars" />
                  <span>News</span>
                </span>
              }
            >
              <Menu.Item key="1">
                <Link to="/">
                  <Icon type="file-add" />
                  <span>Add News</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/login">
                  <Icon type="edit" />
                  <span>Edit News</span>
                </Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="bars" />
                  <span>Tips</span>
                </span>
              }
            >
              <Menu.Item key="3">
                <Icon type="file-add" />
                <span>Add Tips</span>
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="edit" />
                <span>Edit Tips</span>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="bars" />
                  <span>Exposure</span>
                </span>
              }
            >
              <Menu.Item key="5">
                <Icon type="file-add" />
                <span>Add Exposure</span>
              </Menu.Item>
              <Menu.Item key="6">
                <Icon type="edit" />
                <span>Edit Exposure</span>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="7">
              <Icon type="user" />
              <span>Users</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              background: "#fff",
              margin: "24px 16px",
              minHeight: 950,
              padding: 24
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Index;
