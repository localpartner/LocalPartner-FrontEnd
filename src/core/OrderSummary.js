import React, { useEffect,useState } from 'react'
import { useRecoilState, useRecoilValue } from "recoil";
import { shippingAddressState, billingAddressState, productListState, paymentMethodState } from "../recoil/atom/placeOrderState";
import { updatePriceState } from "../recoil/atom/updatedPrice";
import { list } from './apiCore';
import { createOrders,removeCartProducts } from "./apiCore";
import swal from 'sweetalert2'; 



const OrderSummary = () => {
    const [loadCart, setLoadCart] = useState(false);
    let total = 0
    let Item = []
    let index = 1
    let price;

    //  const updatePrices = useRecoilValue(updatePriceState)
    // console.log("updatePrices : ", updatePrices)
    const shippingAdd = useRecoilValue(shippingAddressState)
    console.log("address : ", shippingAdd)
    const billingAdd = useRecoilValue(billingAddressState)
    console.log("billingList : ", billingAdd);
    const productList = useRecoilValue(productListState)
    console.log("List : ", productList);
    const payments = useRecoilState(paymentMethodState)
    console.log("paymentDetails : ", payments);

    if (productList) {
        Item = productList.map((pred) => {

            if (pred.specials && pred.specials.length > 0) {
                let special = pred.specials[0];
                let today = new Date();
                let startDate = new Date(special.startDate);
                let endDate = new Date(special.endDate);
                if (today >= startDate && today < endDate) {
                    price = special.price;
                } else {
                    price = parseFloat(pred.unitPrice);
                }
            } else {
                price = parseFloat(pred.unitPrice);
            }

            console.log(price, "correctprice");
            total = parseInt(total) + parseInt(price * pred.units)
        }
        )
    }


    let billingAddress = {
        "addressLine1": billingAdd.address,
        "addressLine2": billingAdd.address,
        "city": billingAdd.city,
        "state": billingAdd.state,
        "pincode": billingAdd.pincode,
        "country": billingAdd.country
    };

    let shippingAddress = {
        "addressLine1": shippingAdd.address,
        "addressLine2": shippingAdd.address,
        "city": shippingAdd.city,
        "state": shippingAdd.state,
        "pincode": shippingAdd.pincode,
        "country": shippingAdd.country
    };

    let paymentDetails = {
        "paymentType": "cod",
        "paymentCardHolderName": payments[0].paymentCardHolderName,
        "paymentCardNumber": payments[0].paymentCardNumber,
        "paymentAmount": payments[0].paymentAmounts,
    }




    let products = []
    productList.forEach(element => {
        let code = element.productCode
        let units = element.units
        let unitPrice = element.unitPrice

        console.log(code, "code")
        products.push({
            code: code,
            quantity: units,
            unitPrice: unitPrice
        });
    });


    const clearCart = async (index) => {
        let productArray = [...products]
        productArray.splice(index)

        await removeCartProducts({ items: productArray });
        window.location.reload()
        //await 
    }
    

    const Ordersubmit = () => {
        let order = {
            shippingAddress,
            billingAddress,
            paymentDetails,
            products,
            "orderTotal": total,
        }
        createOrders(order).then(response => {
            console.log(response, "response.status")

              if (response == false) {
                alert(
                  "error"
                );
              } else {
                swal.fire(
                    'Thank You',
                    'For Your Order!',
                    'success'
                  )
                clearCart()          
              }
        })
       

    }
    console.table(products)

    useEffect(() => {

        setLoadCart(true)

    }, []);

    return (
        <div>
            <div class="card ">
                <div class="card-header shadow rounded-2" id="headingFour" style={{ backgroundColor: "#2874f0" }}>
                    <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left collapsed" type="button" style={{ color: "white", textDecoration: "none", }}>
                            <b> 4 ORDER SUMMARY</b>
                        </button>
                    </h2>
                </div>
                <div id="collapseFour" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                    <div class="card-body">
                        <div className='container'>
                            <div className='row'>
                                <div class="col-sm-3 col-md-6 col-lg-6" style={{ color: "black" }}>
                                    <h4>Shipping Address</h4>
                                    <b >Deliver to: {shippingAdd.fname} , {shippingAdd.mobile} <span style={{ background: "#f0f2f5", padding: "4px 8px" }}>{shippingAdd.nickname}</span></b>
                                    <p>{shippingAdd.address}, {shippingAdd.city}, {shippingAdd.state}, {shippingAdd.pincode}</p>
                                </div>
                                <div class="col-sm-3 col-md-6 col-lg-6" style={{ color: "black" }}>
                                    <h4>Billing Address</h4>
                                    <b >Deliver to: {billingAdd.fname} , {billingAdd.mobile} <span style={{ background: "#f0f2f5", padding: "4px 8px" }}>{billingAdd.nickname}</span></b>
                                    <p>{billingAdd.address}, {billingAdd.city},  {billingAdd.state}, {billingAdd.pincode} </p>
                                </div>


                                {/* <div class="col-sm-3 col-md-6 col-lg-6" style={{ color: "black", marginTop: "20px" }}>
                                    <h4>3 Payment Information</h4>
                                    <p><b>Payment Method</b> - {payments[0].paymentType}</p>
                                    <p><b>Card Holder Name</b> - {payments[0].paymentCardHolderName}</p>

                                </div> */}


                                <table class="col-sm-3 col-md-6 col-lg-12" style={{ color: "black", marginTop: "30px", padding: "8px", border: "1px solid #ddd" }}>

                                    <tr style={{ backgroundColor: "#8080804f", padding: "20px !important" }}>
                                        <th>S.no.</th>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                    {productList.map((item) => (
                                        <tr>
                                            <td style={{ padding: "8px", border: "2px solid #8080804a" }}>{index++}</td>
                                            <td style={{ padding: "8px", border: "2px solid #8080804a" }}>{item.name}</td>
                                            <td style={{ padding: "8px", border: "2px solid #8080804a" }}>{item.units}</td>
                                            <td style={{ padding: "8px", border: "2px solid #8080804a" }}>{item.unitPrice}</td>
                                            <td style={{ padding: "8px", border: "2px solid #8080804a" }}>{item.unitPrice * item.units}</td>
                                        </tr>
                                    ))
                                    }
                                    <tr >
                                        <th colSpan={3} style={{ border: "2px solid #8080804a" }}>&nbsp;</th>
                                        <th colSpan={1} style={{ border: "2px solid #8080804a" }}><h6><b>Sub Total</b> </h6></th>
                                        <th colSpan={1} style={{ border: "2px solid #8080804a" }}><h6>₹{total}</h6></th>
                                    </tr>

                                </table>
                            </div>
                        </div>
                        <div style={{ marginBottom: "60px", marginTop: "30px" }}>
                            <button type="button" class="btn btn-success float-right ml-4" onClick={Ordersubmit}>CheckOut</button>
                            <button type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree" class="btn btn-primary float-right">Previous</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default OrderSummary
