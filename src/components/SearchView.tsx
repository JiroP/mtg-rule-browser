import React, { ReactElement, useContext } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

import RulesContext from '../RulesContext';
import { COLORS } from '../constants/colors';

const useStyles = makeStyles((theme) => ({
  rulesRoot: {
    background: COLORS[500],
    borderRadius: '10px',
    marginBottom: theme.spacing(2),
  },
  rule: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
}));

const SearchView: React.FC = (): ReactElement => {
  const classes = useStyles();

  const { search } = useLocation();
  const { rulesArray } = useContext(RulesContext);

  const params = new URLSearchParams(search);
  const value = params.get('value');

  return (
    <>
      <Typography variant="h4">
        Search results for &apos;
        {value}
        &apos;:
      </Typography>
      <div className={classes.rulesRoot}>
        {value
          ? rulesArray
            .filter((rule) => rule.toLowerCase().includes(value.toLowerCase()))
            .map((rule) => (
              <Typography key={`search-${rule}`} className={classes.rule}>
                {rule}
              </Typography>
            ))
          : null}
      </div>
    </>
  );
};

export default SearchView;
