import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);
    // const totalPrice = cart.reduce((total, prod)=> total + prod.price,0)
    // console.log(totalPrice);

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price; 
    }

    let shipping = 0;

    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 5.99;
    }

    console.log(shipping);

    const tax = (total / 10).toFixed(2);

    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2)
        return Number(precision);
    }

    return (
        <div className="cart">           
            <h3>Order Summary</h3>
            <h4>Items Order: {cart.length}</h4>
            <p>Product Price: ${formatNumber(total)}</p>
            <p><small>Shipping Cost: ${shipping}</small></p>
            <p><small>Tax and VAT: ${tax}</small></p>
            <p style={{color:'red', fontWeight:'600'}}>Total Price: ${grandTotal}</p>
        </div>
    );
};

export default Cart;