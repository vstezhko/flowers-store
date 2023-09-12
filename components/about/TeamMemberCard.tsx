'use client';
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import noImage from '@/public/img/jpeg/no-image.jpg';
import Slider from '@mui/material/Slider';
import GithubIcon from '../Icons/social/GithubIcon';
import LinkedinIcon from '../Icons/social/LinkedinIcon';
import Link from 'next/link';
import { TeamMemberParams } from '@/app/(main)/about/page';

function valuetext(value: number) {
  return `${value}%`;
}

function highlightText(text: string, highlights: string[]) {
  const parts = text.split(new RegExp(`(\\b(?:${highlights.join('|')})\\b)`, 'i'));

  return parts.map((part, index) => {
    if (highlights.includes(part)) {
      return (
        <span key={index} className='highlight'>
          {part}
        </span>
      );
    }
    return part;
  });
}

const TeamMemberCard = ({ teamMemberData, isEven }: { teamMemberData: TeamMemberParams; isEven: boolean }) => {
  const [src, setSrc] = useState(teamMemberData.photo);
  const memoizedHighlightText = useMemo(
    () => highlightText(teamMemberData.text, teamMemberData.highlights),
    [teamMemberData.text, teamMemberData.highlights]
  );

  return (
    <Paper className={`team-member ${isEven ? 'even' : 'odd'}`}>
      <div className='team-member__biography'>
        <h4 className='team-member__name'>{teamMemberData.name}</h4>
        <h5 className='team-member__role highlight'>{teamMemberData.role}</h5>
        <div className='team-member__text'>{memoizedHighlightText}</div>
      </div>
      <div className='team-member__image-block'>
        <Image className='team-member__image' src={src} onError={() => setSrc(noImage)} alt='Team member photo' />
        <div className='team-member__social'>
          <Link href={teamMemberData.githubLink}>
            <GithubIcon />
          </Link>
          <Link href={teamMemberData.linkedinLink}>
            <LinkedinIcon />
          </Link>
        </div>
      </div>
      <div className='team-member__contributions'>
        {teamMemberData.skills.map((skill, index) => (
          <div className='team-member__skill' key={index}>
            <label>{skill[0]}</label>
            <Slider
              className='team-member__contributions-range'
              aria-label={skill[0]}
              value={skill[1]}
              getAriaValueText={valuetext}
              valueLabelDisplay='on'
            />
          </div>
        ))}
      </div>
    </Paper>
  );
};

export default TeamMemberCard;
