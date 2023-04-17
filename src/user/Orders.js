import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../common/utils";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h1>
                    Total orders: {orders.length}
                </h1>
            );
        } else {
            return <h1 className="text-danger">No orders</h1>;
        }
    };

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className="form-control"
                readOnly
            />
        </div>
    );

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };

    const showStatus = o => (
        <div className="form-group">
            <h3 className="mb-4">{o.status}</h3>
            
        </div>
    );

    return (
        <div className="row">
            <div className="col-md-12">
                {orders.map((o, oIndex) => {
                    return (
                        <div
                            className="product-order row"
                            key={oIndex}
                            
                        >
                            <ul className="list-group col-md-12">
                                <li className="list-group-item">
                                    {showStatus(o)}
                                </li>
                                <li className="list-group-item">
                                    Transaction ID: {o.transaction_id}
                                </li>
                                <li className="list-group-item">
                                    Amount: <i className="fas fa-rupee-sign fa-sm"></i> {o.amount}
                                </li>
                                <li className="list-group-item">
                                    Ordered on:{" "}
                                    {moment(o.createdAt).fromNow()}
                                </li>
                                <li className="list-group-item">
                                    Delivery address:  {o.adrressData[0].address+' '+' '+o.adrressData[0].city+' '+', '+o.adrressData[0].country+' '+o.adrressData[0].state+' '+', '}<b>{o.adrressData[0].pincode}</b>
                                </li>
                            </ul>

                            {/* <h3 className="mt-4 mb-4 font-italic">
                                Total products in the order:{" "}
                                {o.products.length}
                            </h3> */}
                            <div className="order-product-list col-md-12">
                                {o.productData.map((p) => (
                                    <div className="product_details col-12 float_left">
                                        <div className="img_product">
                                            <img className="img-fluid" src={p.images[Object.keys(p.images)[0]][0]} alt="img"/>
                                        </div>
                                        <div className="product_content">
                                            <h3>{p.name}</h3>
                                            <div className="rate">
                                                <p><span>Items: </span>{p.quantity}</p>
                                                <h3><i className="fas fa-rupee-sign fa-sm"></i>{p.price}</h3>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Orders;
