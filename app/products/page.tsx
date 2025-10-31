'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useProductsStore } from '../../store/useProductsStore';
import { ProductCard } from '../../components/ProductCard';
import styles from '../../styles/TestProducts.module.css';

export default function ProductsPage() {
  const [showFavorites, setShowFavorites] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const products = useProductsStore(state => state.products);
  const likes = useProductsStore(state => state.likes);
  const fetchProducts = useProductsStore(state => state.fetchAndSetProducts);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  // фильтрация по избранным
  const filtered = showFavorites ? products.filter(p => !!likes[String(p.id)]) : products;

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  // корректируем страницу, если она вышла за диапазон после фильтрации
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const start = (page - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Products</h1>
        <div className={styles.actions}>
          <Link href="/create-product" className={styles.createButton}>
            Create Product
          </Link>
          <div className={styles.filters}>
            <button
              onClick={() => { setShowFavorites(false); setPage(1); }}
              className={!showFavorites ? styles.active : ''}
            >
              All
            </button>
            <button
              onClick={() => { setShowFavorites(true); setPage(1); }}
              className={showFavorites ? styles.active : ''}
            >
              Favorites
            </button>
          </div>
        </div>
      </header>

      <div className={styles.grid}>
        {visible.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <footer className={styles.pager}>
        <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
          Prev
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
          Next
        </button>
      </footer>
    </div>
  );
}
