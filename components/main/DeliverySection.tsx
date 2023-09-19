import React from 'react';
import BackgroundTexture from '@/components/BackroundTexture';
import LeafLeft from '@/public/img/png/leaf-left.webp';
import LeafRight from '@/public/img/png/leaf-right.webp';
import Image from 'next/image';

interface DeliveryStepsParams {
  id: string;
  title: string;
  text: string;
}

const deliverySteps: DeliveryStepsParams[] = [
  {
    id: '1',
    title: 'Choose a bouquet',
    text: 'Browse the catalog and select your favorite bouquet.',
  },
  {
    id: '2',
    title: 'Select size and quantity',
    text: 'On the bouquet description page, choose the appropriate size and quantity.',
  },
  {
    id: '3',
    title: 'Provide delivery details',
    text: 'Fill out the delivery form and pay for your order using a convenient payment method.',
  },
  {
    id: '4',
    title: 'Your bouquet is ready!',
    text: 'Your bouquet will be assembled from the freshest flowers and delivered to the recipient on the specified date and time.',
  },
];

const DeliverySection = () => {
  return (
    <section className='delivery__section'>
      <div className='background-img background-img_left'>
        <Image src={LeafLeft} alt='leaf' quality={75} priority={true} />
      </div>
      <div className='background-img background-img_right'>
        <Image src={LeafRight} alt='leaf' quality={75} priority={true} />
      </div>
      <BackgroundTexture />
      <h3>
        <span>ORDER</span> IN 4 SIMPLE STEPS
      </h3>
      <div className='delivery__steps'>
        {deliverySteps.map(step => (
          <div className='item__step' key={step.id}>
            <div className='step__container'>
              <div className='step'>{step.id}</div>
            </div>

            <div className='step__info'>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DeliverySection;
