import React from 'react';

import './App.css';
import Form from '../components/Form/Form';
// import CodeTriangle from '../components/CodeTriangle/CodeTriangle';

const App: React.FC = () => {

  return (
    <div className="app">
      <h1 className='title'>Генерация PDF с визитками</h1>
      {/* <CodeTriangle /> */}
      <Form />
    </div>
);
};

export default App;