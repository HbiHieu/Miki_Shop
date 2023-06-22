import axios from 'axios';
import React from 'react'
import { useRecoilState } from 'recoil';
import AddAndRemoveItems from 'src/components/AddAndRemoveItems';
import { IconXX } from 'src/components/icons';
import { cartState } from 'src/recoils/cartState';

export default function CartItemsList({ items, setItemState }) {

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  })

  const handleDeleteCart = (id) => {
    const newCart = items.filter((item) => item.productId != id);
    setItemState(newCart);
  }

  return (
    <div className='pb-10'>
      <div className='text-2xl font-bold'>Giỏ hàng</div>
      <div className='w-[548px]'>
        {
          items?.map((item, index) => <div
            key={index}
            className='py-12 border-b border-solid border-[#D8D8D8] flex
            p-5 shadow-lg
            '
          >
            <div className='w-[136px] h-[136px] overflow-hidden mr-10'>
              <img src={item?.picture} alt="img" className='object-cover object-center duration-200 hover:scale-125' />
            </div>
            <div className=''>
              <div className='text-xl font-bold'>{item?.name}</div>
              <div className='text-sm text-[#707070] mt-2l;l;l;l;l;'>{`Kích cỡ :${item.size}`}</div>
              <AddAndRemoveItems
                product={item}
                index={index}
                itemState={items}
                setItemState={setItemState}
              />
            </div>
            <div className='flex flex-col justify-between ml-auto'>
              <div className='flex justify-end font-bold'>
                <span
                  className='flex items-center justify-center w-8 h-8 rounded-full hover:bg-neutral_1 hover:text-white hover:cursor-pointer'
                  onClick={() => {
                    handleDeleteCart(item.productId);
                  }}
                >
                  <IconXX
                    className='fill-neutral_1 hover:fill-white'
                  />
                </span>
              </div>
              <div className='text-2xl font-bold text-primary_2'>{formatter.format((item.cost))}</div>
            </div>
          </div>)
        }
      </div>
    </div>
  )
}
