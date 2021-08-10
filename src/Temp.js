import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Temp() {
  const [value, setValue] = useState('');

  return (
      <>
    <ReactQuill theme="snow" value={value} onChange={setValue}/>
    <p>{value}</p>
    </>
  );
}

export default Temp;