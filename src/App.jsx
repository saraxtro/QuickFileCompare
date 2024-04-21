import React from 'react';
import './App.css';
import DragAndDropComponent from './components/dragNdrop';

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold">File CRC Comparison Tool</h1>
      <DragAndDropComponent />
    </div>
  );
}

export default App;

