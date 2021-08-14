import React, { ReactElement, useEffect, useState } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import axios from 'axios';

import parseRulesToObject from './utils/parseRules';
import TableOfContents from './components/TableOfContents';
import { RulesDict } from './types';
import { COLORS } from './constants/colors';
import './App.css';

const useStyles = makeStyles(() => ({
  container: {
    background: COLORS[800],
  },
}));

const App: React.FC = (): ReactElement => {
  const classes = useStyles();

  const [rulesDictionary, setRulesDictionary] = useState<RulesDict>({});
  const [rules, setRules] = useState<string[]>([]);

  useEffect(() => {
    const fetchRules: () => Promise<void> = async () => {
      try {
        const resp = await axios.get('http://localhost:3001');
        const { rulesArray, rulesDict } = parseRulesToObject(resp.data);
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
    <Container className={classes.container}>
      <h1>MTG rule browsing</h1>
      <TableOfContents rulesDict={rulesDictionary} rulesArray={rules} />
    </Container>
  );
};

export default App;
