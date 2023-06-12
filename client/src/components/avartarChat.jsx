import Image from 'next/image'
import React from 'react'
import { IconStar } from './icons'

export default function AvartarChat({src, userName, time, productType}) {
  return (
    <>
      <div className='flex mt-[24px]'>
         <Image src={src} alt='anh' width={54} height={54}/>
         <div className='ml-[15px]'>
            <p className="font-medium text-base">{userName}</p>
            <div className="flex mt-[2px] w-[80px] h-[15px] mr-[8px]">
                  <IconStar fill="#FBBC05" /> <IconStar fill="#FBBC05" /> <IconStar fill="#A9A9A9" />
                  <IconStar fill="#A9A9A9" /> <IconStar fill="#A9A9A9" />
            </div>
         </div>
      </div>
      <div className='flex ml-[68px]'>
         <p>{time}</p> 
         <p className='ml-[4px]'>| Loại sản phẩm:</p>
         <p>{productType}</p>
      </div>
    
    </>
  )
}
