import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import parseRulesToObject from './utils/parseRules';
import { Section } from './types';
import TableOfContents from './components/TableOfContents';
// import './App.css';

const App: React.FC = (): ReactElement => {
  const [tableOfContents, setTableOfContents] = useState<Section[]>([]);
  const [rules, setRules] = useState<string[]>([]);

  useEffect(() => {
    const fetchRules: () => Promise<void> = async () => {
      try {
        const resp = await axios.get('http://localhost:3001');
        const { rulesData, tableOfContentsData } = parseRulesToObject(
          resp.data,
        );
        setTableOfContents(tableOfContentsData);
        setRules(rulesData);
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
        tableOfContentsData={tableOfContents}
        rulesData={rules}
      />
    </>
  );
};

export default App;
