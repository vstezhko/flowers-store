import React from 'react';
import Texture from '@/public/img/png/texture.webp';
import Image from 'next/image';

const BackgroundTexture = () => {
  return <Image src={Texture} alt={'texture'} className='texture' priority={true} quality={75} />;
};

export default BackgroundTexture;
