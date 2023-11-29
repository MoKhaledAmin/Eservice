import React, {Suspense} from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { MasterStore } from './Services/MasterStore/MasterStore';


// Store Provider
import { Provider } from 'react-redux';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'boxicons/css/boxicons.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <Provider store={MasterStore}>
      <Suspense>
      <BrowserRouter basename={"/"}>
        <App />
      </BrowserRouter>
      </Suspense>
    </Provider>
  </React.Fragment>
);

reportWebVitals();
