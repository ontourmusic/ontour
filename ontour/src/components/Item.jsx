import React, { useEffect, useState } from 'react'
import '../index.css'

export default function Item(props) {
  return (
    <div>
      <div className="card">
        <img src={props.image} className="d-block w-100" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.text}</h5>
        </div>
      </div>
    </div>
  )
}
