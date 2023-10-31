import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorHandlingUi from './components/common/FallbackUi.jsx';
import { Provider } from 'react-redux';
import store from './app/store.js';


function errorHandler(error,errorInfo){
  console.log('Logging: ',error,errorInfo);
}


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
  <ErrorBoundary FallbackComponent={ErrorHandlingUi} onError={errorHandler}>
    <Provider store={store}>
    <App />
    </Provider>
  </ErrorBoundary>
  </BrowserRouter>
  //</React.StrictMode>, */}
)
