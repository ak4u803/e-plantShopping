import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      // Extract numeric value from cost string (e.g., "$15" -> 15)
      const cost = parseFloat(item.cost.replace('$', ''));
      return total + (cost * item.quantity);
    }, 0).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      amount: item.quantity + 1
    }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // If quantity is greater than 1, decrease by 1
      dispatch(updateQuantity({
        name: item.name,
        amount: item.quantity - 1
      }));
    } else {
      // If quantity would become 0, remove the item
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    // Extract numeric value from cost string (e.g., "$15" -> 15)
    const cost = parseFloat(item.cost.replace('$', ''));
    return (cost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div className="cart-item" key={item.name}>
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cost">Price: {item.cost}</div>
                  <div className="cart-item-quantity">
                    <button 
                      className="cart-item-button cart-item-button-dec" 
                      onClick={() => handleDecrement(item)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button 
                      className="cart-item-button cart-item-button-inc" 
                      onClick={() => handleIncrement(item)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
                  <button 
                    className="cart-item-delete" 
                    onClick={() => handleRemove(item)}
                    aria-label="Remove item"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total Amount: ${calculateTotalAmount()}</h3>
          </div>
          <div className="cart-actions">
            <button 
              className="get-started-button" 
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
            <button 
              className="get-started-button1" 
              onClick={handleCheckoutShopping}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;


