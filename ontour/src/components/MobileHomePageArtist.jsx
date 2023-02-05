import React from 'react'
import '../index.css'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import { artistList } from '../ArtistInfo'

export default function MobileHomePageArtist(props) {
  return (
    <div className="row mb-4">
      <a href={'/artist?artist=' + props.artist}>
        <div className="card bg-dark">
          <img src={artistList[props.artist].imageURL} className="d-block w-100" alt="..." />
          <div className="card-body">
            <h5 className="card-title fw-bold">{artistList[props.artist].name}</h5>
            <Rating
              name="text-feedback"
              value={props.rating || 0}
              size="small"
              readOnly
              precision={0.1}
              emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
            />
          </div>
        </div>
      </a>
    </div>
  )
}
