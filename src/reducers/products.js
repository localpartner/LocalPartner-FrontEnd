import * as ProductActions from "./../actions/productConfigActions";
const initalState = {
    activeTab: 1,
    previousTab: 0,
    switchTab: new Date().getMilliseconds(),
    editIndex: -1,
    saveProduct: false,
    cancelSaveProduct: false,
    newProduct: true,
    // discountDialogBox: false,
    cartData: [],
    products:  { status: false, cart: [] } ,
    workingProduct: { status: false, cart: [] } 
   
}
export const products = (state = initalState, action) => {
    switch (action.type) {
        case ProductActions.SET_ACTIVE_TAB: return setActiveTab(action, state);
        case ProductActions.SET_PREVIOUS_TAB: return setPreviousTab(action, state);
        case ProductActions.SET_EDIT_INDEX: return setEditIndex(action, state);
        case ProductActions.SET_NEW_FLAG: return setNewFlag(action, state);
        case ProductActions.SWITCH_TAB: return switchTab(action, state);

        case ProductActions.SET_WORKING_PRODUCT: return setWorkingProduct(action, state);
        case ProductActions.SET_PRODUCT: return setProduct(action, state);
        case ProductActions.SAVE_PRODUCT: return saveProduct(action, state);
        case ProductActions.CANCEL_SAVE_PRODUCT: return cancelSaveProduct(action, state);


       
        case ProductActions.ADD_ADDTOCART: return addToCart(action, state)
        case ProductActions.SET_ADDTOCART: return setCart(action, state);
        case ProductActions.SET_ADDTOCART_DATA: return setCartData(action, state)

       
        default:
            return state
    }
}
const setActiveTab = (action, state) => {
    return {
        ...state, activeTab: action.payload
    }
}

const setPreviousTab = (action, state) => {
    return {
        ...state, previousTab: action.payload
    }
}

const switchTab = (action, state) => {
    return {
        ...state, switchTab: action.payload
    }
}

const setEditIndex = (action, state) => {
    return {
        ...state, editIndex: action.payload
    }
}

const saveProduct = (action, state) => {
    return {
        ...state, saveProduct: action.payload
    }
}


const cancelSaveProduct = (action, state) => {
    return {
        ...state, cancelSaveProduct: action.payload
    }
}

const setWorkingProduct = (action, state) => {
    return {
        ...state, workingProduct: action.payload
    }
}

const setProduct = (action, state) => {
    return {
        ...state, product: action.payload
    }
}

const setNewFlag = (action, state) => {
    return {
        ...state, newProduct: action.payload
    }
}



// const setDiscountDialog = (action, state) => {
//     return {
//         ...state, discountDialogBox: action.payload
//     }
// }

const setCart = (action, state) => {
    let working = { ...state.workingProduct }
    working.cart = action.payload;
    return {
        ...state, workingProduct: working
    }

}


const addToCart = (action, state) => {
    let working = { ...state.workingProduct }
    if (!working.cart)
        working.cart = [];
    working.cart.push(action.payload)

    return {
        ...state, workingProduct: working
    }
}

const setCartData = (action, state) => {
    return {
        ...state, cartData: action.payload
    }

}

