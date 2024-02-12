import { useState } from 'react'
import { FileUploader } from "react-drag-drop-files";
import { FaArrowRight, FaCrown, FaVideo } from 'react-icons/fa';
import ImageComponent from './imageComponent';



interface IProfileImages {
  activeTab: string,
  info: any,
  upgradeVIP: boolean,
  setUpgradeVip: (value: boolean) => void,
  handleChanges: any
}
function ProfileImages({ activeTab, info, upgradeVIP, setUpgradeVip, handleChanges }: IProfileImages) {
  const [media, setMedia] = useState<any>(info?.images)
  const fileTypes = ["JPG", "JPEG", "PNG", "PNG"];

  console.log('media', media)
  console.log('info', info)



  return (
    <div className={`editInfoMedia ${activeTab === 'media' ? 'active' : ''}`}>
      <p className="profileInfoTitle">Upload Media</p>

      <div className="uploadGroup">

        {
          info?.images && (
            <div className="w-full flex flex-col md:flex-row justify-around items-center border border-dashed md:gap-0 gap-5">
              <ImageComponent
                handleChanges={handleChanges}
                media={`${media[0]}`} />
              <ImageComponent
                handleChanges={handleChanges}
                media={`${media[1]}`} />
              <ImageComponent
                handleChanges={handleChanges}
                media={`${media[2]}`} />
              <ImageComponent
                handleChanges={handleChanges}
                media={`${media[3]}`} />
              <ImageComponent
                handleChanges={handleChanges}
                media={`${media[4]}`} />
              <ImageComponent
                handleChanges={handleChanges}
                media={`${media[5]}`} />
            </div>
          )
        }
        <div>
          {info?.isVip?.status ? (
              <div
                className="w-[490px] bg-[#F9FAFB] flex flex-col items-center justify-center cursor-pointer my-20
                      gap-y-3 border border-dashed rounded-md py-4 px-6"
              >
                <button
                  onClick={() => setUpgradeVip(!upgradeVIP)}
                  type="button"
                  className="h-[18px] bg-[#FFD101] flex justify-between items-center gap-x-2 p-4 rounded outline-none text-xs font-normal"
                > <FaCrown /> Upgrade To VIP <FaArrowRight /></button>
              </div>
            ) : (
              <FileUploader
                types={fileTypes}
                multiple
                name="material"
                handleChange={handleChanges}
                children={<>
                  <span
                    className="h-[18px] bg-[#FFD101] flex justify-between items-center gap-x-2 p-4 rounded outline-none text-xs font-normal mt-20"
                  > <FaCrown /> Upload Video <FaArrowRight /></span>
                </>}
              />)
          }
        </div>
      </div>
    </div>
  )
}

export default ProfileImages

const MediaComponent = (media: any) => {

  return (
    <div className="w-[200px] flex flex-col justify-center items-center border border-dashed gap-y-1 ">
      {
        media ? (
          <div className='h-60'>
            <img alt="" className='rounded-lg cover' src={media} />
          </div>
        ) : (
          <>
            <span>
              <img src={require('../../assets/images/media.png')} className='w-4 h-4 text-[#949699]' />
            </span>
            <span>
              <p className='text-[#949699] text-xs font-normal'>
                <a href="#">Add Image</a>
              </p>
            </span>
            <span>
              <p className='text-[8px] font-normal text-[#800020] italic'>
                <span >Only JPEG/PNG</span>
              </p>
            </span>
          </>
        )
      }
    </div>
  )
}