import React, { useEffect, useState } from 'react'
import Header from './Header'
import '../placeorder.css'
import { removeCartProducts } from "./apiCore";
import { getCartProducts, removeProducts } from "./apiCore";
import Sabtotal from './Sabtotal';
import CheckOutBox from './CheckOutBox';
import EmptyCart from './EmptyCart';
import { currentProductState } from './../recoil/atom/cartState'
import { productListState } from "../recoil/atom/placeOrderState";
import { useRecoilState } from "recoil";
import swal from 'sweetalert2'; 

// import Loading from './Loading';
// import { load } from 'dotenv';

const CartItem = (props) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [details, setDetails] = useState([])
    let total = 0
    let cartItem = []
    let options = []
    let optionPrice = []
    let prices = 0

    console.log(props, "props")
    console.log(props.products, "propssss")

    const handleDelete = (i) => {
        props.handleDelete(i)
    }


    const handleUpdate = (event, i) => {
        props.handleUpdate(event , i )
    } 

    const [value, setValue] = useState();
    if (props.products) {
        cartItem = props.products.map((pred, i) => {
            total = parseInt(total) + parseInt(pred.unitPrice)
            
           optionPrice =  pred.options.map((value, i) => {
           prices =  parseInt(value.price) + parseInt(pred.unitPrice)
            console.log(prices)
            })
            return (
                <>

                    <div className='item_containert'>
                        <img src={pred.image.content}></img>
                        <div className='item_details'>
                            <h3>{pred.name}</h3>
                            <h3 className='diffrentprice'>{pred.unitPrice}</h3>
                            {
                                pred.options.map((value, i) => {
                                    return (
                                        <>
                                            <p className='unusall' >{value.optionName} ({value.optionValue}) {value.price}</p>

                                        </>
                                    )
                                })
                            }
                            <div className="add_remove_select" >


                                <select value={pred.units}  onChange={(event) => handleUpdate(event, i)}>
                                    {/* <option value="">{pred.units = handleChange}</option> */}
                                    <option value="1" >1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                                <p style={{ cursor: "pointer" }} onClick={() => handleDelete(i)}>Delete</p>
                            </div>
                        </div>
                     
                        <h3 className='item_price'>{pred.unitPrice * pred.units} </h3>
                    </div>
                    {/* <div className="sub_item">
                <h3>Subtotal ({props.products.length} items):<strong style={{ fontWeight: "700", color: "#111" }}>{pred.unitPrice * pred.units}</strong></h3>
            </div> */}
                    <hr></hr>
                </>
            )
        })
    }
    return (
        <div>
            {cartItem}


            {/* <div>
         <CheckOutBox total={total} />
         </div> */}


        </div>
    )
}
const PlaceOrder = () => {
    const [products, setProducts] = useState([]);
    const [loadCart, setLoadCart] = useState(false);
    const [cartProducts, setCartProducts] = useRecoilState(productListState)
    const accessToken = JSON.parse(localStorage.getItem("jwt"))
    console.log(products, "products")
    console.log(loadCart, "loadCartabc")


    const handleDelete = async (index) => {
        swal.fire({
            title: 'Delete Product',
            text: "Do you really want to delete this Product?",
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then (async(result) => {
            if (result.isConfirmed) {
                // const handleDelete = async (index) => {
                await removeCartProducts({ items: productArray });
                setLoadCart(true)
                // }
            }
        })
        let productArray = [...products]
        productArray.splice(index, 1)

        // await removeCartProducts({ items: productArray });
        // setLoadCart(true)
        //await 
    }


    const handleUpdate = async (event, index) => {
        let productArray = [...products]
        //productArray.splice(index, 1)
            console.log(index,"indexnumber")
        productArray[index].units = event.target.value;

        await removeCartProducts({ items: productArray });
        setLoadCart(true)
        //await 
    }
  

    useEffect(() => {
        setLoadCart(true)
    }, []);
    useEffect(() => {

        if (loadCart == true) {
            const fetchCart = async () => {
                //alert(loadCart)
                let productDataResp = await getCartProducts(accessToken)
                console.log(productDataResp)
                if (productDataResp.status === 401) {
                    alert("Your Token has expired. Please login again")
                  }
                  if (productDataResp.status === false) {
                    return(
                        <>
                        <EmptyCart />
                        </>
                    )
                  }
                if (productDataResp && productDataResp.result) {
                    setProducts(productDataResp.result.items);
                    setCartProducts(productDataResp.result.items)
                    setLoadCart(false)
                }

            }
            fetchCart();

        }


    }, [loadCart]);




    return (
        <React.Fragment>

            <Header />
            {products.length ?
                <div className='buynow_section'>
                    <div className='buynow_container'>
                        <div className='row'>
                            <div class="col-sm-3 col-md-6 col-lg-6">
                                <div className='left_buy'>
                                    <h1>Shopping Cart</h1>
                                    <span className='leftbuyprice'>Price</span>
                                    <hr></hr>
                                    <CartItem handleDelete={handleDelete} handleUpdate={handleUpdate} products={products} />
                                </div>
                            </div>
                            <div class="col-sm-3 col-md-6 col-lg-6">
                                <div>
                                    <CheckOutBox products={products} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <EmptyCart />}
            <div>
            </div>

        </React.Fragment>
    )
}

export default PlaceOrder
