import React from 'react';

interface BurgerIconProps {
  onClick: () => void;
  isOpen: boolean;
  name: string;
}

const BurgerIcon: React.FC<BurgerIconProps> = ({ onClick, isOpen, name }) => {
  return (
    <div className={`${name} ${isOpen ? 'open' : ''}`} onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default BurgerIcon;
