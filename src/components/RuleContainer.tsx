import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
      <Typography className={classes.rule}>{title}</Typography>
      {Object.values(subRules).map((subRule) => (
        <Typography key={`subrule${subRule.title}`} className={classes.subRule}>
          {subRule.title}
        </Typography>
      ))}
    </>
  );
};

export default RuleContainer;
