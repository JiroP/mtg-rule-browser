import React, { ReactElement } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { Chapter } from '../types';

interface ChapterProps extends Chapter {
  id: string;
  sectionId: string;
}

const useStyles = makeStyles(() => ({
  chapter: {
    // background: COLORS[600],
    color: 'white',
    marginLeft: '10px',
  },
}));

const ChapterLink: React.FC<ChapterProps> = ({
  title,
  id,
  sectionId,
}): ReactElement => {
  const classes = useStyles();

  return (
    <>
      <Link to={`/${sectionId}/${id}`}>
        <Typography className={classes.chapter}>{title}</Typography>
      </Link>
    </>
  );
};

export default ChapterLink;
