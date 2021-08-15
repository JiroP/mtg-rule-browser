import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChapterLink from './ChapterLink';
import { Section } from '../types';
import { COLORS } from '../constants/colors';

interface SectionProps extends Section {
  id: string;
}

const useStyles = makeStyles((theme) => ({
  section: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: 'white',
  },
  chapterRoot: {
    background: COLORS[600],
    borderRadius: '10px',
  },
}));

const SectionComponent: React.FC<SectionProps> = ({
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
      <div className={classes.chapterRoot}>
        {chaptersArray.map(([chapterId, chapter]) => (
          <ChapterLink
            key={`chapter-${chapter.title}`}
            id={chapterId}
            sectionId={id}
            rules={chapter.rules}
            title={chapter.title}
          />
        ))}
      </div>
    </>
  );
};

export default SectionComponent;
