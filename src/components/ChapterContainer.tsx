import React, { ReactElement, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Chapter } from '../types';
import RulesContainer from './RulesContainer';
import { COLORS } from '../constants/colors';

interface ChapterProps extends Chapter {
  id: string;
  sectionId: string;
}

const useStyles = makeStyles(() => ({
  chapter: {
    background: COLORS[600],
    color: 'white',
    marginLeft: '10px',
  },
}));

const ChapterContainer: React.FC<ChapterProps> = ({
  rules,
  title,
  id,
  sectionId,
}): ReactElement => {
  const [rulesVisible, setRulesVisible] = useState(false);
  const classes = useStyles();

  const handleClick = (): void => {
    setRulesVisible((prev) => !prev);
  };

  return (
    <>
      <Link to={`/${sectionId}/${id}`}>
        <div
          className={classes.chapter}
          onClick={handleClick}
          onKeyDown={handleClick}
          role="button"
          tabIndex={0}
        >
          {title}
        </div>
      </Link>
      {/* {rulesVisible && <RulesContainer rules={Object.values(rules)} />} */}
    </>
  );
};

export default ChapterContainer;
