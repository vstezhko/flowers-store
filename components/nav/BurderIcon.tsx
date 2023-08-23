import React from 'react';

interface BurgerIconProps {
  onClick: () => void;
  isOpen: boolean;
}

const BurgerIcon: React.FC<BurgerIconProps> = ({ onClick, isOpen }) => {
  return (
    <div className={`nav__burger ${isOpen ? 'open' : ''}`} onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default BurgerIcon;
