import React from 'react';
import { Rule } from '../types';

const RuleContainer: React.FC<Rule> = ({ subRules, title }) => (
  <>
    <div style={{ marginLeft: '20px' }}>{title}</div>
    {Object.values(subRules).map((subRule) => (
      <div key={`subrule${subRule.title}`} style={{ marginLeft: '30px' }}>
        {subRule.title}
      </div>
    ))}
  </>
);

export default RuleContainer;
