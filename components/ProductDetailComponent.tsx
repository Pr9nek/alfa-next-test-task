"use client";

import React from "react";
import { useProductsStore } from "../store/useProductsStore";
import styles from "../styles/ProductDetail.module.css";

export default function ProductDisplay({ productId }: { productId: string }) {
const product = useProductsStore((s) => s.getById(productId));

if (!product) {
return <div>Product not found</div>;
}

return (
<div className={styles.content}>
    <img src={product.image} alt={product.title} />
    <div className={styles.info}>
    <h1>{product.title}</h1>
    <p className={styles.description}>{product.description}</p>
    {product.price && <p className={styles.price}>${product.price}</p>}
    </div>
</div>
);
}
