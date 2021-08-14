import React, { ReactElement, useEffect, useState } from 'react';
import './App.css';
import { Container, makeStyles } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import RulesContext from './RulesContext';
import parseRulesToObject from './utils/parseRules';
import TableOfContents from './components/TableOfContents';
import { RulesDict } from './types';
import { COLORS } from './constants/colors';
import RulesContainer from './components/RulesContainer';

const useStyles = makeStyles(() => ({
  container: {
    background: COLORS[800],
  },
}));

const App: React.FC = (): ReactElement | null => {
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

  if (!rules.length) {
    return null;
  }

  return (
    <Container className={classes.container}>
      <RulesContext.Provider
        value={{ rulesArray: rules, rulesDict: rulesDictionary }}
      >
        <Switch>
          <Route path="/:sectionId/:chapterId">
            <RulesContainer />
          </Route>
          <Route exact path="/">
            <h1>MTG rule browsing</h1>
            <TableOfContents rulesDict={rulesDictionary} rulesArray={rules} />
          </Route>
        </Switch>
      </RulesContext.Provider>
    </Container>
  );
};

export default App;
