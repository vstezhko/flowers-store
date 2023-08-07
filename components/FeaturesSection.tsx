import React from 'react';
import Image from 'next/image';
import Delivery from '@/public/img/png/free-delivery.png';
import Gifts from '@/public/img/png/gifts.png';
import DeliveryHours from '@/public/img/png/delivery-hours.png';
import Discounts from '@/public/img/png/discounts.png';

export default function FeaturesSection() {
  const itemData = [
    {
      img: Delivery.src,
      text: [
        <span key='free-delivery' className='features__highlight'>
          Free delivery
        </span>,
        ' within the city',
      ],
      alt: 'Delivery',
    },
    {
      img: Gifts.src,
      text: [
        'Postcard ',
        <span key='as-a-gift' className='features__highlight'>
          as a gift
        </span>,
        ' and a photo of delivery',
      ],
      alt: 'Gifts',
    },
    {
      img: DeliveryHours.src,
      text: [
        <span key='round-the-clock' className='features__highlight'>
          Round the clock
        </span>,
        ' delivery',
      ],
      alt: '24/7',
    },
    {
      img: Discounts.src,
      text: [
        'Сumulative ',
        <span key='discount-system' className='features__highlight'>
          discount system
        </span>,
      ],
      alt: 'Discounts',
    },
  ];
  return (
    <section className='features'>
      <ul className='features__galery'>
        {itemData.map(item => (
          <li className='features__item' key={item.img}>
            <div className='features__img-container'>
              <Image fill={true} src={item.img} alt={item.alt} className='features__img' />
            </div>
            <div className='features__text'> {item.text.map(fragment => fragment)}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
