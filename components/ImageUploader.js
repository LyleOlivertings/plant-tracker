import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ImageUploader({ onImageUpload }) {
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      onImageUpload(reader.result);
    };
    
    reader.readAsDataURL(file);
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: 'image/*',
    multiple: false
  });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here...</p>
      ) : (
        <p>Drag & drop plant image here, or click to select</p>
      )}
    </div>
  );
}