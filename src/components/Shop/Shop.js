import React, { useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProduct] = useState([]);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://stormy-plateau-95863.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [])

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        console.log(productKeys);
        fetch('https://stormy-plateau-95863.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))





        // console.log(products, productKeys);
        // if (products.length > 0) {
        //     const previousCart = productKeys.map(existingKey => {
        //         const product = products.find(pd => pd.key === existingKey);
        //         product.quantity = saveCart[existingKey]
        //         return (product)
        //     })
        //     setCart(previousCart)
        // }
    }, [])



    const handleAddProduct = (product) => {
        const toBeAdded = product.key;
        // console.log('clicked', product);
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded)
            newCart = [...others, sameProduct]
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }





    // console.log(first10);
    return (
        <div className='twin-container'>
            <div className="product-container">
                {
                    products.map(pd => <Product
                        key={pd.key}
                        showAddToCard={true}
                        handleAddProduct={handleAddProduct}
                        product={pd}
                    >
                    </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review"> <button className='main-button'> Review Order</button></Link>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;