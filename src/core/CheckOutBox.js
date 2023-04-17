import React, { useState } from 'react'
import '../placeorder.css'
import { useHistory } from 'react-router-dom'
import Address from './Address'

const CheckOutBox = (props) => {
    // const [proceed, setProceed] = useState(false);
    const [address, setShowAddress] = useState(true);
    function handleShow() {
        // setProceed(!proceed);
        setShowAddress(false)

    }

    const { push } = useHistory()
    let total = 0
    let cartItem = []
    console.log(props, "props")
    if (props.products) {
        cartItem = props.products.map((pred) => {
            total = parseInt(total) + parseInt(pred.unitPrice * pred.units)
        }
        )
    }
    return (
        <>
      
          
            {address == false ? (
                <div>
                    <Address />
                </div>
            ) : 
            <>
              {cartItem}
            <div className='right_buy'>
                <div className="cost_right">
                    <p>Your order is eligible for FREE Delivery. <br />
                        <span style={{ color: "#565959" }}> Select this option at checkout. Details</span></p>
                    <h3>Subtotal ({props.products.length} items): <span style={{ fontWeight: "700" }}> ₹{total}.00</span></h3>
                    <button className="rightbuy_btn"
                        //    onClick={() => push('/checkoutProduct')}
                        onClick={() => handleShow()} 
                        >Proceed to Buy</button>
                    <div className="emi" >
                        Emi Available
                    </div>
                </div>
            </div>
            </>
            }
        </>

    )

}
export default CheckOutBox
