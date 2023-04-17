const initalState = {
    Cart: []
}
export const cart = (state = initalState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const {
                // startDate,
               
            } = action.payload
            return {
                ...state,
                Cart: [
                    // ...state.Discount, {
                    //     startDate: startDate,
                    // }

                ]

            }
        default:
            return state
    }


}