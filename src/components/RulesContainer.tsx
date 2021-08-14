import React from 'react';
import { Rule } from '../types';
import RuleContainer from './RuleContainer';

const RulesContainer: React.FC<{ rules: Rule[] }> = ({ rules }) => (
  <>
    {Object.values(rules).map(({ subRules, title }) => (
      <RuleContainer
        key={`rule-container-${title}`}
        subRules={subRules}
        title={title}
      />
    ))}
  </>
);

export default RulesContainer;
