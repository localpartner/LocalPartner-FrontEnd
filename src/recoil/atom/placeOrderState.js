import { atom } from 'recoil';

export const shippingAddressState = atom({
    key: 'shippingState', // unique ID (with respect to other atoms/selectors)
    default: {} // default value (aka initial value)
});  

export const billingAddressState = atom({
    key: 'billingState', // unique ID (with respect to other atoms/selectors)
    default: {} // default value (aka initial value)
}); 

export const paymentMethodState = atom({
    key: 'paymentState', // unique ID (with respect to other atoms/selectors)
    default: {} // default value (aka initial value)
}); 

export const productListState = atom({
    key: 'productsState', // unique ID (with respect to other atoms/selectors)
    default: []// default value (aka initial value)
}); 