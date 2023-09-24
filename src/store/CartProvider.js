import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

        let updatedItem;
        
        if (existingCartItemIndex !== -1) {
            const existingCartItem = state.items[existingCartItemIndex];
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    return state; // Return the unchanged state for other actions
};

const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD', item: item});
    };

    // You can add REMOVE logic here similar to ADD

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        // Add removeItem function here
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
