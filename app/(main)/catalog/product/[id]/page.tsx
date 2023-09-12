'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from '@/redux/store';
import { getProductByIdAsync } from '@/redux/slices/productSlice/thunks';
import { TokenService } from '@/api/services/Token.service';
import { productSlice, ProductVariant } from '@/redux/slices/productSlice/productSlice';
import ProductCompositionCard from '@/components/product/ProductCompositionCard';
import FsButton from '@/components/UI/FsButton';
import { Skeleton, Tooltip } from '@mui/material';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductVariants from '@/components/product/ProductVariants';
import ProductAmountSetter from '@/components/product/ProductAmountSetter';
import ProductSum from '@/components/product/ProductSum';
import { createProductVariantsArray } from '@/utils/createProductVariantsArray';
import CategoryBreadcrumbs from '@/components/catalog/CategoryBreadcrumbs';
import { LineItem } from '@/api/services/Cart.services';
import { addToCart } from '@/utils/addToCart';
import { isProductInCart } from '@/utils/isProductInCart';

const Product = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useDispatch();
  const router = useRouter();
  const product = useSelector(state => state.product);
  const [productVariants, setProductVariants] = useState<{ size: string; variant: ProductVariant }[]>([]);
  const [activeVariant, setActiveVariant] = useState<{ size: string; variant: ProductVariant } | null>(null);
  const [productAmount, setProductAmount] = useState(1);
  const composition = activeVariant?.variant.attributes.find(attr => attr.name === 'composition')?.value.split(',');
  const { cartProductsIds } = useSelector(state => state.cart);

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (activeVariant?.variant.id) {
      setDisabled(isProductInCart(activeVariant?.variant.id, cartProductsIds, id));
    }
  }, [activeVariant, isProductInCart]);

  useEffect(() => {
    if (product.status === 'failed') {
      router.replace('/404');
    }
    const variants = createProductVariantsArray(product);
    setProductVariants(variants);
    if (product?.id) setActiveVariant(variants[0]);
  }, [product, router]);

  useEffect(() => {
    const token = TokenService.getAccessTokenFromLS();
    if (token?.token) dispatch(getProductByIdAsync({ token: token.token, id }));
    return () => {
      dispatch(productSlice.actions.clearState());
    };
  }, [dispatch, id]);

  const handleChangeActiveVariant = (variantId: number) => {
    const item = productVariants.find(variant => variant.variant.id === variantId);
    if (item) {
      setActiveVariant(item);
      setDisabled(isProductInCart(variantId, cartProductsIds, id));
    }
  };

  const handleChangeAmount = (number: number) => {
    if (productAmount === 1 && number === -1) return;
    if (productAmount === 20 && number === 1) return;
    setProductAmount(prevState => prevState + number);
  };

  const handleAddToCard = async (e: React.MouseEvent) => {
    e.preventDefault();
    setDisabled(true);
    const lineItem: LineItem = {
      productId: id,
      variantId: activeVariant?.variant.id,
      quantity: productAmount,
    };
    await addToCart(id, lineItem, dispatch);
  };

  return (
    <div className='product page'>
      <CategoryBreadcrumbs categoryId={product.categories[0]?.id} productName={product.name.en} />
      <section className='product-block'>
        <div className='product-block__images'>
          {product.id && <ProductImageGallery images={activeVariant?.variant.images || []} />}
        </div>
        <div className='product-block__info'>
          {product.name.en ? <h3>{product.name.en}</h3> : <Skeleton variant='rectangular' width={200} height={30} />}
          {product.description.en ? (
            <p>{product.description.en}</p>
          ) : (
            <Skeleton variant='rectangular' width={300} height={30} />
          )}
          <ProductVariants
            productVariants={productVariants}
            activeVariant={activeVariant}
            onChange={handleChangeActiveVariant}
          />
          <ProductCompositionCard items={composition} />
          <div className='product-block__details'>
            {product.id ? (
              <ProductAmountSetter productAmount={productAmount} onChange={handleChangeAmount} />
            ) : (
              <Skeleton variant='rectangular' width={175} height={52} />
            )}
            <div className='product-block__sum'>
              <ProductSum
                sum={
                  activeVariant
                    ? activeVariant?.variant.prices[0]?.discounted
                      ? (activeVariant?.variant.prices[0]?.discounted?.value.centAmount / 100) * productAmount
                      : (activeVariant?.variant.prices[0]?.value?.centAmount / 100) * productAmount
                    : undefined
                }
              />
              <Tooltip title={disabled ? 'This item has been added to the cart' : ''}>
                <span>
                  {product.id ? (
                    <FsButton label='Add to cart' onClick={handleAddToCard} disabled={disabled} />
                  ) : (
                    <Skeleton variant='rectangular' width={120} height={40} />
                  )}
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
