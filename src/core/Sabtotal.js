import React from 'react'
import '../placeorder.css'


const Sabtotal = () => {
  return (
    <div className='right_buy'>
    <div className='sub_item'>
        <h3>subtotal (1 item): <strong style={{fontWeight:700,color:"#111"}}> ₹4049.00</strong></h3>

        <br>
        </br>
      <div className='cost_right'>
        <p>Your order is eligible for FREE Delivery.</p><br />
        <span style={{color:"#565959"}}>select this option at checkout. Details
        </span>
        {/* <div className='sub_item'> */}
        <h3>Subtotal (1 items):  <strong style={{ fontWeight: 700,color:'#111'}}>₹ 4049.00</strong></h3>
        <button className='rightbuy_btn'>Process to Buy</button>
        {/* </div> */}

      </div>
    </div>
    </div>
  )
}

export default Sabtotal
