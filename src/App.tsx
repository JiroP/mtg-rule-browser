import React, { ReactElement, useEffect } from 'react';
import axios from 'axios';
// import './App.css';

const App: React.FC = (): ReactElement => {
  useEffect(() => {
    const fetchRules: () => Promise<void> = async () => {
      const resp = await axios.get(
        'http://localhost:3001',
      );
      console.log(resp);
    };

    fetchRules();
  }, []);

  return <div>Hello world</div>;
};

export default App;
