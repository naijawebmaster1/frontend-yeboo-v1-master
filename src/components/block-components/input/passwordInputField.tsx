import React from 'react'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import InputField from './inputField';


interface IPasswordInputField {
    name: string;
    id: string,
    label: string,
    value: string,
    onChange: any,
    showPassword: boolean,
    onBlur: any,
    error?: string,
    placeholder: string
    setShowPassword: any
}

function PasswordInputField({ onBlur, onChange, setShowPassword, error, showPassword, value, placeholder }: IPasswordInputField) {
    return (
        <div className="w-full relative flex items-center min-w-full max-w-full ">
            <div className="w-full min-w-full max-w-full">
                <InputField
                    label='Password'
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={error}
                    placeholder={placeholder}
                />
            </div>

            <div className="absolute right-5 bottom-3 cursor-pointer z-50">
                {
                    showPassword ? (
                        <AiFillEyeInvisible
                            onClick={setShowPassword}
                            size={20}
                        />
                    ) : (
                        <AiFillEye
                            onClick={setShowPassword}
                            size={20}
                        />
                    )
                }

            </div>
        </div>
    )
}

export default PasswordInputField
