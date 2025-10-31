"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "../../../../styles/CreateProduct.module.css";
import { useProductsStore, Product } from '../../../../store/useProductsStore';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  const getById = useProductsStore((s) => s.getById);
  const editProduct = useProductsStore((s) => s.editProduct);
  const upsertProduct = useProductsStore((s) => s.upsertProduct);

  const [product, setProduct] = useState<Product | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const p = getById(id);
    if (p) {
      setProduct(p);
      setTitle(p.title || "");
      setDescription(p.description || "");
      setImage(p.image || "");
      setPrice(p.price ? String(p.price) : "");
    } else {
      // если нет в локальном сторе — можно попробовать перейти назад или показать сообщение
      setProduct(null);
    }
  }, [id, getById]);

  if (!id) {
    return <div className={styles.page}>Invalid product id</div>;
  }

  if (product === null && !getById(id)) {
    return <div className={styles.page}>Product not found</div>;
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required");
      return;
    }

    const updated: Partial<Product> = {
      title: title.trim(),
      description: description.trim(),
      image: image.trim() || undefined,
      price: price ? Number(price) : undefined,
    };

    // если продукт был создан локально — upsert, иначе edit
    const original = getById(id);
    if (original) {
      editProduct(id, updated);
    } else {
      upsertProduct({
        id,
        title: updated.title || "",
        description: updated.description || "",
        image: updated.image,
        price: updated.price,
        created: true,
      });
    }

    router.push(`/products/${id}`);
  };

  return (
    <div className={styles.page}>
      <h1>Edit product</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <label>
          Title*
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Description*
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          Image URL
          <input value={image} onChange={(e) => setImage(e.target.value)} />
        </label>

        <label>
          Price
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.actions}>
          <button type="submit">Save</button>
          <button type="button" onClick={() => router.push(`/products/${id}`)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
