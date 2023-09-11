'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import noImage from '@/public/img/jpeg/no-image.jpg';
import Slider from '@mui/material/Slider';
import Photo from '@/public/img/jpeg/team-members/vika.jpg';
import GithubIcon from '../Icons/social/GithubIcon';
import LinkedinIcon from '../Icons/social/LinkedinIcon';
import Link from 'next/link';

function valuetext(value: number) {
  return `${value}%`;
}

const TeamMemberCard = () => {
  const [src, setSrc] = useState(Photo);

  return (
    <Paper className='team-member' elevation={0}>
      <div className='team-member__biography'>
        <h4 className='team-member__name'>Viktoria Stezhko</h4>
        <h5 className='team-member__role highlight'>Team-Lead | Front-end Dev</h5>
        <div className='team-member__text'>
          I&apos;m a creative and adaptable professional with{' '}
          <span className='highlight'>excellent communication skills</span>. After gaining valuable{' '}
          <span className='highlight'>experience in management</span> and receiving positive reviews for{' '}
          <span className='highlight'>streamlining business processes</span>, I moved into the IT industry, where
          I&apos;ve been working for 1.5 years. My experience includes notable projects such as{' '}
          <span className='highlight'>a website for an online film festival</span> and{' '}
          <span className='highlight'>a web app for B2B sales platform</span>.
        </div>
      </div>
      <div className='team-member__image-block'>
        <Image className='team-member__image' src={src} onError={() => setSrc(noImage)} alt='Team member photo' />
        <div className='team-member__social'>
          <Link href='https://github.com/vstezhko'>
            <GithubIcon />
          </Link>
          <Link href='https://www.linkedin.com/in/viktoria-stezhko'>
            <LinkedinIcon />
          </Link>
        </div>
      </div>
      <div className='team-member__contributions'>
        <div className='team-member__skill'>
          <label>Communication</label>
          <Slider
            className='team-member__contributions-range'
            aria-label='Communication'
            value={95}
            getAriaValueText={valuetext}
            valueLabelDisplay='on'
          />
        </div>
        <div className='team-member__skill'>
          <label>Process Improvement</label>
          <Slider
            className='team-member__contributions-range'
            aria-label='Process Improvement'
            value={85}
            getAriaValueText={valuetext}
            valueLabelDisplay='on'
          />
        </div>
        <div className='team-member__skill'>
          <label>Project Management</label>
          <Slider
            className='team-member__contributions-range'
            aria-label='Project Management'
            value={100}
            getAriaValueText={valuetext}
            valueLabelDisplay='on'
          />
        </div>
      </div>
    </Paper>
  );
};

export default TeamMemberCard;
