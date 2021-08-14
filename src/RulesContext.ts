import { createContext } from 'react';
import { RuleContents } from './types';

const RulesContext = createContext<RuleContents>({
  rulesArray: [],
  rulesDict: {},
});

export default RulesContext;
