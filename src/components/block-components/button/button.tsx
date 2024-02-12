import { CheckCircleIcon } from '@heroicons/react/20/solid'

interface IButton {
  text: string,
  onClick: any,
  backgroundColor: string
  textColor: string
  icon: any
}
export default function Button({text, onClick, backgroundColor, textColor, icon}: IButton) {

  return (
    <>
      <button
      onClick={() => onClick()} 
        type="button"
        style={{
          backgroundColor: backgroundColor,
          color: textColor
        }}
        className="inline-flex text-center w-full justify-center items-center gap-x-2 rounded-md px-4 py-2 md:text-base text-sm font-semibold shadow-sm hover:bg-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {text}
        <div className="-mr-0.5 h-5 w-5" aria-hidden="true" >
          {icon}
        </div>
      </button>
    </>
  )
}