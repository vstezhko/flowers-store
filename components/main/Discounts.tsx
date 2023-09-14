'use client';
import React from 'react';
import DiscountsImg from '@/public/img/jpeg/discounts.jpg';
import Image from 'next/image';
import { FsButtonType } from '@/types/enums';
import FsButton from '@/components/UI/FsButton';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from '@/redux/store';
import { TokenService } from '@/api/services/Token.service';
import { getCategoriesAsync } from '@/redux/slices/categorySlice/thunks';
import { actions as searchActions } from '@/redux/slices/searchSlice/searchSlice';
import { CategoryFullData } from '@/redux/slices/categorySlice/categorySlice';

const Discounts = () => {
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
    <div className='discounts'>
      <div className='discounts__container-img'>
        <Image
          className='discounts__img'
          src={DiscountsImg}
          alt='discounts'
          style={{
            minHeight: '100%',
            width: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <div className='discounts__container-message'>
        <h3>
          RS Student Exclusive: Get <span> 50% Off </span>
          on all Bouquets in &apos;MIX&apos; Category with the cart coupon
          <span> &apos;RS&apos; </span>!
        </h3>
        <FsButton className={FsButtonType.MEDIUM} label='find in Catalog' onClick={handleBtnClick} />
      </div>
    </div>
  );
};

export default Discounts;
