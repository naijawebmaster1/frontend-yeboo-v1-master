import React, { useState } from "react";
import OtpInput from 'react-otp-input';

interface IOtpDto {
  code: any;
  setCode: any
  size?: number
  type?: any
  placeholder?: string
  shouldAutoFocus?:boolean
}

function InputCodeField({ code, setCode, size, type, placeholder, shouldAutoFocus }: IOtpDto) {

  return (
    <div>
      <OtpInput
        value={code}
        onChange={setCode}
        placeholder={placeholder}
        numInputs={size ? size : 6}
        inputStyle={{
          width: '50px',
          height: "50px",
          border: '1px solid #D0D5DD',
          borderColor: '#D0D5DD',
          color: '#D0D5DD',
          borderRadius: " 7px ",
          margin: '5px',
          boxShadow: '4px',
          fontSize: '20px',
        }}
        containerStyle={{
          borderRadius: " 68% /  9%",
        }}
        renderSeparator={<span></span>}
        inputType={type ? type : 'text'}
        shouldAutoFocus={shouldAutoFocus || true}
        renderInput={(props) => <input {...props} />}
      />
    </div>
  )
}

export default InputCodeField
