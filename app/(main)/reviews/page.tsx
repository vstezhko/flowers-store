'use client';

interface IReviewsParams {
  id: number;
  img: string;
  author: string;
  date: string;
  text: string;
}

const reviews: IReviewsParams[] = [
  {
    id: 1,
    img: './img/png/reviews-layouts/layout1.png',
    author: 'Emily Johnson',
    date: 'August 10, 2023',
    text: "I'm amazed by the variety and freshness of flowers at Flowers Store. The bouquet I ordered for my friend's birthday was not only beautiful but also delivered on time. Highly recommended!",
  },
  {
    id: 2,
    img: './img/png/reviews-layouts/layout2.png',
    author: 'Alex Carter',
    date: 'May 5, 2023',
    text: "Flowers Store has become my go-to place for special occasions. Their impeccable service and stunning arrangements never disappoint. It's a joy to bring smiles to my loved ones with their flowers.",
  },
  {
    id: 3,
    img: './img/png/reviews-layouts/layout3.png',
    author: 'Sophia Martinez',
    date: 'July 20, 2023',
    text: "I've tried several online flower shops, but Flowers Store stands out for its unique designs and attention to detail. The care they put into packaging and delivering their flowers is truly exceptional.",
  },
  {
    id: 4,
    img: './img/png/reviews-layouts/layout4.png',
    author: 'Olivia Smith',
    date: 'June 8, 2023',
    text: "I can't express how much I love Flowers Store. The arrangements they create are not just flowers but works of art. Each petal and color is thoughtfully chosen, making every bouquet a masterpiece.",
  },
  {
    id: 5,
    img: './img/png/reviews-layouts/layout5.png',
    author: 'James Wilson',
    date: 'April 30, 2023',
    text: "Flowers Store combines elegance and convenience seamlessly. Their website is user-friendly, and the flowers are elegant. I've never been disappointed with their service. Keep up the great work!",
  },
];
const Reviews = () => {
  return (
    <section className='page'>
      <h1 className='page__title'>Reviews</h1>
      <div className='page__content reviews'>
        {reviews.map(review => {
          return (
            <div key={review.id} className='reviews__block'>
              <img src={review.img} alt={`layout_${review.id}.png`} />
              <div className='block__content'>
                <h4>{review.author}</h4>
                <p className='date'>{review.date}</p>
                <p>{review.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Reviews;
