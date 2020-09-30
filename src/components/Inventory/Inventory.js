import React from 'react';
// import fakeData from '../../fakeData';

const Inventory = () => {

    const handleAddProduct = () => {
        const product = {}
        fetch('https://stormy-plateau-95863.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
    }
    return (
        <div>
            <form action="">
                <p><span>Name: <input type="text" /></span></p>
                <p><span>Price: <input type="text" /></span></p>
                <p><span>Quantity: <input type="text" /></span></p>
                <p><span>Product Image: <input type="file" /></span></p>
                <button onClick={handleAddProduct}>Add Product</button>
            </form>

        </div>
    );
};

export default Inventory;