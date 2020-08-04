import React from 'react';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
import store from './store/index';
import Routers from './pages/routers/routers'

function App(){
  return(
    <Provider store={store}>
      <Routers />
    </Provider>
  )
}

export default App
