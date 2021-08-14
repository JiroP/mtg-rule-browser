import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import RulesContext from '../RulesContext';
import RuleContainer from './RuleContainer';

interface PathParams {
  sectionId: string;
  chapterId: string;
}

const useStyles = makeStyles(() => ({
  notFoundHeader: {
    color: 'white',
  },
}));

const RulesContainer: React.FC = () => {
  const classes = useStyles();

  const { rulesDict } = useContext(RulesContext);
  const { sectionId, chapterId } = useParams<PathParams>();

  const rules = rulesDict[sectionId]?.chapters[chapterId]?.rules;

  return (
    <>
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
    </>
  );
};

export default RulesContainer;
