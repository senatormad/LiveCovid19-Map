import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import Main from './components/MainComponent';
import ConfigureStore from './redux/configureStore';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <div>
        <Main />
      </div>
    </Provider>
  );
}

export default App;
