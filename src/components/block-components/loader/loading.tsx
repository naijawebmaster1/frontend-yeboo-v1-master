import { RotatingLines } from  'react-loader-spinner'

function LoadingState() {
    return (
        <div className='flex justify-center items-center mt-10'>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    )
}

export default LoadingState