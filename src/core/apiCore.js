import { API } from "../config";
import queryString from "query-string";
import axios from "axios";
export const getProducts = sortBy => {
    return fetch(`${API}/fe/product/list`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getFeaturedProducts = async() =>{
    try{
        const response = await axios.get(`${API}/fe/product/list`)
        console.log("response",response)
        return response;
    } catch (error){
        console.log("error",error)
    }
}


export const getSpecialProducts = async() =>{
    try{
        const response = await axios.get(`${API}/fe/product/list`)
        console.log("response",response)
        return response;
    } catch (error){
        console.log("error",error)
    }
}

export const getProductsBySerachCrteria = (category,name) => {

    let url = "";
    if(category && name){
        url = `${API}/fe/product/list?category=${category}&name=${name}`
    }else if(!category && name){
        url = `${API}/fe/product/list?name=${name}`
    }else if(category && !name){
        url = `${API}/fe/product/list?category=${category}`

    }
    else{
        url = `${API}/fe/product/list`
    }
    return fetch(url, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getProductByCode = async (code) => {
    try {
        const response = await axios.get(`${API}/fe/product/${code}`)
        console.log("response", response)
        return response;
    } catch (error) {
        console.log("error", error)
    }
};


export const getlimitedproduct = async() =>{
    try{
        const response = await axios.get(`${API}/qikpro/list?page=1&limit=2`)
        console.log("response",response)
        return response;
    } catch (error){
        console.log("error",error)
    }
}
export const getproductcode = async(code) => {
    try {
        const response = await axios.get(`${API}/product/${code}`)
        console.log("response", response)
        return response;
    } catch (error) {
        console.log("error", error)
    }
}
export const getproductsByCode = async (code) => {
    try {
        const response = await axios.get(`${API}/product/${code}`)
        console.log("response", response)
        return response;
    } catch (error) {
        console.log("error", error)
    }
}
export const getcustomeraddress = async () => {
    let obj = JSON.parse(localStorage.getItem('jwt'))
    const accessToken = obj.accessToken;
    try {
        const response = await axios.get(`${API}/cust/list`,{
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
        })
        console.log("response", response)
        return response;
    } catch (error) {
        console.log("error", error)
    }
}
export const getAddressMobile = async () => {
    let obj = JSON.parse(localStorage.getItem('jwt'))
    const accessToken = obj.accessToken;
    let findnumber = JSON.parse(localStorage.getItem('jwt'))
    const mobile = findnumber.user && findnumber.user.mobile;
//    let mobile1 = (localStorage.getItem('mobileNumber'))
//    console.log("mobile1", mobile1)
    try {
        const response = await axios.get(`${API}/customeraddress/read/mobile/${mobile}`,{
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
        })
        console.log("response", response)
        return response;
    } catch (error) {
        console.log("error", error)
    }
}

// update address by id.......................................//

export const updateAddressById = async (mobile,category) => {
    const payload=JSON.stringify(category);
    let obj = JSON.parse(localStorage.getItem('jwt'))
    const accessToken = obj.accessToken;
    let addressid = localStorage.getItem('id')
    
  
    try {
        const response = await axios.post(`${API}/customeraddress/update/${addressid}`,payload, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
        })
        console.log("response", response)
        return response;
    } catch (error) {
        console.log("error", error)
    }
}



export const postcustomeraddress = async (code) => {
    const payload = JSON.stringify(code);
    let obj = JSON.parse(localStorage.getItem('jwt'))
    const accessToken = obj.accessToken;
    console.log("objjj",obj)
    console.log(code,"postcustomeraddress")
    let findnumber = JSON.parse(localStorage.getItem('jwt'))
    const mobile = findnumber.user && findnumber.user.mobile;
    try {
        const response = await axios.post(`${API}/customeraddress/add/${mobile}`,payload, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
        })
        console.log("response", response)
        return response;
    } catch (error) {
        console.log("error", error)
    }
}

export const deleteAddress = async (mobile) => {
    
    let obj = JSON.parse(localStorage.getItem('jwt'))
    const accessToken = obj.accessToken;
    console.log("objjj",obj)
    try {
        const response = await axios.delete(`${API}/cust/${mobile}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
        })
        console.log("response", response)
        return response;
    } catch (error) {
        console.log("error", error)
    }
}
export const updateAddress = async (mobile,category) => {
    const payload=JSON.stringify(category);
    let obj = JSON.parse(localStorage.getItem('jwt'))
    const accessToken = obj.accessToken;
  
    try {
        const response = await axios.put(`${API}/cust/${mobile}`,payload, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
        })
        console.log("response", response)
        return response;
    } catch (error) {
        console.log("error", error)
    }
}

export const getTopCategories = categoryId => {
    return fetch(`${API}/category/list`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getCategories = () => {
    return fetch(`${API}/category/list`, {
        method: "GET"
    })
        .then(response => {
            //console.log("response", response.json())
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    };
    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const list = params => {
    const query = queryString.stringify(params);
    return fetch(`${API}/products/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// export const read = productId => {
//     return fetch(`${API}/product/${productId}`, {
//         method: "GET"
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };

export const listRelated = productId => {
    return fetch(`${API}/products/related/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createOrder = (customerId, token, createOrderData) => {
    return fetch(`${API}/order/create/${customerId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: createOrderData })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const addProdcutToWishlist = (userId, token, wishlistData) => {
    return fetch(`${API}/wishlist/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ wishlist: wishlistData })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const addrating_api = (userId, token, wishlistData) => {
    return fetch(`${API}/ratinglist/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ wishlist: wishlistData })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const sliderList = () => {
    return fetch(`${API}/sliderList`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization:`Bearer ${token}`
        },
    }).then(responce => {
        return responce.json();
    }).catch(err =>
        console.log(err)
    )
}

export const advertiseListAPI = () => {
    return fetch(`${API}/advertiseList`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization:`Bearer ${token}`
        },
    }).then(responce => {
        return responce.json();
    }).catch(err =>
        console.log(err)
    )
}

export const partnerImgListAPI = () => {
    return fetch(`${API}/partnerImgList`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization:`Bearer ${token}`
        },
    }).then(responce => {
        return responce.json();
    }).catch(err =>
        console.log(err)
    )
}

export const createCart = (data, token) => {
    return fetch(`${API}/cart/create`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ data: data })
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err));
};

export const getCartList = (userId) => {
    return fetch(`${API}/cart/list/${userId}`, {
        method: "GET",
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err));
};

export const removeCartItemById = (userId, id) => {
    return fetch(`${API}/cart/delete/${userId}/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err));
};

export const searchingData = (category, name) => {
    return fetch(`${API}/fe/product/list?category=${category}&name=${name}`, {
        method: 'GET',
       
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err));
};
//working on........
export const removeCartItems = (userId) => {

    console.log("userId=============0", userId)
    return fetch(`${API}/cart/delete/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        //Authorization:`Bearer ${token}`
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err));
};

//  Add To Cart API ........................//

export const addtocart = (item,token) => {
    let obj = JSON.parse(localStorage.getItem('jwt'))
    const accessToken = obj.accessToken;
    let findnumber = JSON.parse(localStorage.getItem('jwt'))
    const mobile = findnumber.user && findnumber.user.mobile;
    const data = (item)
    return fetch(`${API}/customer/${mobile}/cart/item`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(data )
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err));
};



// Get Api ................cart........................//

export const getCartProducts = () => {
    let obj = JSON.parse(localStorage.getItem('jwt'))
    const accessToken = obj.accessToken;
    let findnumber = JSON.parse(localStorage.getItem('jwt'))
    const mobile = findnumber.user && findnumber.user.mobile;
    return fetch(`${API}/customer/${mobile}/cart`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        },
    }).then(responce => {
        return responce.json();
    }).catch(err =>
        console.log(err)
    )
}

// Put Api ................cart........................//

export const removeCartProducts = async (item) => {
    const payload=JSON.stringify(item);
    let obj = JSON.parse(localStorage.getItem('jwt'))
    const accessToken = obj.accessToken;
    let findnumber = JSON.parse(localStorage.getItem('jwt'))
    const mobile = findnumber.user && findnumber.user.mobile;
  
    try {
        const response = await axios.put(`${API}/customer/${mobile}/cart`,payload, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
        })
        console.log("response", response)
        return response;
    } catch (error) {
        console.log("error", error)
    }
}

export const updateCartProducts = async (item) => {
    const payload=JSON.stringify(item);
    let obj = JSON.parse(localStorage.getItem('jwt'))
    const accessToken = obj.accessToken;
    let findnumber = JSON.parse(localStorage.getItem('jwt'))
    const mobile = findnumber.user && findnumber.user.mobile;
  
    try {
        const response = await axios.put(`${API}/customer/${mobile}/cart`,payload, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
        })
        console.log("response", response)
        return response;
    } catch (error) {
        console.log("error", error)
    }
}

// Address Api ...............................//
export const createCustomer = (item,token) => {
    let obj = JSON.parse(localStorage.getItem('jwt'))
    const accessToken = obj.accessToken;
    let findnumber = JSON.parse(localStorage.getItem('jwt'))
    const mobile = findnumber.user && findnumber.user.mobile;
    const data = (item)
    return fetch(`${API}/cust`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(data )
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err));
};


//  Order MAnagement .......................................///

export const createOrders = (item,token) => {
    let obj = JSON.parse(localStorage.getItem('jwt'))
    const accessToken = obj.accessToken;
    let findnumber = JSON.parse(localStorage.getItem('jwt'))
    const mobile = findnumber.user && findnumber.user.mobile;
    const data = (item)
    return fetch(`${API}/ordermgmt/${mobile}/order`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(data )
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err));
};


export const getOrderDetails = () => {
    let obj = JSON.parse(localStorage.getItem('jwt'))
    const accessToken = obj.accessToken;

    let findnumber = JSON.parse(localStorage.getItem('jwt'))
    const mobile = findnumber.user && findnumber.user.mobile;
   
    return fetch(`${API}/ordermgmt/${mobile}/order/list`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
             Authorization: `Bearer ${ accessToken }`
        }
    })
        .then(response => {
            console.log(response.status,"status")
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getOrderByOrderId = (oredrId) => {
    let obj = JSON.parse(localStorage.getItem('jwt'))
    const accessToken = obj.accessToken;

    let findnumber = JSON.parse(localStorage.getItem('jwt'))
    const mobile = findnumber.user && findnumber.user.mobile;
   
    return fetch(`${API}/ordermgmt/${mobile}/order/${oredrId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
             Authorization: `Bearer ${ accessToken }`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const deleteOrder = (orderId) => {
    let obj = JSON.parse(localStorage.getItem('jwt'))
    const accessToken = obj.accessToken;

    let findnumber = JSON.parse(localStorage.getItem('jwt'))
    const mobile = findnumber.user && findnumber.user.mobile;
   
    return fetch(`${API}/ordermgmt/${mobile}/order/${orderId}/`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
             Authorization: `Bearer ${ accessToken }`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getSpecialProducts1 = async() =>{
    try{
        const response = await axios.get(`${API}/fe/product/special/list`)
        console.log("response",response)
        return response;
    } catch (error){
        console.log("error",error)
    }
}

export const getFeaturedProduct = async() =>{
    try{
        const response = await axios.get(`${API}/fe/product/featured/list`)
        console.log("response",response)
        return response;
    } catch (error){
        console.log("error",error)
    }
}

