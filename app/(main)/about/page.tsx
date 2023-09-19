import TeamMemberCard from '@/components/about/TeamMemberCard';
import ThanksSection from '@/components/about/Thanks';
import React from 'react';
import { StaticImageData } from 'next/image';
import Vika from '@/public/img/jpeg/team-members/vika.jpg';
import Ksusha from '@/public/img/jpeg/team-members/ksusha.jpg';
import Zhenya from '@/public/img/jpeg/team-members/zhenya.jpg';

type SkillItem = [string, number];

export interface TeamMemberParams {
  name: string;
  role: string;
  text: string;
  highlights: string[];
  photo: StaticImageData;
  githubLink: string;
  linkedinLink: string;
  skills: SkillItem[];
  contribution: string;
}

const TeamMembersData: TeamMemberParams[] = [
  {
    name: 'Kseniya Biarezina',
    role: 'Front-end Dev',
    text: `While working as a financial analyst in the banking sector, I made extensive use of Excel, SQL, and VBA. I transitioned then to web development through courses on LinkedIn Learning and Netology, and RS School's Stage 0. Despite being new to commercial web development, I've been involved in numerous projects during my training. I find web development exciting for its tangible results and constant learning opportunities.`,
    highlights: [
      'Excel, SQL, and VBA',
      'LinkedIn Learning',
      'Netology',
      `RS School's Stage 0`,
      'tangible results',
      'constant learning opportunities',
    ],
    photo: Ksusha,
    githubLink: 'https://github.com/BiarezKseniya',
    linkedinLink: 'https://www.linkedin.com/in/kseniya-biarezina/',
    skills: [
      ['requeriment analysis', 95],
      ['learning', 100],
      ['outcomes delivery', 90],
    ],
    contribution: 'taking part in coding, realize task requirements, testing',
  },
  {
    name: 'Eugenia Khaleeva',
    role: 'Front-end Dev',
    text: `I'm a React Front-end Developer with over 1 year of commercial development experience. My goal is to become a sought-after IT specialist by continually improving my skills. I'm known for my teamwork and problem-solving abilities. I have a background in account management and certifications in Front-end development, including completion of the JS/FE PRE-SCHOOL program.`,
    highlights: [
      'over 1 year of commercial development experience',
      'become a sought-after IT specialist',
      'my teamwork and problem-solving abilities',
      'certifications in Front-end development',
      'JS/FE PRE-SCHOOL program',
    ],
    photo: Zhenya,
    githubLink: 'https://github.com/khaleeva',
    linkedinLink: 'https://www.linkedin.com/in/eugenia-khaleeva-b66035157',
    skills: [
      ['creativity', 100],
      ['teamwork', 90],
      ['problem-solving', 95],
    ],
    contribution: 'taking part in coding, realize task requirements, design',
  },
  {
    name: 'Viktoria Stezhko',
    role: 'Team-Lead | Front-end Dev',
    text: `I'm a creative and adaptable professional with excellent communication skills. After gaining valuable experience in management and receiving positive reviews for streamlining business processes, I moved into the IT industry, where I've been working for 1.5 years. My experience includes notable projects such as a website for an online film festival and a web app for B2B sales platform.`,
    highlights: [
      'excellent communication skills',
      'experience in management',
      'streamlining business processes',
      'a website for an online film festival',
      'a web app for B2B sales platform',
    ],
    photo: Vika,
    githubLink: 'https://github.com/vstezhko',
    linkedinLink: 'https://www.linkedin.com/in/viktoria-stezhko',
    skills: [
      ['communication', 95],
      ['process improvement', 90],
      ['project management', 100],
    ],
    contribution: 'taking part in coding, realize task requirements, optimization',
  },
];

const About = () => {
  return (
    <section className='page'>
      <h1 className='page__title'>About us</h1>
      <div className='page__content about'>
        <div className='about__item'>
          <h3>Welcome to our Flower Store project! 🌼</h3>
          <p>
            This web application is designed to bring the enchanting world of flowers to our customers in a delightful
            digital environment.
          </p>
          <p>
            As an online flower shop, we offer a wide array of vibrant and captivating blooms, as well as other related
            products that are sure to bring smiles to your faces and warmth to your hearts.
          </p>
          <p>
            Our Flower Store web application ensures that shopping for flowers is a joyous and immersive experience 🏪.
          </p>
          <p>
            From the moment you step into our virtual store, you&apos;ll be greeted with a visually appealing display of
            bouquets, arrangements, and gifts that mirror the charm of an actual flower boutique.
          </p>
        </div>
        <div className='about__item'>
          <h3>Key Features of our Flower Shop</h3>
          <p>
            🌷 <span className='highlight indent'>Extensive Collection:</span> Browse through a delightful collection of
            fresh flowers and elegant bouquets carefully curated to suit all occasions, be it birthdays, anniversaries,
            weddings, or just to brighten someone&apos;s day.
          </p>
          <p>
            🏠 <span className='highlight indent'>Interactive Main Page:</span> Our main page welcomes you with stunning
            floral floral arrangements, highlighting the season&apos;s best picks and special offers that captivate your
            senses.
          </p>
          <p>
            📋 <span className='highlight indent'>Detailed Product Pages:</span> Click on any bouquet or arrangement to
            explore in-depth details, including flower types, colors, and variants.
          </p>
          <p>
            🌸 <span className='highlight indent'>Search and Sorting:</span> Easily find your favorite flowers or gifts
            using our category selector, search and sorting features, allowing you to quickly navigate through our
            diverse selection.
          </p>
          <p>
            🛒 <span className='highlight indent'>User-Friendly Cart:</span> Add your chosen flowers and gifts to the
            shopping cart with a click, review your selections, and seamlessly proceed to checkout for a hassle-free
            shopping experience.
          </p>
          <p>
            🔍 <span className='highlight indent'>About Us:</span> Learn more about our passion for flowers, our team of
            dedicated florists, and our commitment to providing the freshest and most beautiful blooms.
          </p>
          <p>
            👤 <span className='highlight indent'>User Accounts:</span> Create your personal account to simplify the
            ordering procedure and receive exclusive offers and discounts.
          </p>
        </div>
        <div className='about__item'>
          <h3>Meet our team</h3>
          <p>
            Our team of developers excelled through active and effective communication. We held regular meetings,
            discussed our ideas, and shared best practices, allowing us to reach a consensus and create a high-quality
            product. Our openness to feedback and ability to work as a team made our project successful and satisfied
            our clients needs.
          </p>
          <div className='about__team-members'>
            {TeamMembersData.map((member, index) => (
              <TeamMemberCard key={index} teamMemberData={member} isEven={index % 2 === 0} />
            ))}
          </div>
        </div>
        <div className='about__item'>
          <h3>Roots in RS School</h3>
          <ThanksSection />
        </div>
      </div>
    </section>
  );
};

export default About;
