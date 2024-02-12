import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ITextAreaInput{
    value: any
    setValue: any
}
function TextAreaInputField({value, setValue}: ITextAreaInput) {
    return (
        <div>
            <ReactQuill placeholder='Enter a description' className='h-40 mt-3' theme="snow" value={value} onChange={setValue} />
        </div>
    )
}

export default TextAreaInputField
