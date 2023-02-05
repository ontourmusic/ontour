import React, { useEffect, useState } from 'react'
import '../index.css'

function Footer() {
  return (
    <footer className="py-4">
      <div className="row">
        <div className="align-self-center">
          <img id="footer-logo" src="images/logo.png" alt="" />
          &copy; 2022 OnTour. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
