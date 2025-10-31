'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useProductsStore } from '../store/useProductsStore';
import styles from '../styles/TestProducts.module.css';

export function ProductListContainer() {
  const [isClient, setIsClient] = useState(false);
  
  // Один селектор для данных
  const {
    products,
    visible,
    page,
    total,
    searchQuery,
    filter,
  } = useProductsStore(state => ({
    products: state.products,
    visible: state.getVisibleProducts(),
    page: state.page,
    total: state.getTotalPages(),
    searchQuery: state.searchQuery,
    filter: state.filter,
  }));

  // Один селектор для действий
  const actions = useProductsStore(state => ({
    fetchAndSetProducts: state.fetchAndSetProducts,
    setSearchQuery: state.setSearchQuery,
    setFilter: state.setFilter,
    setPage: state.setPage,
    toggleLike: state.toggleLike,
    removeProduct: state.removeProduct,
  }));

  // Маркер клиентского рендера
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Загрузка данных
  useEffect(() => {
    if (isClient && products.length === 0) {
      actions.fetchAndSetProducts();
    }
  }, [isClient, products.length, actions.fetchAndSetProducts]);

  // Не рендерим ничего на сервере
  if (!isClient) {
    return null;
  }

  // ...существующий JSX из ProductList...
}
