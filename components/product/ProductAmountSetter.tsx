import React, { FC } from 'react';
import FsButton from '@/components/UI/FsButton';
import { FsButtonType } from '@/types/enums';
import MinusIcon from '@/components/Icons/MinusIcon';
import PlusIcon from '@/components/Icons/PlusIcon';

export interface ProductAmountSetterParams {
  productAmount: number;
  onChange: (num: number) => void;
}

const ProductAmountSetter: FC<ProductAmountSetterParams> = ({ productAmount, onChange }) => {
  return (
    <div className='product-block__amount'>
      <FsButton
        className={FsButtonType.ICON}
        onClick={() => onChange(-1)}
        icon={<MinusIcon />}
        disabled={productAmount === 1}
      />
      <p>{productAmount} item</p>
      <FsButton
        className={FsButtonType.ICON}
        onClick={() => onChange(1)}
        icon={<PlusIcon />}
        disabled={productAmount === 20}
      />
    </div>
  );
};

export default ProductAmountSetter;
