'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from '@/redux/store';
import { getProductByIdAsync } from '@/redux/slices/productSlice/thunks';
import { TokenService } from '@/api/services/Token.service';
import { ProductVariant } from '@/redux/slices/productSlice/productSlice';
import NoImage from '@/public/img/jpeg/no-image.jpg';
import Image from 'next/image';
import ProductVariantCard from '@/components/product/ProductVariantCard';
import ProductCompositionCard from '@/components/product/ProductCompositionCard';

const Product = () => {
  const id: string = usePathname().split('/')[2];
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
  const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);

  const [activeVariant, setActiveVariant] = useState(1);
  const composition = productVariants
    .find(item => item.id === activeVariant)
    ?.attributes.find(attr => attr.name === 'composition')
    ?.value.split(',');

  useEffect(() => {
    let variants: ProductVariant[] = [];
    if (product.masterVariant) variants.push(product.masterVariant);
    if (product.variants.length) variants.push(...product.variants);
    setProductVariants(variants);
  }, [product]);

  useEffect(() => {
    const token: string = TokenService.getAccessTokenFromLS()?.token;
    dispatch(getProductByIdAsync({ token, id }));
  }, [dispatch, id]);

  const handleChangeActiveVariant = (variantId: number) => {
    setActiveVariant(variantId);
  };

  return (
    <div className='product page'>
      <section className='product-block'>
        <div className='product-block__images'>
          <div className='product-block__main-image'>
            <Image
              src={
                productVariants[activeVariant]?.images[0].url ? productVariants[activeVariant]?.images[0].url : NoImage
              }
              alt='product image'
              width={450}
              height={450}
            />
          </div>
        </div>
        <div className='product-block__info'>
          <h3>{product.name.en}</h3>
          <div className='product-block__variants'>
            {productVariants.map(variant => {
              return (
                <ProductVariantCard
                  key={variant?.id}
                  id={variant?.id.toString()}
                  price={variant?.prices[0].value.centAmount / 100}
                  isActive={variant.id === activeVariant}
                  onClick={() => handleChangeActiveVariant(variant?.id)}
                />
              );
            })}
          </div>
          <ProductCompositionCard items={composition} />
        </div>
      </section>
      <section>
        <h3>Add to the order</h3>
        <p>some additional products</p>
      </section>
    </div>
  );
};

export default Product;
