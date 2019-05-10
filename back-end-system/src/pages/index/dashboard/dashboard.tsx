import { Card, Col, Row } from 'antd'
import * as React from 'react'
import './dashboard.module.scss'
import NumberCard from './components/numberCard'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'

class Dashboard extends React.Component {
  public componentDidMount (): void {
    this.initPie()
  }

  public initPie (): void {
    setTimeout(() => {
      const option: any = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901],
            type: 'line',
            areaStyle: {}
          }
        ]
      }

      const chartElement: any = document.getElementById('charts')
      let myChart = echarts.init(chartElement)
      myChart.setOption(option)
    }, 1000)
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
              <div
                id='charts'
                ref='charts'
                style={{
                  width: '100%',
                  height: '300px'
                }}
              />
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
