import React, { ReactElement, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Chapter } from '../types';
import RulesContainer from './RulesContainer';
import { COLORS } from '../constants/colors';

const useStyles = makeStyles(() => ({
  chapter: {
    background: COLORS[600],
    color: 'white',
    marginLeft: '10px',
  },
}));

const ChapterContainer: React.FC<Chapter> = ({
  rules,
  title,
}): ReactElement => {
  const [rulesVisible, setRulesVisible] = useState(false);
  const classes = useStyles();

  const handleClick = (): void => {
    setRulesVisible((prev) => !prev);
  };

  return (
    <>
      <div
        className={classes.chapter}
        onClick={handleClick}
        onKeyDown={handleClick}
        role="button"
        tabIndex={0}
      >
        {title}
      </div>
      {rulesVisible && <RulesContainer rules={Object.values(rules)} />}
    </>
  );
};

export default ChapterContainer;
