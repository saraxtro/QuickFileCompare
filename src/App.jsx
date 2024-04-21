import React from 'react';
import './App.css';
import DragAndDropComponent from './components/dragNdrop';

function App() {
  return (
      <div className="App">
    <div className="text-center p-4">
        <h1 className="text-3xl font-bold">Quick File Compare Tool</h1>
        <h2 className="text-xl mt-2">
            Compare two files using CRC32 checksum. Drag and drop files into the boxes below to compare them.
            Everything is done client-side, no files are uploaded to any server. You can check the source code 
            <a href="https://github.com/saraxtro/QuickFileCompare" className="text-blue-500 hover:text-blue-700"> here</a>.
        </h2>
    </div>
    <div className="flex justify-center items-center mt-4 mb-4">
        <DragAndDropComponent />
    </div>
</div>

  );
}

export default App;

