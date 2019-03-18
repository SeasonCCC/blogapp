import { Card, Icon } from 'antd'
// import PropTypes from 'prop-types'
import React from 'react'
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
      <p className={styles.title}>{title || 'No Title'}</p>
      <p className={styles.number}>
      1231321
        {/* <CountUp
          start={0}
          end={number}
          duration={2.75}
          useEasing={true}
          useGrouping={true}
          separator=','
          {...countUp || {}}
        /> */}
      </p>
    </div>
  </Card>
)

export default NumberCard
