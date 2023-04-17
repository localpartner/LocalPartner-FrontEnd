import React, { memo } from "react";
import { Link, Redirect, useHistory  } from "react-router-dom";

const YourOrder = (props) => {
  let history = useHistory();
  if(props.total == '0') {
    history.push("/");
  }

  return (
    <div className="col-lg-4 col-md-12 col-12">
      <div className="your_order float_left bg-white">
        <h3>Your Order</h3>
        <div className="order_details">
          <p>
            Total Price
            <span>
              <i className="fas fa-rupee-sign fa-sm"></i>
              {props.total}
            </span>
          </p>
          <p>
            Discount Price
            <span>
              <i className="fas fa-rupee-sign fa-sm"></i>0
            </span>
          </p>
          <p>
            Shipping
            <span>
              <i className="fas fa-rupee-sign fa-sm"></i>0
            </span>
          </p>
        </div>
        <div className="order_rate float_left">
          <h3>
            Order Total
            <span>
              <i className="fas fa-rupee-sign"></i>
              {props.total}
            </span>
          </h3>
        </div>
        {/* <Link className="placeholder_btn" to="#" onClick={props.placeOrder}>  Place Order2</Link> */}
            
        {props.placeOrder!='' ?  null :
            <Link className="placeholder_btn" to={props.location} >
             Place Order
            </Link>
         }
      </div>
    </div>
  );
};

export default memo(YourOrder);
