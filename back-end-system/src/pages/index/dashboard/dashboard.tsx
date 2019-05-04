import { Card, Col, Row } from 'antd'
import * as React from 'react'
import styles from './dashboard.module.scss'
import NumberCard from './components/numberCard'
import * as d3 from 'd3'

class Dashboard extends React.Component {
  public componentDidMount (): void {
    console.log(styles)
  }

  public render (): JSX.Element {
    return (
      <div>
        <Row gutter={16}>
          <Col span={6}>
            <Card bordered={false}>
              <NumberCard color='#8fc9fb' icon='pay-circle-o' />
            </Card>
          </Col>
          <Col span={6}>
            <Card title='Card title' bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={6}>
            <Card title='Card title' bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={6}>
            <Card title='Card title' bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ padding: '16px 0' }}>
          <Col span={16}>
            <Card title='Card title' bordered={false}>
              Card content
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
