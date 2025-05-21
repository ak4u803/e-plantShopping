import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.name === newItem.name);
      
      if (existingItem) {
        // If item exists, increase quantity
        existingItem.quantity += 1;
      } else {
        // If item doesn't exist, add it to the cart with initial quantity of 1
        state.items.push({
          ...newItem,
          quantity: 1
        });
      }
    },
    removeItem: (state, action) => {
      // Remove item from cart based on name
      const itemName = action.payload;
      state.items = state.items.filter(item => item.name !== itemName);
    },
    updateQuantity: (state, action) => {
      // Extract name and amount from payload
      const { name, amount } = action.payload;
      
      // Find the item in the cart
      const item = state.items.find(item => item.name === name);
      
      if (item) {
        // Update the quantity if item exists
        item.quantity = amount;
        
        // Remove item if quantity is 0 or less
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item.name !== name);
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
