import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {CartItem} from "../../../interfaces"

type CartState = {
    workshopItems:CartItem[]
}

const initialState:CartState = {workshopItems:[]}

export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<CartItem>)=>{
            // same workshop can be added only once
            const exists = state.workshopItems.some(obj=>obj.workshopId===action.payload.workshopId)
            if(!exists) state.workshopItems.push(action.payload)
        },
        removeFromCart:(state,action:PayloadAction<string>)=>{
            state.workshopItems = state.workshopItems.filter(obj=>obj.workshopId!==action.payload)
        },
        clearCart:(state)=>{
            state.workshopItems = []
        }
    }
})

export const {addToCart,removeFromCart,clearCart} = cartSlice.actions;
export default cartSlice.reducer;
