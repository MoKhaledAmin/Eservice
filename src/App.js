import React from 'react';
import { RoutesProvider } from './Routes/RouteProvider';

import './Services/Translation/Translation';

import './App.css';


function App() {
  return (
    <div className="App">
      <React.Fragment>
        <RoutesProvider>
          
        </RoutesProvider>
      </React.Fragment>
    </div>
  ); 
}

export default App;