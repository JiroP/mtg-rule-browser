import React, { ReactElement, useEffect } from 'react';
import axios from 'axios';
import parseRulesToObject from './utils/parseRules';
// import './App.css';

const App: React.FC = (): ReactElement => {
  useEffect(() => {
    const fetchRules: () => Promise<void> = async () => {
      try {
        const resp = await axios.get('http://localhost:3001');
        const rulesObject = parseRulesToObject(resp.data);
      } catch (error) {
        console.error('Error getting rules');
        console.error(error);
      }
    };

    fetchRules();
  }, []);

  return <div>Hello world</div>;
};

export default App;
