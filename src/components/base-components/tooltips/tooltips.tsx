import React from 'react'
import { Tooltip } from 'react-tooltip'

interface ITooltipsProps {
    anchorSelect: string
    content: string
}

function TooltipsComponent({ anchorSelect, content }: ITooltipsProps) {
    return (
        <div>
            <Tooltip
                anchorSelect={anchorSelect}
                content={content}
                place="bottom"
                className='text-xs bg-wine text-white p-1 rounded-md'
            />
        </div>
    )
}

export default TooltipsComponent