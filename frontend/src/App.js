import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header';
import FileTable from './components/FileTable';
import ErrorBoundary from './components/common/ErrorBoundary';
import './App.css';

/**
 * Root App component with Redux Provider and Error Boundary
 */
const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <div className="App">
          <Header />
          <FileTable />
        </div>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
