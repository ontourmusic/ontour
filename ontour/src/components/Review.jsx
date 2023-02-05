import React, { useEffect, useState } from 'react'
import '../index.css'
import { RiStarFill } from 'react-icons/ri'
import { AiOutlineUser } from 'react-icons/ai'

export default function Review(props) {
  const [isActive, setIsActive] = useState(true)
  // console.log(decodeURIComponent(props.text));

  const handleHelpful = (event) => {
    event.currentTarget.classList.toggle('fw-bold')
    event.currentTarget.classList.toggle('btn-outline-light')
    setIsActive((current) => !current)
  }

  return (
    <div className="list-group-item flex-column align-items-start">
      <div className="d-flex bd-highlight">
        <div className="p-1 bd-highlight">
          <AiOutlineUser size={23} />{' '}
        </div>
        <div className="p-1 bd-highlight">
          <h6 className="review-user">{props.user}</h6>
        </div>
        <br></br>
      </div>
      <div>
        <div className="d-flex bd-highlight mb-2">
          {[...Array(props.rating)].map((star) => (
            <RiStarFill className="star" color={'#faaf00'} size={20} />
          ))}
          {[...Array(5 - props.rating)].map((star) => (
            <RiStarFill className="star" color={'#bdbdbd'} size={20} />
          ))}
        </div>
        <div align="left" className="d-flex bd-highlight mb-2">
          <small>
            {props.date} • {props.venue}
          </small>
        </div>
      </div>
      <div className="d-flex w-100 justify-content-start">
        <p id="rating-text" style={{ whiteSpace: 'pre-wrap' }} className="mb-2" align="left">
          {props.text}
        </p>
      </div>
      <div className="d-flex w-100 justify-content-start pb-1">
        <button
          onClick={handleHelpful}
          style={{ backgroundColor: isActive ? '' : '#e7e8e8' }}
          id="helpful-button"
          type="button"
          className="btn btn-outline-light align-self-center"
        >
          <div className="row">
            <div className="col-1">
              <img
                id="helpful-icon"
                src={isActive ? '../../images/helpful.png' : '../../images/helpful_selected.png'}
                alt=""
              />
            </div>
            <div id="helpful" className="col-1">
              Helpful
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
