import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Rule } from '../types';
import { COLORS } from '../constants/colors';

const useStyles = makeStyles(() => ({
  rule: {
    background: COLORS[500],
    marginLeft: '20px',
  },
  subRule: {
    background: COLORS[400],
    marginLeft: '30px',
  },
}));

const RuleContainer: React.FC<Rule> = ({ subRules, title }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.rule}>{title}</div>
      {Object.values(subRules).map((subRule) => (
        <div key={`subrule${subRule.title}`} className={classes.subRule}>
          {subRule.title}
        </div>
      ))}
    </>
  );
};

export default RuleContainer;
