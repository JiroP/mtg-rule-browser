import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ChapterLink from './ChapterLink';
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

const SectionContainer: React.FC<SectionContainerProps> = ({
  chapters,
  title,
  id,
}) => {
  const classes = useStyles();

  // For some reason entries was messing up insert order so we sort it
  const chaptersArray = Object.entries(chapters).sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <>
      <Typography className={classes.section}>{title}</Typography>
      {chaptersArray.map(([chapterId, chapter]) => (
        <ChapterLink
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
