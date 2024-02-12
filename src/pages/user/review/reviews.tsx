import React, { useState } from 'react'
import Header from '../../../components/block-components/header/header'
import YebboBack from '../../../components/base-components/back/yebooBack'
import SelectInputField from '../../../components/block-components/input/selectInputField'
import { AiFillStar } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { TbFileInvoice, TbFlag3 } from 'react-icons/tb'
import { sortBy } from '../../../services/constants/dataConstants'
import RaiseADispute from '../../../components/block-components/modal/raiseDispute'

const groovies = [
    {
        id: '1',
        name: 'Cutie Johnson',
        star: 4.5,
        favorite: 100,
    },
    {
        id: '2',
        name: 'Cutie Johnson',
        star: 4.5,
        favorite: 100,
    },
    {
        id: '3',
        name: 'Cutie Johnson',
        star: 4.5,
        favorite: 100,
    },
    {
        id: '4',
        name: 'Cutie Johnson',
        star: 4.5,
        favorite: 100,
    },
    {
        id: '5',
        name: 'Cutie Johnson',
        star: 4.5,
        favorite: 100,
    },
    {
        id: '6',
        name: 'Cutie Johnson',
        star: 4.5,
        favorite: 100,
    },
    {
        id: '7',
        name: 'Cutie Johnson',
        star: 4.5,
        favorite: 100,
    },
    {
        id: '8',
        name: 'Cutie Johnson',
        star: 4.5,
        favorite: 100,
    },
    {
        id: '9',
        name: 'Cutie Johnson',
        star: 4.5,
        favorite: 100,
    },
    {
        id: '10',
        name: 'Cutie Johnson',
        star: 4.5,
        favorite: 100,
    },
]

function Reviews() {
    const navigate = useNavigate()
    const [dispute, setDispute] = useState(false)
    // const [value, setValue] = useState('');
    // const [editReview, setEditReview] =useState('nil')


    return (
        <div>
            {dispute && (<RaiseADispute open={dispute} setOpen={() => setDispute(!dispute)}  />)}
            <Header />
            <section className='mx-auto max-w-7xl items-center p-6'>
                <h2 className='font-bold my-5 text-xl'>My Grooves</h2>
                <YebboBack
                    title=''
                    screenDetails={['Grooves', 'Reviews']}
                />

                {/* SECTION STARTS HERE */}

                <div className='w-full mt-5 md:mt-10 flex flex-col md:flex-row justify-between '>
                    <div className='w-full bg-white md:mt-5 md:mx-5 md:p-10 p-2'>
                        <div className='flex flex-col md:flex-row justify-between items-center'>
                            <p className='font-bold text-gray-700 md:mb-0 mb-4'>All Reviews</p>

                            <div className='flex justify-start items-center'>
                                <div className='ml-2 -mt-2'>
                                    <SelectInputField data={sortBy} placeholder='Sort by Groove' name={''} onChange={undefined} label={''} />
                                </div>
                            </div>
                        </div>

                        {
                            groovies.map((groovy: any) => (
                                <div key={groovy.id} className='w-full mt-5'>
                                    <div className=''>
                                        <div className="md:mx-1 ml-1 w-full">
                                            <div className='flex justify-between items-center md:m-0 m-2'>
                                                <div>
                                                    <p className=' text-wine text-xs cursor-pointer font-bold'>One Night Stand</p>
                                                </div>
                                                <div className='flex items-center justify-center'>
                                                    <p className='text-xs text-gray-500 flex items-center '>
                                                        <AiFillStar
                                                            color='#FCCF14'
                                                            size={20}
                                                        />
                                                        <p className='ml-1'>4.5<span className='ml-2'>(1,000)</span></p>
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="text-sm font-bold text-gray-600 border-b-2 border-gray-100 py-2">I need a lady for One Night Stand</p>

                                            <div className='py-3 border-b-2 text-charleston text-sm border-gray-100 md:m-0 m-2'>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla varius ultrices. Sed cursus mauris vel neque ultrices, ac malesuada urna fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla varius ultrices. Sed cursus mauris vel neque ultrices, ac malesuada urna fermentum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla varius ultrices. Sed cursus mauris vel neque ultrices, ac malesuada urna fermentum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla varius ultrices. Sed cursus mauris vel neque ultrices, ac malesuada urna fermentum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla varius ultrices. Sed cursus mauris vel neque ultrices, ac malesuada urna fermentum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla varius ultrices. Sed cursus mauris vel neque ultrices, ac malesuada urna fermentum.</p>
                                            </div>


                                            <div className='flex items-center justify-end my-3'>
                                                {/* {
                                                    editReview !== groovy.id && (
                                                        <div
                                                        onClick={() => setEditReview(groovy.id)}
                                                        className='flex items-center cursor-pointer text-[#33BB77] '>
                                                        <TbFileInvoice
                                                            size={30}
                                                            className='shadow-lg p-2 rounded-lg'
                                                        />
                                                        <p className=' text-[#33BB77] text-sm ml-4'>Respond To Review</p>
                                                    </div>
                                                    )
                                                } */}

                                                <div
                                                    // onClick={() => setDeleteGroove(!deleteGroove)}
                                                    onClick = {() => setDispute(!dispute)}
                                                    className='flex items-center text-[#EE4139] ml-4 cursor-pointer'>
                                                    <TbFlag3
                                                        size={30}
                                                        className='shadow-lg p-2 rounded-lg'
                                                    />
                                                    <p className=' text-sm ml-4'>Report Review</p>
                                                </div>
                                            </div>
{/* 
                                            {
                                                editReview === groovy.id && (
                                                    <div >
                                                    <ReactQuill className='h-40 mb-20 mt-3' theme="snow" value={value} onChange={setValue} />
                                                    <button className='py-2 font-bold rounded-md px-5 bg-wine text-white'>
                                                        Submit
                                                    </button>
                                                </div>
                                                )
                                            } */}

                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>


        </div>
    )
}

export default Reviews

