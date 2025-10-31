"use client";
import { Product, useProductsStore } from "../store/useProductsStore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ProductCard } from "../components/ProductCard";
import styles from "../styles/TestProducts.module.css";

export default function ProductsClient({ initialProducts }: { initialProducts: Product[] }) {

const [showFavorites, setShowFavorites] = useState(false);

const {
setProducts, 
setPage, 
likes, 
page: currentPage, 
pageSize, 
products, 
} = useProductsStore();

useEffect(() => {
if (
    initialProducts.length > 0 &&
    useProductsStore.getState().products.length === 0
) {
    setProducts(initialProducts);
}
}, [initialProducts, setProducts]);

// --- Логика фильтрации и пагинации ---
const filtered = showFavorites
? products.filter((p) => !!likes[String(p.id)])
: products;

const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

// Корректировка страницы при изменении фильтрации
useEffect(() => {
if (currentPage > totalPages) setPage(totalPages);
}, [currentPage, totalPages, setPage]);

// Пагинация
const start = (currentPage - 1) * pageSize;
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
            onClick={() => {
            setShowFavorites(false);
            setPage(1);
            }}
            className={!showFavorites ? styles.active : ""}
        >
            All
        </button>
        <button
            onClick={() => {
            setShowFavorites(true);
            setPage(1);
            }}
            className={showFavorites ? styles.active : ""}
        >
            Favorites
        </button>
        </div>
    </div>
    </header>

    <div className={styles.grid}>
    {visible.length === 0 && products.length === 0 ? (
        <div className={styles.loading}>Loading products...</div>
    ) : (
        visible.map((product) => (
        <ProductCard key={product.id} product={product} />
        ))
    )}
    </div>

    <footer className={styles.pager}>
    <button
        onClick={() => setPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
    >
        Prev
    </button>
    <span>
        {currentPage} / {totalPages}
    </span>
    <button
        onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
    >
        Next
    </button>
    </footer>
</div>
);
}
