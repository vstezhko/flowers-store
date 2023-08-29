import React from 'react';
import ImageGallery from 'react-image-gallery';
import { ProductImage } from '@/redux/slices/productSlice/productSlice';

const ProductImageGallery = ({ images }: { images: ProductImage[] }) => {
  const galleryImages = images.length
    ? images.map(image => {
        return {
          original: image.url,
          thumbnail: image.url,
        };
      })
    : [
        {
          original: '/img/jpeg/no-image.jpg',
          thumbnail: '/img/jpeg/no-image.jpg',
        },
      ];

  return (
    <ImageGallery
      items={galleryImages}
      additionalClass='fs-product-gallery'
      showPlayButton={false}
      showNav={false}
      showThumbnails={galleryImages.length > 2}
      onErrorImageURL={'/img/jpeg/no-image.jpg'}
    />
  );
};

export default ProductImageGallery;
