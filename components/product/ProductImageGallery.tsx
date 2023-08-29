import React from 'react';
import ImageGallery from 'react-image-gallery';
import { ProductImage } from '@/redux/slices/productSlice/productSlice';

const ProductImageGallery = ({ images }: { images: ProductImage[] }) => {
  const galleryImages = images.map(image => {
    return {
      original: image.url,
      thumbnail: image.url,
      originalClass: 'original-image',
    };
  });

  return (
    <ImageGallery
      items={galleryImages}
      additionalClass='fs-product-gallery'
      showPlayButton={false}
      showNav={false}
      showThumbnails={galleryImages.length > 2}
    />
  );
};

export default ProductImageGallery;
