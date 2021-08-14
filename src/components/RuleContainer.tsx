import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Rule } from '../types';

const useStyles = makeStyles(() => ({
  rule: {
    background: '#BDBDBD',
    marginLeft: '20px',
  },
  subRule: {
    background: '#EEEEEE',
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
