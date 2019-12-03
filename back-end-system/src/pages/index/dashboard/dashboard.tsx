import { Card, Col, Row } from 'antd'
import * as React from 'react'
import './dashboard.module.scss'
import NumberCard from './components/numberCard'
// import ReactEcharts from 'echarts-for-react'
// import echarts from 'echarts/lib/echarts'
// import 'echarts/lib/chart/line'

class Dashboard extends React.Component {
  private readonly option: object = {
    title: {
      text: '堆叠区域图'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['邮件营销', '联盟广告', '视频广告']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '邮件营销',
        type: 'line',
        stack: '总量',
        areaStyle: { normal: {} },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '联盟广告',
        type: 'line',
        stack: '总量',
        areaStyle: { normal: {} },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '视频广告',
        type: 'line',
        stack: '总量',
        areaStyle: { normal: {} },
        data: [150, 232, 201, 154, 190, 330, 410]
      }
    ]
  }

  public render (): JSX.Element {
    return (
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Card bordered={false}>
              <NumberCard color='#64ea91' icon='read-o' num={5000} />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <NumberCard
                color='#8fc9fb'
                icon='message-o'
                title='Tips count'
                num={2000}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <NumberCard
                color='#da9bec'
                icon='info-circle-o'
                title='Exposure count'
                num={2000}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ padding: '16px 0' }}>
          <Col span={16}>
            <Card title='Data Analysis' bordered={false}>
              {/* <ReactEcharts
                option={this.option}
                style={{ height: '350px', width: '100%' }}
                className='react_for_echarts'
                theme='macarons'
              /> */}
            </Card>
          </Col>
          <Col span={8}>
            <Card title='Card title' bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Dashboard
