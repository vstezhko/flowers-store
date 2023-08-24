'use client';
import { ProductService } from '@/api/services/Products.services';
import SmallProductCard from '@/components/catalog/SmallCard';
import { useEffect, useState } from 'react';
import { TokenService } from '@/api/services/Token.service';
import { useSnackbar } from 'notistack';

export interface ProductCategory {
  typeId: string;
  id: string;
}

interface ProductPrice {
  id: string;
  value: {
    type: string;
    currencyCode: 'EUR';
    centAmount: number;
    fractionDigits: number;
  };
}

interface ProductImage {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

interface Channel {
  isOnStock: boolean;
  availableQuantity: number;
  version: number;
  id: string;
}

interface ProductVariant {
  id: number;
  sku: string;
  key: string;
  prices: ProductPrice[];
  images: ProductImage[];
  attributes: ProductAttribute[];
  assets: [];
  availability: {
    channels: Record<string, Channel>;
  };
}

interface ProductAttribute {
  name: string;
  value: string;
}

interface ProductMasterData {
  current: CurrentProductData;
}

interface CurrentProductData {
  name: {
    en: string | null;
  };
  description: {
    en: string | null;
  };
  categories: ProductCategory[];
  categoryOrderHints: {};
  images: ProductImage[];
  slug: {
    en: string | null;
  };
  metaTitle: {
    en: string | null;
  };
  metaKeywords: {
    en: string | null;
  };
  metaDescription: {
    en: string | null;
  };
  masterVariant: {
    id: number | null;
    sku: string | null;
    key: string | null;
    prices: ProductPrice[];
    images: ProductImage[];
    attributes: ProductAttribute[];
    assets: [];
    availability: {
      channels: Record<string, Channel> | null;
    };
  };
  variants: ProductVariant[];
  searchKeywords: {};
}

interface Product {
  id: string | null;
  masterData: ProductMasterData;
}

const Catalog = () => {
  const [productsPage, setProductsPage] = useState<Product[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await ProductService.getProducts(TokenService.getAccessTokenFromLS().token);
        setProductsPage(products.results);
      } catch (innerError) {
        enqueueSnackbar('An error occurred while fetching products. Try again later!');
      }
    };
    fetchProducts();
  }, [enqueueSnackbar]);

  return (
    <section className='catalog page'>
      <h1 className='page__title'>Catalog</h1>
      <div className='catalog__container'>
        {productsPage.map(product => (
          <SmallProductCard
            key={product.id}
            productName={product.masterData.current.name?.en || 'No product name'}
            price={
              product.masterData.current.masterVariant.prices?.[0].value.centAmount
                ? `From ${product.masterData.current.masterVariant.prices[0].value.centAmount} ${product.masterData.current.masterVariant.prices[0].value.currencyCode}`
                : 'Upon request'
            }
            description={product.masterData.current.description?.en || 'No description available'}
            image={product.masterData.current.masterVariant.images[0].url || 'No image available'}
          />
        ))}
      </div>
    </section>
  );
};

export default Catalog;
