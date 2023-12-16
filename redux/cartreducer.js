const initialvalue = {
cartProducts: []
}

export default (state = initialvalue, action) => {
    switch(action.type){
        case 'Addtocart':
            const indexadd = state.cartProducts.findIndex(({ id }) => id == action.payload.id);
            if(indexadd<0){
        return {
            ...state,
            cartProducts: [...state.cartProducts,action.payload]
        }
    }else{
        return {
            ...state,
            cartProducts: [...state.cartProducts]
        }
    }
        case 'Removefromcart':
            const indexn = state.cartProducts.findIndex(({ id }) => id == action.payload.id);
            if(!(indexn<0)){state.cartProducts.splice(indexn,1);}
            return{
                ...state,
                cartProducts: [...state.cartProducts]
            }
            case 'Change-quantity':
                const newQuantity = action.payload.nquantity;
                const nIndex = state.cartProducts.findIndex(({ id }) => id == action.payload.id);
                state.cartProducts[nIndex].quantity=newQuantity;
                return{
                    ...state,
                    cartProducts: [...state.cartProducts]
                }
            default:
                return state;
    }
}