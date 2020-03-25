import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { withRouter } from 'react-router';
import './dashboard.scss';

// const CountContext = createContext(null);

const Dashboard = () => (
  <div>
    <Row gutter={16}>
      <Col span={8}>
        <Card bordered={false}>
          {/* <NumberCard color="#64ea91" icon="read-o" num={5000} /> */}
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={false}>
          {/* <NumberCard
            color="#8fc9fb"
            icon="message-o"
            title="Tips count"
            num={2000}
          /> */}
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={false}>
          {/* <NumberCard
            color="#da9bec"
            icon="info-circle-o"
            title="Exposure count"
            num={2000}
          /> */}
        </Card>
      </Col>
    </Row>

    <Row gutter={16} style={{ padding: '16px 0' }}>
      <Col span={16}>
        <Card title="Data Analysis" bordered={false}>
          {/* <ReactEcharts
            option={this.option}
            style={{ height: '350px', width: '100%' }}
            className='react_for_echarts'
            theme='macarons'
          /> */}
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
    </Row>
  </div>
);
export default withRouter(Dashboard);
