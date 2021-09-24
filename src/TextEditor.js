import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.css'

function TextEditor({ setBody, lastValue }) {
    const [value, setValue] = useState(lastValue);

    useEffect(() => {
        setBody(value);
    }, [value]);

    const editorModules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'header': [1, 2, 3, 4, 5, 6] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'align': [] }],

            ['link', 'image'],
            ['video', 'clean']
        ],
    };

    return (
        <>
            <ReactQuill placeholder="Type Here..." style={{ border:'2px solid black', borderRadius:'10px' }} value={value} theme="snow" modules={editorModules} onChange={setValue} />
        </>
    );
}

export default TextEditor;