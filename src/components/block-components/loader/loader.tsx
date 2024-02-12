import React from 'react'

function Loader() {
  return (
    <div className='flex flex-1 w-screen h-screen justify-center items-center'>
      
      <img
        alt=""
        className=''
        src={require('../../../assets/gif/yeboo_loading.gif')}
      />
      {/* <Hearts 
  height="200"
  width="200"
  color="#B11226"
  ariaLabel="hearts-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/> */}
    </div>
  )
}

export default Loader
