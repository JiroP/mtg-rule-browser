import React from 'react';
import { makeStyles } from '@material-ui/core';
import ChapterContainer from './ChapterContainer';
import { Section } from '../types';
import { COLORS } from '../constants/colors';

interface SectionContainerProps extends Section {
  id: string;
}

const useStyles = makeStyles(() => ({
  section: {
    background: COLORS[700],
    color: 'white',
  },
}));

const SectionContainer: React.FC<SectionContainerProps> = ({ chapters, title, id }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.section}>{title}</div>
      {Object.entries(chapters).map(([chapterId, chapter]) => (
        <ChapterContainer
          key={`chapter-${chapter.title}`}
          id={chapterId}
          sectionId={id}
          rules={chapter.rules}
          title={chapter.title}
        />
      ))}
    </>
  );
};

export default SectionContainer;
