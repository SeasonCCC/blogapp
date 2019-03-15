import { Card, Col, Row } from 'antd'
import * as React from 'react'
import styles from './dashboard.module.scss'

class Dashboard extends React.Component {
  public componentDidMount (): void {
    console.log(styles)
  }

  public render (): JSX.Element {
    return (
      <div>
        <Row gutter={16}>
          <Col className={'new'} span={6}>
            <Card
              className={styles['gutter-box']}
              style={{ padding: '0 16px' }}
              bordered={false}
            >
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
