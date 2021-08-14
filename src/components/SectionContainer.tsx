import React from 'react';
import { makeStyles } from '@material-ui/core';
import ChapterContainer from './ChapterContainer';
import { Section } from '../types';

const useStyles = makeStyles(() => ({
  section: {
    background: '#424242',
    color: 'white',
  },
}));

const SectionContainer: React.FC<Section> = ({ chapters, title }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.section}>{title}</div>
      {Object.values(chapters).map((chapter) => (
        <ChapterContainer rules={chapter.rules} title={chapter.title} />
      ))}
    </>
  );
};

export default SectionContainer;
