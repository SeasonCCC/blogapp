import { Card, Icon } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import './numberCard.scss'

interface NumberCardProps {
  color: string;
  countUp: object;
  icon: string;
  title: string;
  num: number;
}

const NumberCard = ({ countUp, color, icon, num, title }: NumberCardProps) => (
  <div>
    123
  </div>
  // <Card
  //   className={styles.numberCard}
  //   bordered={false}
  //   bodyStyle={{ padding: 10 }}
  // >
  //   <Icon className={styles.iconWarp} style={{ color }} type={icon} />
  //   <div className={styles.content}>
  //     <p className={styles.title}>{title || 'No Title'}</p>
  //     <p className={styles.number}>
  //       {/* <CountUp
  //         start={0}
  //         end={number}
  //         duration={2.75}
  //         useEasing={true}
  //         useGrouping={true}
  //         separator=','
  //         {...countUp || {}}
  //       /> */}
  //     </p>
  //   </div>
  // </Card>
)

export default NumberCard
