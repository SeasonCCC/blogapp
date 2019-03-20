import { Card, Icon } from 'antd'
// import PropTypes from 'prop-types'
import React from 'react'
import CountUp from 'react-countup'
import styles from './numberCard.module.scss'

interface NumberCardProps {
  color: string;
  icon: string;
  title?: string;
}

const NumberCard = ({ color, icon, title }: NumberCardProps): JSX.Element => (
  <Card
    className={styles.numberCard}
    bordered={false}
    bodyStyle={{ padding: 10 }}
  >
    <Icon className={styles.iconWarp} style={{ color }} type={icon} />
    <div className={styles.content}>
      <p className={styles.title}>{title || 'News Count'}</p>
      <p className={styles.number}>
        <CountUp start={0} end={5000} duration={5} separator=',' />
      </p>
    </div>
  </Card>
)

export default NumberCard
