import React, { useContext } from 'react';
import { useParams } from 'react-router';
import RulesContext from '../RulesContext';
import { Rule } from '../types';
import RuleContainer from './RuleContainer';

interface PathParams {
  sectionId: string;
  chapterId: string;
}

const RulesContainer: React.FC = () => {
  const { rulesDict } = useContext(RulesContext);
  const { sectionId, chapterId } = useParams<PathParams>();

  console.log('section', sectionId);
  console.log('chapter', chapterId);

  const rules = rulesDict[sectionId]?.chapters[chapterId]?.rules;

  return (
    <>
      {rules
        ? Object.values(rules).map(({ subRules, title }) => (
          <RuleContainer
            key={`rule-container-${title}`}
            subRules={subRules}
            title={title}
          />
        ))
        : null}
    </>
  );
};

export default RulesContainer;
