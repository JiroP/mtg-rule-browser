import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import parseRulesToObject from './utils/parseRules';
import { RulesDict } from './types';
import TableOfContents from './components/TableOfContents';
// import './App.css';

const App: React.FC = (): ReactElement => {
  const [rulesDictionary, setRulesDictionary] = useState<RulesDict>({});
  const [rules, setRules] = useState<string[]>([]);

  useEffect(() => {
    const fetchRules: () => Promise<void> = async () => {
      try {
        const resp = await axios.get('http://localhost:3001');
        const { rulesArray, rulesDict } = parseRulesToObject(
          resp.data,
        );
        setRulesDictionary(rulesDict);
        setRules(rulesArray);
      } catch (error) {
        console.error('Error getting rules');
        console.error(error);
      }
    };

    fetchRules();
  }, []);

  return (
    <>
      <h1>Hello world</h1>
      <TableOfContents
        rulesDict={rulesDictionary}
        rulesArray={rules}
      />
    </>
  );
};

export default App;
