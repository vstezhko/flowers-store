'use client';
import React, { useEffect } from 'react';
import DiscountsImg from '@/public/img/jpeg/discounts.jpg';
import Image from 'next/image';
import { FsButtonType } from '@/types/enums';
import FsButton from '@/components/UI/FsButton';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from '@/redux/store';
import { TokenService } from '@/api/services/Token.service';
import { getCategoriesAsync } from '@/redux/slices/categorySlice/thunks';
import { actions as searchActions } from '@/redux/slices/searchSlice/searchSlice';

const Discounts = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.category);

  useEffect(() => {
    const fetchCategories = () => {
      const token = TokenService.getAccessTokenFromLS()?.token;
      if (token) dispatch(getCategoriesAsync(token));
    };

    if (!categories) fetchCategories();
  }, []);

  const findTargetCategory = () => {
    if (categories) {
      return Object.values(categories).find(i => i.name?.en === 'Mix');
    }
  };

  const handleBtnClick = () => {
    const categoryId = findTargetCategory()?.id;
    if (categoryId) {
      dispatch(searchActions.setCategoryId(categoryId));
      router.push('/catalog');
    }
  };
  return (
    <div className='discounts'>
      <Image src={DiscountsImg} alt={'discounts'} className='discounts__img' />
      <div className='discounts__info'>
        <h3>
          RS Student Exclusive: Get <span> 50% Off </span>
          on all Bouquets in &apos;MIX&apos; Category with the cart coupon
          <span> &apos;RS&apos; </span> at Our Flower Shop!
        </h3>
        <FsButton className={FsButtonType.BIG} label='find in Catalog' onClick={handleBtnClick} />
      </div>
    </div>
  );
};

export default Discounts;
