'use client';
import React from 'react';
import Image from 'next/image';
import MainBanner from '@/public/img/jpeg/banner.jpg';
import FsButton from '@/components/UI/FsButton';
import { FsButtonType } from '@/types/enums';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from '@/redux/store';
import { TokenService } from '@/api/services/Token.service';
import { getCategoriesAsync } from '@/redux/slices/categorySlice/thunks';
import { CategoryFullData } from '@/redux/slices/categorySlice/categorySlice';
import { actions as searchActions } from '@/redux/slices/searchSlice/searchSlice';

export default function BannerSection() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.category);

  const fetchCategories = async () => {
    const token = TokenService.getAccessTokenFromLS()?.token;
    if (token) return dispatch(getCategoriesAsync(token));
  };

  const findTargetCategory = (categoriesArr: CategoryFullData[]) => {
    if (categoriesArr?.length) {
      return categoriesArr.find(i => i.name?.en === 'Mix');
    }
  };

  const handleBtnClick = async () => {
    let categoryId;
    if (!categories) {
      const res = await fetchCategories();
      if (res) {
        categoryId = findTargetCategory(Object.values(res.payload.results))?.id;
      }
    } else {
      categoryId = findTargetCategory(Object.values(categories))?.id;
    }
    dispatch(searchActions.setCategoryId(categoryId));
    router.push('/catalog');
  };

  return (
    <section className='banner-section'>
      <div className='banner-section__img-container'>
        <Image fill priority={true} src={MainBanner} alt='Welcome' className='banner-section__img' />
        <div className='banner-section__block'>
          <div className='banner-section__block-inner'>
            <h1>SALE</h1>
            <h2 className='block-inner__subtitle'>ENJOY UP TO 50% OFF</h2>
            <h3>ON MIX BOUQUETS</h3>
            <h3 className='block-inner__subtitle'>
              <span>USE CODE</span> RS
            </h3>
            <FsButton className={FsButtonType.REGULAR} label='Shop now' onClick={handleBtnClick} />
          </div>
        </div>
      </div>
    </section>
  );
}
