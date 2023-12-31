import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import React from 'react';

const FsAccordion = ({
  children,
  expanded,
  handleChange,
  summary,
  name,
  disabled,
}: {
  children: React.ReactNode;
  expanded: string | boolean;
  handleChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  summary: string;
  name: string;
  disabled?: boolean;
}) => {
  return (
    <Accordion expanded={expanded === name} onChange={handleChange(name)} disabled={disabled}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1bh-content' id='panel1bh-header'>
        <h4>{summary}</h4>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default FsAccordion;
