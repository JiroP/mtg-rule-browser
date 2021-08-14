import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RuleContainer from './RuleContainer';
import { Rule } from '../types';
import { COLORS } from '../constants/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    background: COLORS[500],
    borderRadius: '10px',
    marginBottom: theme.spacing(2),
  },
  notFoundHeader: {
    color: 'white',
  },
}));

const RulesContainer: React.FC<{ rules: { [key: string]: Rule } }> = ({
  rules,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {rules ? (
        Object.values(rules).map(({ subRules, title }) => (
          <RuleContainer
            key={`rule-container-${title}`}
            subRules={subRules}
            title={title}
          />
        ))
      ) : (
        <Typography className={classes.notFoundHeader} variant="h2">
          Rules not found for the chapter. :(
        </Typography>
      )}
    </div>
  );
};

export default RulesContainer;
