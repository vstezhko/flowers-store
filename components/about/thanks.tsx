import Image from 'next/image';
import FloralFrame from '@/public/img/png/floral-frame.png';
import SchoolLogo from '@/components/Icons/RsSchoolLogo';
import Link from 'next/link';

const ThanksSection = () => {
  return (
    <div className='thanks'>
      <div className='thanks__image-block'>
        <Image className='thanks__image' src={FloralFrame} alt='floral frame' />
        <Link className='thanks__link' href='https://rs.school/'>
          <SchoolLogo />
        </Link>
      </div>
      <div className='thanks__text-block'>
        <p>
          Our project &apos;s journey began within the nurturing confines of RS School, a program founded by
          <span className='highlight'> The Rolling Scopes developer community</span> in 2013.
        </p>
        <p>
          It&apos;s at RS School that we found <span className='highlight'>the inspiration and skills</span> needed to
          bring this project to life. This school not only equipped us with{' '}
          <span className='highlight'>the technical know-how</span> but also served as{' '}
          <span className='highlight'>the meeting point for our team</span>.
        </p>
        <p>
          We are immensely grateful to the mentors who{' '}
          <span className='highlight'>generously shared their expertise</span>, making this project possible.
        </p>
      </div>
    </div>
  );
};

export default ThanksSection;
