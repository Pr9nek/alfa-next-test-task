import Link from 'next/link';
import styles from '../../../styles/ProductDetail.module.css';
import ProductDetailComponent from '@/components/ProductDetailComponent';

export default async function ProductDetail({params}: {params: {id: string}}) {
  const { id } = await params;

  return (
    <div className={styles.page}>
      <Link href="/products" className={styles.back}>
        ← Back to products
      </Link>
      <ProductDetailComponent productId={id} /> 
    </div>
  );
}
