import React from 'react';
import Button from 'src/components/Button';

const ProfileForm = ({ setIsOpen }) => {



    const test = (e) => {
        e.stopPropagation()
    };
    return (
        <>
            {

                <div
                    onClick={() => setIsOpen()}
                    className='z-50 bg-gray-20 w-full h-full fixed top-0 left-0 flex justify-center items-center'>
                    <form
                        onClick={test}
                        className='text-base font-medium font-main w-[400px] bg-gray-400 p-4 rounded-lg'>

                        <div className='relative mb-7'>
                            <input className='py-3 pl-4 border-[1px] border-solid border-primary_1 rounded-lg w-full outline-none ' type="text" placeholder="La La La" />
                            <input className='py-3 pl-4 border-[1px] border-solid border-primary_1 rounded-lg w-[98px] outline-none absolute top-0 right-0 ' type="year" placeholder="2022" />
                        </div>

                        <div className='flex gap-8 mb-7'>
                            <input className='py-3 pl-4 border-[1px] border-solid border-primary_1 rounded-lg w-[98px] outline-none' type="text" placeholder="04" />
                            <input className='py-3 pl-4 border-[1px] border-solid border-primary_1 rounded-lg w-[98px] outline-none' type="text" placeholder="03" />
                        </div>

                        <div className='relative mb-7'>
                            <input className='py-3 pl-4 border-[1px] border-solid border-primary_1 rounded-lg w-full outline-none ' type="text" placeholder="0912345678" />
                        </div>

                        <div className='relative mb-7'>
                            <input className='py-3 pl-4 border-[1px] border-solid border-primary_1 rounded-lg w-full outline-none ' type="text" placeholder="lalala432@gmail.com" />
                        </div>

                        <div className='relative mb-7'>
                            <input className='py-3 pl-4 border-[1px] border-solid border-primary_1 rounded-lg w-full outline-none ' type="text" placeholder="123!@#$" />
                        </div>

                        <Button
                            title="Lưu thay đổi"
                            className=" bg-black py-2  w-[170px] h-10 rounded-btnB 
                                            font-bold text-base font-main leading-6 text-center tracking-[0.15px] text-white
                                            hover:bg-[#0000] 
                                            hover:text-neutral_1
                                            hover:border-solid
                                            hover:border-[1px]
                                            hover:border-[#000]
                                            "
                            onClick={() => setIsOpen()}
                        />

                    </form>
                </div>

            }
        </>
    )

}

export default ProfileForm;