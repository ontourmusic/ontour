import React from 'react'
import PropTypes from 'prop-types'

export const ArtistBar= ({name}) => {
  return (
    <div>
        <h1>{name}</h1>
    </div>
  )
}

ArtistBar.defaultProps = {
  name: 'Artist Name',
}

ArtistBar.propTypes = {
  name: PropTypes.string.isRequired,
}
