const GetStarted = () => {
    return (
        <section className="px-5 py-20 bg-[#F2E6E9]">
            <header className="flex flex-col justify-center items-center gap-y-2">
                <span className="">
                    <h2 className="text-4xl font-bold text-[#292D32] text-center"><span className='text-wine'>Get started with Yeboo, </span>it only takes minutes.</h2>
                </span>
                <span>
                    <p className="max-w-[680px] text-center text-[#292D32]  text-base font-normal">
                        At Yeboo, we believe in authentic connections. We encourage open and honest communication, ensuring that you can express your desires and boundaries comfortably. Respect and consent are at the core of our community.                    </p>
                </span>
                <span className='cursor-pointer relative'>
                    <img
                        src={require('../../../assets/images/get.png')}
                        alt="get it on playstore"
                        className=""
                    />
                    <img
                        src={require('../../../assets/images/arrow.png')}
                        alt="get it on playstore"
                        className="absolute z-20 right-[-40px] bottom-5"
                    />
                </span>
            </header>

            <div>
                <p className='text-xs text-center mt-3 '>Apple and the Apple Logo are trademarks of Apple Inc. Google Play <br /> and the Google Play logo are trademarks of Google LLC.</p>
            </div>
            {/* <main className="mt-10 flex justify-center items-center">
                <img src={require('../../../assets/images/Dashboard.png')} alt="dashboard"/>
            </main> */}
        </section>
    )
}
export default GetStarted