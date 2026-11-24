import React from 'react'
import umbrella from './assets/receipt/umbrella.png'
import stars from './assets/receipt/stars.png'
import leaves from './assets/receipt/leaves.png'
import bunny from './assets/receipt/bunny.png'

export default function ReceiptCollage({ side }) {
  if (side === 'left') {
    return (
      <div className="receipt-collage receipt-collage-left" aria-hidden="true">
        <img className="receipt-sketch sketch-stars" src={stars} alt="" />
        <div className="photo-strip">
          <div className="photo-window" />
          <div className="photo-window" />
          <div className="photo-window" />
        </div>
        <img className="receipt-sketch sketch-umbrella" src={umbrella} alt="" />
      </div>
    )
  }

  return (
    <div className="receipt-collage receipt-collage-right" aria-hidden="true">
      <img className="receipt-sketch sketch-leaves" src={leaves} alt="" />
      <div className="polaroid polaroid-back"><div className="photo-window" /></div>
      <div className="polaroid polaroid-front"><div className="photo-window" /></div>
      <img className="receipt-sketch sketch-bunny" src={bunny} alt="" />
    </div>
  )
}
