import React from 'react';
import {
  Card, Col, Row, List, Avatar,
} from 'antd';
import CountUp from 'react-countup';
import { FileTextFilled, ProjectFilled, AppstoreAddOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router';
import './dashboard.scss';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const Dashboard = () => (
  <div>
    <Row gutter={16}>
      <Col span={8}>
        <Card bordered={false}>
          <ProjectFilled className="iconWarp" />
          <div className="content">
            <p className="title">Projects</p>
            <p className="number">
              <CountUp start={0} end={100} duration={5} />
            </p>
          </div>
        </Card>
      </Col>

      <Col span={8}>
        <Card bordered={false}>
          <FileTextFilled className="iconWarp" />
          <div className="content">
            <p className="title">Articles</p>
            <p className="number">
              <CountUp start={0} end={100} duration={5} />
            </p>
          </div>
        </Card>
      </Col>

      <Col span={8}>
        <Card bordered={false}>
          <AppstoreAddOutlined className="iconWarp" />
          <div className="content">
            <p className="title">Others</p>
            <p className="number">
              <CountUp start={0} end={100} duration={5} />
            </p>
          </div>
        </Card>
      </Col>
    </Row>

    <Row gutter={16} style={{ padding: '16px 0' }}>
      <Col span={16}>
        <Card title="Projects" bodyStyle={{ paddingTop: 0 }} bordered={false}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                actions={[<a href="/" key="list-loadmore-edit">edit</a>, <a href="/" key="list-loadmore-more">more</a>]}
              >
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Articles" bodyStyle={{ paddingTop: 0 }} bordered={false}>
          <List
            size="large"
            dataSource={data}
            renderItem={(item) => <List.Item>{item.title}</List.Item>}
          />
        </Card>
      </Col>
    </Row>
  </div>
);
export default withRouter(Dashboard);
