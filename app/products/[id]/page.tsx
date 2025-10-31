'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useProductsStore } from '../../../store/useProductsStore';
import styles from '../../../styles/ProductDetail.module.css';

export default function ProductDetail() {
  const { id } = useParams();
  const product = useProductsStore(s => s.getById(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className={styles.page}>
      <Link href="/products" className={styles.back}>
        ← Back to products
      </Link>
      
      <div className={styles.content}>
        <img src={product.image} alt={product.title} />
        <div className={styles.info}>
          <h1>{product.title}</h1>
          <p className={styles.description}>{product.description}</p>
          {product.price && <p className={styles.price}>${product.price}</p>}
        </div>
      </div>
    </div>
  );
}
