import React from 'react'
import { Alert } from 'react-bootstrap'

const Alerts = ({message}) => {
  return (
    <Alert dismissible>{message}</Alert>
  )
}

export default Alerts
