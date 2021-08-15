import React, { ReactElement, useContext } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';

import RulesContext from '../RulesContext';
import Rules from './Rules';

interface ChapterParams {
  chapterId: string;
  sectionId: string;
}

const useStyles = makeStyles((theme) => ({
  chapterHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    color: 'white',
  },
  sectionHeader: {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    color: 'white',
  },
}));

const ChapterPage: React.FC = (): ReactElement => {
  const classes = useStyles();

  const { rulesDict } = useContext(RulesContext);
  const { chapterId, sectionId } = useParams<ChapterParams>();

  const { title: sectionTitle, chapters } = rulesDict[sectionId];
  const { title: chapterTitle, rules } = chapters?.[chapterId];

  return (
    <>
      <Typography className={classes.sectionHeader} variant="h4">
        {sectionTitle}
      </Typography>
      <Typography className={classes.chapterHeader} variant="h5">
        {chapterTitle}
      </Typography>
      <Rules rules={rules} />
    </>
  );
};

export default ChapterPage;
