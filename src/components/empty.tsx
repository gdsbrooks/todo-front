import { Typography } from 'antd'
import React from 'react'

type Props = {}

export const Empty = (props: Props) => {
  return (
    <div style={{border: 'solid pink 5px'}}>
        <h3>You have no more Tasks to complete!</h3>
        <h5>You're either very effecient or youre awful at making lists. ;-P</h5>
    </div>
  )
}