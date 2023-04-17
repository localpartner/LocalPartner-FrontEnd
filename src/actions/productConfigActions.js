

export const SET_ADDTOCART_DAILOG = "SET_ADDTOCART_DAILOG";
export const ADD_ADDTOCART = "ADD_ADDTOCART";
export const SET_ADDTOCART = "SET_ADDTOCART";
export const SET_ADDTOCART_DATA = "SET_ADDTOCART_DATA";

// export const showDiscountDailogBox = () => (
//     {
//         type: SET_ADDTOCART_DAILOG,
//         payload: true

//     }
// )

// export const hideDiscountDailogBox = () => (
//     {
//         type: SET_ADDTOCART_DAILOG,
//         payload: false

//     }
// )
export const addToCart = (data) => (
    {
        type: SET_ADDTOCART,
        payload: data

    }
)

export const setCart = (data) => (
    {
        type: SET_ADDTOCART,
        payload: data

    }
)

export const setCartData = (data) => (
    {
        type: SET_ADDTOCART_DATA,
        payload: data

    }
)

