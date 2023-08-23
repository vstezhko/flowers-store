'use client';
import SmallProductCard from '@/components/catalog/SmallCard';

const Catalog = () => {
  return (
    <section className='catalog'>
      <h1 className='catalog__title'>Catalog</h1>
      <div className='catalog__container'>
        <SmallProductCard />
        <SmallProductCard />
        <SmallProductCard />
        <SmallProductCard />
        <SmallProductCard />
        <SmallProductCard />
        <SmallProductCard />
        <SmallProductCard />
        <SmallProductCard />
        <SmallProductCard />
      </div>
    </section>
  );
};

export default Catalog;
