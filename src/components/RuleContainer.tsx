import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Rule } from '../types';

const useStyles = makeStyles((theme) => ({
  rule: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  subRule: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
