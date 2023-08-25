'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from '@/redux/store';
import { getProductByIdAsync } from '@/redux/slices/productSlice/thunks';
import { TokenService } from '@/api/services/Token.service';
import { ProductVariant } from '@/redux/slices/productSlice/productSlice';
import NoImage from '@/public/img/jpeg/no-image.jpg';
import Image from 'next/image';
import ProductVariantCard from '@/components/product/ProductVariantCard';
import ProductCompositionCard from '@/components/product/ProductCompositionCard';
import FsButton from '@/components/UI/FsButton';
import { FsButtonType } from '@/types/enums';
import PlusIcon from '@/components/Icons/PlusIcon';
import MinusIcon from '@/components/Icons/MinusIcon';
import { Skeleton } from '@mui/material';

const Product = () => {
  const id: string = usePathname().split('/')[2];
  const dispatch = useDispatch();
  const router = useRouter();
  const product = useSelector(state => state.product);
  const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);

  const [activeVariant, setActiveVariant] = useState<ProductVariant | null>(null);
  const [productAmount, setProductAmount] = useState(1);
  const composition = activeVariant?.attributes.find(attr => attr.name === 'composition')?.value.split(',');

  useEffect(() => {
    if (product.status === 'failed') {
      router.replace('/404');
    }
    let variants: ProductVariant[] = [];
    if (product.masterVariant) variants.push(product.masterVariant);
    if (product.variants.length) variants.push(...product.variants);
    setProductVariants(variants);
    if (product?.id) setActiveVariant(variants[0]);
  }, [product, router]);

  useEffect(() => {
    const token: string = TokenService.getAccessTokenFromLS()?.token;
    dispatch(getProductByIdAsync({ token, id }));
  }, [dispatch, id]);

  const handleChangeActiveVariant = (variantId: number) => {
    const item = productVariants.find(variant => variant.id === variantId);
    if (item) setActiveVariant(item);
  };

  const handleChangeAmount = (number: number) => {
    if (productAmount === 1 && number === -1) return;
    if (productAmount === 20 && number === 1) return;
    setProductAmount(prevState => prevState + number);
  };

  const handleAddToCard = () => {};

  return (
    <div className='product page'>
      <section className='product-block'>
        <div className='product-block__images'>
          <div className='product-block__main-image'>
            <Image src={activeVariant?.images[0].url || NoImage} alt='product image' width={450} height={450} />
          </div>
        </div>
        <div className='product-block__info'>
          {product.name.en ? <h3>{product.name.en}</h3> : <Skeleton variant='rectangular' width={200} height={30} />}
          <div className='product-block__variants'>
            {productVariants.length ? (
              productVariants.map(variant => {
                return (
                  <ProductVariantCard
                    key={variant?.id}
                    id={variant?.id.toString()}
                    price={variant?.prices[0].value.centAmount / 100}
                    isActive={variant?.id === activeVariant?.id}
                    onClick={() => handleChangeActiveVariant(variant?.id)}
                  />
                );
              })
            ) : (
              <>
                <Skeleton style={{ margin: '10px 0' }} variant='rounded' width={210} height={63} />
                <Skeleton style={{ margin: '10px 0' }} variant='rounded' width={210} height={63} />
                <Skeleton style={{ margin: '10px 0' }} variant='rounded' width={210} height={63} />
              </>
            )}
          </div>
          <ProductCompositionCard items={composition} />
          <div className='product-block__details'>
            <div className='product-block__amount'>
              <FsButton
                className={FsButtonType.ICON}
                onClick={() => handleChangeAmount(-1)}
                icon={<MinusIcon />}
                disabled={productAmount === 1}
              />
              <p>{productAmount} item</p>
              <FsButton
                className={FsButtonType.ICON}
                onClick={() => handleChangeAmount(1)}
                icon={<PlusIcon />}
                disabled={productAmount === 20}
              />
            </div>
            <div className='product-block__sum'>
              <div className='product-block__sum-info'>
                <p>Sum</p>
                {activeVariant ? (
                  <p>{(activeVariant?.prices[0]?.value?.centAmount / 100) * productAmount} EUR</p>
                ) : (
                  <Skeleton variant='rectangular' width={70} height={20} />
                )}
              </div>
              <FsButton label='Add to cart' onClick={handleAddToCard} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
