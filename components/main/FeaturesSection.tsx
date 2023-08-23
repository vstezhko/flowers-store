import React from 'react';
import Image from 'next/image';
import Delivery from '@/public/img/png/free-delivery.png';
import Gifts from '@/public/img/png/gifts.png';
import DeliveryHours from '@/public/img/png/delivery-hours.png';
import Discounts from '@/public/img/png/discounts.png';

export default function FeaturesSection() {
  const itemsData = [
    {
      id: 1,
      img: Delivery.src,
      textStart: '',
      highlight: 'Free delivery',
      textEnd: ' within the city',
      alt: 'Delivery',
    },
    {
      id: 2,
      img: Gifts.src,
      textStart: 'Postcard ',
      highlight: 'as a gift',
      textEnd: ' and a photo of delivery',
      alt: 'Gifts',
    },
    {
      id: 3,
      img: DeliveryHours.src,
      textStart: '',
      highlight: 'Round the clock',
      textEnd: ' delivery',
      alt: '24/7',
    },
    {
      id: 4,
      img: Discounts.src,
      textStart: 'Cumulative ',
      highlight: 'discount system',
      textEnd: '',
      alt: 'Discounts',
    },
  ];
  return (
    <section className='features'>
      <ul className='features__galery'>
        {itemsData.map(item => (
          <li className='features__item' key={item.id}>
            <div className='features__img-container'>
              <Image fill={true} src={item.img} alt={item.alt} className='features__img' />
            </div>
            <div className='features__text'>
              {item.textStart}
              <span className='highlight'>{item.highlight}</span>
              {item.textEnd}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
