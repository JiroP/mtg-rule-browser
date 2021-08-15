import React, {
  ReactElement, useEffect, useMemo, useState,
} from 'react';
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import {
  Link, Route, Switch, useHistory,
} from 'react-router-dom';
import axios from 'axios';

import RulesContext from './RulesContext';
import parseRulesToObject from './utils/parseRules';
import TableOfContents from './components/TableOfContents';
import SearchBar from './components/SearchBar';
import SearchView from './components/SearchView';
import ChapterPage from './components/ChapterPage';
import { RulesDict } from './types';
import { COLORS } from './constants/colors';

const useStyles = makeStyles((theme) => ({
  container: {
    background: COLORS[800],
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(2),
    marginTop: theme.spacing(1),
    borderRadius: '10px',
  },
  appBar: {
    background: COLORS[500],
  },
  homeButton: {
    marginRight: theme.spacing(2),
  },
  title: {},
}));

const App: React.FC = (): ReactElement | null => {
  const classes = useStyles();

  const theme = useMemo(
    () => createTheme({
      palette: { type: 'dark' },
    }),
    [],
  );

  const history = useHistory();

  const [rulesDictionary, setRulesDictionary] = useState<RulesDict>({});
  const [rules, setRules] = useState<string[]>([]);

  const handleSearch = (text: string): void => {
    if (text) {
      history.push(`/search?value=${text}`);
    }
  };

  useEffect(() => {
    const fetchRules: () => Promise<void> = async () => {
      try {
        const resp = await axios.get('/api/mtg');
        const { rulesArray, rulesDict } = parseRulesToObject(resp.data);
        setRulesDictionary(rulesDict);
        setRules(rulesArray);
      } catch (error) {
        // console.error('Error getting rules');
        // console.error(error);
      }
    };

    fetchRules();
  }, []);

  if (!rules.length) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Link to="/">
              <Button className={classes.homeButton}>Home</Button>
            </Link>
            <Typography variant="h6" className={classes.title}>
              Magic the gathering rules browser
            </Typography>
            <SearchBar handleSearch={handleSearch} />
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Container className={classes.container}>
          <RulesContext.Provider
            value={{ rulesArray: rules, rulesDict: rulesDictionary }}
          >
            <Switch>
              <Route path="/:sectionId/:chapterId">
                <ChapterPage />
              </Route>
              <Route path="/search">
                <SearchView />
              </Route>
              <Route exact path="/">
                <TableOfContents
                  rulesDict={rulesDictionary}
                  rulesArray={rules}
                />
              </Route>
            </Switch>
          </RulesContext.Provider>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
