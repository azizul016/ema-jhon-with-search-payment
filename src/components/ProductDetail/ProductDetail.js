import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const { productKey } = useParams();
    // const product = fakeData.find(pd => pd.key === productKey);
    const [product, setProduct] = useState({})
    useEffect(() => {
        fetch('https://stormy-plateau-95863.herokuapp.com/product/' + productKey)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [productKey])
    //  console.log(product);
    return (
        <div>
            <Product showAddToCard={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;