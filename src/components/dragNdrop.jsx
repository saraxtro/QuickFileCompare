import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import crc32 from 'crc-32';

const Dropzone = ({ onDrop, file, index }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, index),
    multiple: false,
    noClick: false,
    noKeyboard: true
  });

  const activeStyle = 'border-blue-500';
  const defaultStyle = 'border-gray-300';

  return (
      <div {...getRootProps()} style={{ cursor: 'pointer' }} className={`dropzone w-64 h-32 flex justify-center items-center p-4 border-2 border-dashed ${isDragActive ? activeStyle : defaultStyle}`}>
    <input {...getInputProps()} />
    {file && <p>{file.name}</p>}
    {!file && <p>{isDragActive ? 'Drop the file...' : 'Drag \'n\' drop file here, or click to select'}</p>}
</div>
  );
};

const DragAndDropComponent = () => {
  const [files, setFiles] = useState([null, null]);
  const [crcValues, setCrcValues] = useState([null, null]);

  const onDrop = useCallback((acceptedFiles, index) => {
    const file = acceptedFiles[0]; // Ensure we are accessing the first file
    if (file instanceof Blob) { // Make sure 'file' is a Blob which is required by readAsArrayBuffer
      setFiles((prevFiles) => {
        const newFiles = [...prevFiles];
        newFiles[index] = file;
        return newFiles;
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        // Convert the result into an ArrayBuffer and calculate the CRC32
        const arrayBuffer = reader.result;
        const crcValue = crc32.buf(new Uint8Array(arrayBuffer)).toString(16);
        setCrcValues((prevCrcValues) => {
          const newCrcValues = [...prevCrcValues];
          newCrcValues[index] = crcValue;
          return newCrcValues;
        });
      };
      reader.readAsArrayBuffer(file);
    }
  }, []);

  const calculateComparison = () => {
    if (crcValues[0] && crcValues[1]) {
      const resultMessage = crcValues[0] === crcValues[1] ? 'Files are equal.' : 'Files are not equal.';
      alert(resultMessage); // Using alert to show the result
    }
  };

  const isButtonDisabled = files[0] === null || files[1] === null || crcValues[0] === null || crcValues[1] === null;

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex justify-around w-full mb-4">
        <Dropzone onDrop={onDrop} file={files[0]} index={0} />
        <Dropzone onDrop={onDrop} file={files[1]} index={1} />
      </div>
      <button 
        onClick={calculateComparison} 
        disabled={isButtonDisabled}
        className={`mt-4 p-2 text-white rounded ${!isButtonDisabled ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
      >
        Calculate
      </button>
    </div>
  );
};

export default DragAndDropComponent;

