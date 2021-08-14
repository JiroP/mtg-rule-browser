import React, { ReactElement, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RulesContext from '../RulesContext';

const SearchView: React.FC = (): ReactElement => {
  const { search } = useLocation();
  const { rulesArray } = useContext(RulesContext);

  const params = new URLSearchParams(search);
  const value = params.get('value');

  if (value) {
    const filteredRules = rulesArray.filter((rule) => rule.includes(value));
    console.log(filteredRules);
  }

  return <div>hei</div>;
};

export default SearchView;
