import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorHandlingUi from './components/common/FallbackUi.jsx';


function errorHandler(error,errorInfo){
  console.log('Logging: ',error,errorInfo);
}


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
  <ErrorBoundary FallbackComponent={ErrorHandlingUi} onError={errorHandler}>
    <App />
  </ErrorBoundary>
  </BrowserRouter>
  //</React.StrictMode>, */}
)
