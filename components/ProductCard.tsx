'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Product, useProductsStore } from '../store/useProductsStore';
import styles from '../styles/ProductCard.module.css';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const toggleLike = useProductsStore(s => s.toggleLike);
  const removeProduct = useProductsStore(s => s.removeProduct);
  const isLiked = useProductsStore(s => !!s.likes[String(product.id)]);

  const handleCardClick = (e: React.MouseEvent) => {
    // если клик по кнопке — не навигируем
    if ((e.target as HTMLElement).closest('button')) return;
    router.push(`/products/${product.id}`);
  };

  return (
    <article className={styles.card} onClick={handleCardClick}>
      <div className={styles.media}>
        {product.image ? (
          <img src={product.image} alt={product.title} />
        ) : (
          <div className={styles.placeholder}>No image</div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.description}>{product.description}</p>
      </div>

      <div className={styles.actions}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(product.id);
          }}
          className={`${styles.iconButton} ${isLiked ? styles.liked : ''}`}
          aria-label="like"
        >
          ♥
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/products/${product.id}/edit`);
          }}
          className={styles.iconButton}
          aria-label="edit"
        >
          ✎
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            removeProduct(product.id);
          }}
          className={styles.iconButton}
          aria-label="delete"
        >
          🗑
        </button>
      </div>
    </article>
  );
}
