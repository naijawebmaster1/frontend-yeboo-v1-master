import React from 'react'
import { ErrorMessage } from "formik";

interface IErrorMsg {
    name: string
}
function ErrorMsg({ name }: IErrorMsg) {
    return (
        <div className="text-wine pt-2 text-xs font-bold text-start text">
            <ErrorMessage name={name} />
        </div>
    )
}

export default ErrorMsg
