import React from 'react'
import { IoCameraReverseSharp } from "react-icons/io5";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { FileUploader } from "react-drag-drop-files";
import userService from '../../services/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getUserDetailsAction } from '../../services/reducers/userReducer.ts/getUserDetailsReducer';


interface IImageComponent {
  media: string,
  handleChanges: any
}

function ImageComponent({ media, handleChanges }: IImageComponent) {
  const fileTypes = ["JPG", "JPEG", "PNG", "PNG"];
  console.log('media', media)
  const { token } = useSelector((state: any) => state.login);

  const dispatch = useDispatch<any>()

  const deleteImageHandler = async (imageSelected: string) => {
    const images = [imageSelected]
    const res = await userService.deleteImage(token, images)
    if (res) {
      toast.success("Image deleted successfully")
      dispatch(getUserDetailsAction({ token }))
      window.location.reload()
    }
  }



  return (
    <div >
      {
        media && media !== 'undefined' ? (
          <div className='h-60'>
            <div className='flex text-wine  p-3  justify-between'>
              <FileUploader
                types={fileTypes}
                multiple
                name="material"
                handleChange={handleChanges}
                children=
                {<> <IoCameraReverseSharp size={30} className='cursor-pointer ' /></>}
              />
              <MdOutlineDeleteSweep
                onClick={() => deleteImageHandler(media)}
                size={30}
                className='cursor-pointer' />
            </div>

            <img alt="" className='rounded-lg contain h-60 w-[200px]  bg-black ' src={`${media}`} />
          </div>
        ) : (
          <>
            <FileUploader
              types={fileTypes}
              multiple
              name="material"
              handleChange={handleChanges}
              children=
              {<div className='h-60 flex flex-col justify-center items-center'>
                <span  >
                  <img src={require('../../assets/images/media.png')} className='w-4 h-4 text-[#949699]' />
                </span>
                <span>
                  <p className='text-[#949699] text-xs font-normal'>
                    <span>Add Image</span>
                  </p>
                </span>
                <span>
                  <p className='text-[8px] font-normal text-[#800020] italic'>
                    <span >Only JPEG/PNG</span>
                  </p>
                </span>

              </div>}
            />
          </>
        )
      }
    </div>
  )
}

export default ImageComponent