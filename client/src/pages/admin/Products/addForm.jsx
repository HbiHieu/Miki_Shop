import React, { useState, useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Page from 'src/components/Page';
import { toast } from 'react-toastify';
import uniqid from 'uniqid';
import 'react-toastify/dist/ReactToastify.css';


const stockSchema = yup.object().shape({
    quantity: yup.string().required("*Required"),
    price: yup.number().required("*price is required").typeError("price is required"),
})

const schema = yup.object().shape({
    name: yup.string().required("*Name is require"),
    picture: yup.array().compact().min(1, "*Picture is required").nullable(),
    sale: yup.number().required("*Sale is required").typeError("*Sale is required"),
    desc: yup.string().required("*Description is required"),
    stock: yup.array().min(1, "Size is required").of(
        stockSchema
    ),
    category: yup.string().required("Category is required")
})

export default function AddForm({ currentPro, setCurrentPro, setUpdate }) {


    const { register, handleSubmit, control, setValue, reset, clearErrors, watch, formState: { errors } } = useForm(
        {
            resolver: yupResolver(schema),
            defaultValues: {
                name: currentPro.data.name,
                category: currentPro.data.categoryId,
                stock: currentPro.data.stocks,
                sale: currentPro.data.sale,
                desc: currentPro.data.desc,
            }
        },
    );

    const {
        fields: size_field,
        append: appendSize,
        remove: removeSize,
    } = useFieldArray(
        {
            control,
            name: "stock",
        },
    );

    //handle of picture 
    const [mainPicture, setMainPicture] = useState(currentPro.data.pictures?.[0] || '');
    const [pictures, setPictures] = useState(currentPro.data.pictures?.filter((picture, index) => {
        return index !== 0;
    }) || []);
    console.log(mainPicture);
    console.log('sub pic is', pictures);

    // id anh de xoa
    const [idPic, setIdPic] = useState([]);

    //check xem co thay doi anh hay chua
    const [changePic, setChangePic] = useState(false);

    const [validate, setValidate] = useState(0);

    useEffect(() => {
        size_field.length > 0 && clearErrors('stock')
    }, [size_field])

    console.log(currentPro);

    const onSubmit = async (data) => {
        console.log('Data is..', data)
        try {
            if (currentPro.isEdit) {
                // Xoa anh da upload truoc do khi submit 
                if (idPic.filter((id) => id != undefined).length != 0) {
                    // goi api xoa anh o sever
                    // const resDelte = await axios({
                    //     method: 'POST',
                    //     url: '/api/image/delete',
                    //     data: { files: idPic }
                    // });
                    console.log('Resdata is...', resDelte.data);
                }
                // neu ma la edit 
                console.log('Data is', { ...data, id: currentPro.data._id });
                //upload anh chinh 
                var mainpic = mainPicture
                // kiem tra xem anh chinh co bi sua khong 
                if (typeof mainpic == 'string') {
                    const resPic = await axios({
                        method: 'POST',
                        url: '/api/image/upload',
                        data: { file: mainpic }
                    })
                    mainpic = resPic?.data;
                }

                // loc ra nhung anh da day len sever va chua day len sever
                const picCvCloud = pictures.filter((pic) => typeof pic == 'object');
                const picNoneCvCloud = pictures.filter((pic) => typeof pic == 'string');

                //upload nhung anh chua day len sever
                const resPic = await axios({
                    method: 'POST',
                    url: '/api/image/upload',
                    data: { files: picNoneCvCloud }
                });
                console.log(picCvCloud, picNoneCvCloud);
                console.log(resPic?.data?.result);
                //setPictures([...picCvCloud, ...resPic?.data?.result]);
                const resData = await axios({
                    method: 'POST',
                    url: '/api/products/update',
                    data: { ...data, picture: [mainpic, ...picCvCloud, ...resPic?.data?.result], id: currentPro.data._id }
                });
                setUpdate((prev) => !prev);
            } else {
                // console.log('Data add is..', data);
                //tao moi product
                const minPrice = data.stock[0].price;
                const stock = data.stock.map((item) => {
                    if (item.price < minPrice) minPrice = item.price;
                    return {
                        sizeId: parseInt(item.size),
                        quantity: parseInt(item.quantity),
                        price: item.price
                    }
                });
                const productId = uniqid();
                const productToAdd = {
                    id: productId,
                    name: data.name,
                    categoryId: parseInt(data.category),
                    stock: stock,
                    sale: data.sale,
                    desc: data.desc,
                    minPrice,
                }
                const resData = await axios({
                    method: 'POST',
                    url: 'https://localhost:7226/api/Products',
                    data: productToAdd,
                })
                console.log(resData);
                // //neu la them moi
                const images = [mainPicture, ...pictures].map((item, index) => {
                    return {
                        url: item,
                        productId,
                        index,
                    }
                });
                console.log(images);
                const resPic = await axios({
                    method: 'POST',
                    url: 'https://localhost:7226/api/Images',
                    data: images,
                    // data la anh o dang base 64
                });
                console.log(resPic);
                // anh cloudiary
                // setProducts((prev) => {
                //         return [...prev, resData.data];
                //     })
                setUpdate((prev) => !prev);
                //setMainPicture('');
                //setPictures([]);
                //reset()
            }
            notify(currentPro.isEdit);
        }
        catch (ex) {
            console.log(ex);
        }
    }

    // chuyen doi anh thanh base64 co phan biet anh chinh anh phu
    function getBase64(file, location) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            if (location == 'main') {
                const picMainConvertB64 = reader.result
                //console.log('PicmainConvertBase64 is ', picMainConvertB64);
                setChangePic(true);
                setMainPicture(picMainConvertB64);
            }
            else {

                const picConvertB64 = reader.result
                // console.log('PicSubConvertBase64 is ', picConvertB64);
                setPictures(
                    (prev) => [...prev, picConvertB64]
                )
                setChangePic(true);
            }
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    //xoa anh chinh dua id da xoa vao 1 mang 
    //anh chua dc upload len sever se khong co id => xoa khong goi api , chi la thao tac tren client
    const handleDeleteMain = () => {
        (idPic.includes(currentPro.data.picture?.[0]?._id) ? null : setIdPic((prev) => [...prev, currentPro.data.picture?.[0]._id]))
        console.log(idPic);
        setMainPicture([]);
    }

    //thay doi anh chinh
    const handleChangeMainPicture = (link) => {
        getBase64(link, 'main');
    }

    //thay doi anh phu
    const handleChangePicture = (e) => {
        const file = e.target.files[0];
        getBase64(file, 'sub');
        e.target.value = null;
    }

    //xoa anh phu , dua id vao 1 mang 
    const handleDelete = (indexDelete) => {
        (idPic.includes(currentPro.data.picture?.[indexDelete + 1]?._id) ? null : setIdPic((prev) => [...prev, currentPro.data.picture?.[indexDelete + 1]?._id]));
        setPictures((prev) => {
            const newListPic = prev.filter((picture, index) => {
                return index !== indexDelete;
            });
            return newListPic;
        })
    }


    const notify = (edit) => {
        (
            (validate > 0 || watch('name'))
            &&
            (
                errors
                && Object.keys(errors).length === 0
                && Object.getPrototypeOf(errors) === Object.prototype
            )
            &&
            (toast.success(edit ? "Edit success" : "Add success", {
                position: toast.POSITION.TOP_RIGHT
            }))
        )
    }

    return (
        <div
            className='fixed flex top-0 bottom-0 left-0 right-0 bg-[#00000099]'
            onClick={
                () => setCurrentPro(prev => ({ ...prev, modalOpen: false }))
            }
        >
            {/* start add */}
            <div className='p-5 w-[60%] mx-auto h-[500px]' onClick={
                (e) => e.stopPropagation()
            }>
                <Page
                    data={{
                        title: 'Add Product',
                        description: '',
                        url: '',
                        thumbnailUrl: '',
                    }}
                />
                <div className='flex items-center bg-white'>
                    <button
                        className='p-2 font-bold text-blue-400 border-blue-400 border-solid rounded-lg hover:opacity-80'
                        onClick={
                            () => setCurrentPro(prev => ({ ...prev, modalOpen: false }))
                        }
                    >Quay lại</button>
                </div>
                <form
                    onSubmit={
                        handleSubmit(onSubmit)
                    }
                    className='bg-white '>
                    <div className='font-bold text-blue-400 bg-[#ccd1e3] px-4 h-11 leading-10 border-b-[1px] border-gray-400'>
                    </div>
                    <div className='p-4 overflow-y-scroll h-[500px]'>
                        <div className='grid grid-cols-12 rounded-md border-[1px] border-solid border-[#ccc]'>
                            <div className='bg-[#e7edf1] col-span-2 w-[130px] text-sm p-2'>Tên sản phẩm</div>
                            <input className='col-span-10 leading-9'
                                type='text'
                                name="name"
                                {...register("name")}
                            />
                        </div>
                        <p className="text-[#D2311B] text-base font-medium h-5">
                            {errors.name?.message}
                        </p>
                        {/* Category */}
                        <div>
                            {/* {...register("category")} */}
                            {/* className='p-2 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 mr-2' */}
                            <p className='my-3 text-xl font-bold'>Thể loại</p>
                            <select className='p-2 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 mr-2'  {...register("category")} placeholder='Size'>
                                <option value="14">dây chuyền</option>
                                <option value="15">nhẫn</option>
                                <option value="16">lắc</option>
                                <option value="17">bông tai</option>
                            </select>
                        </div>
                        <p className="text-[#D2311B] text-base font-medium h-5">
                            {errors.category?.message}
                        </p>
                        {/* Ảnh */}

                        <div className='text-[#333] my-3 text-xl font-bold'>Ảnh Chính</div>
                        <div className='inline-block  ml-[19px] relative'>
                            <input id='mainpic'
                                className='hidden'
                                type="file"
                                {...register("picture", {
                                    onChange: (e) => {
                                        handleChangeMainPicture(e.target.files[0]);
                                    }
                                })}
                            />
                            <label htmlFor='mainpic' className='absolute top-0 bottom-0 left-0 right-0'></label>
                            <img src={mainPicture.url || mainPicture} alt="ADD PICTURE" className='w-[150px] h-[150px] object-contain object-center border-dashed border-blue-500 border-[2px]' />
                        </div>
                        <div
                            className='mt-2 mr-[978px] text-center text-blue-500 cursor-pointer hover:opacity-60 ml-7'
                            onClick={
                                () => {
                                    handleDeleteMain()
                                }
                            }
                        >Xóa</div>

                        <p className="text-[#D2311B] text-base font-medium h-5">
                            {errors.picture?.message}
                        </p>

                        <div className='text-[#333] my-3 text-xl font-bold'>Ảnh Phụ</div>
                        <div className='flex flex-wrap items-center'>
                            {
                                pictures?.map((picture, index) => {
                                    return (
                                        <div key={picture._id || index} className='w-[150px] mx-4'>
                                            <img src={picture.url || picture} alt="ADD PICTURE" className='w-[150px] h-[150px] object-contain object-center border-dashed border-blue-500 border-[2px]' />
                                            <div
                                                className='mt-2 text-center text-blue-500 cursor-pointer hover:opacity-60'
                                                onClick={
                                                    () => {
                                                        handleDelete(index)
                                                    }
                                                }
                                            >Xóa</div>
                                        </div>
                                    )
                                })
                            }
                            {
                                (pictures.length < 3 &&
                                    (<label className='p-3 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 ml-3 cursor-pointer'>
                                        <input
                                            type="file"
                                            onChange={
                                                handleChangePicture
                                            }
                                            className='hidden' />
                                        Add Picture
                                    </label>)
                                )
                            }
                        </div>
                        {/* SIZE */}
                        <div>
                            <p className='text-[#333] my-3 text-xl font-bold'>Size</p>
                            <button type='button'
                                className='ml-4 p-2 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 mb-5'
                                onClick={
                                    () => {
                                        appendSize({})
                                    }
                                }>Add Size</button>
                            <div className='ml-4'>
                                {
                                    size_field?.map(({ id }, index) => {
                                        return (
                                            <div className='p-3 my-4 drop-shadow-xl border-[1px] border-blue-400' key={id}>
                                                <div>
                                                    <p className='my-3 text-xl font-bold text-blue-400'>Size</p>
                                                    <select className='p-2 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 mb-5 mr-2' {...register(`stock[${index}].size`)} placeholder='Size'>
                                                        <option value="1">16</option>
                                                        <option value="2">17</option>
                                                        <option value="3">18</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <p className='my-3 text-xl font-bold text-blue-400'>Số lượng</p>
                                                    <input className='p-2 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 mr-2' type="text" {...register(`stock[${index}].quantity`)} placeholder='Quantity' />
                                                </div>
                                                <p className="text-[#D2311B] mb-5 text-base font-medium h-5">

                                                    {errors.stock?.[index]?.quantity?.message}

                                                </p>
                                                <div>
                                                    <p className='my-3 text-xl font-bold text-blue-400'>Giá bán</p>
                                                    <input className='p-2 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 mr-2' type="number" onWheelCapture={e => { e.currentTarget.blur() }} {...register(`stock[${index}].price`)} placeholder='Cost' />
                                                </div>
                                                <p className="text-[#D2311B] mb-5 text-base font-medium h-5">

                                                    {errors.stock?.[index]?.price?.message}

                                                </p>
                                                <button className='p-2 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 mb-5' type='button' onClick={
                                                    () => {
                                                        removeSize(index);
                                                    }
                                                }>Remove Size</button>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <p className="text-[#D2311B] text-base font-medium h-5">
                                {errors.stock?.message}
                            </p>
                        </div>
                        <div>
                            <div className='grid grid-cols-12 rounded-md border-[1px] border-solid border-[#ccc] my-2'>
                                <div className='bg-[#e7edf1] col-span-1 text-sm p-2'>Sale</div>
                                <input
                                    type="number"
                                    className='col-span-11 pl-2 leading-9'
                                    {...register("sale")}
                                    onWheelCapture={e => { e.currentTarget.blur() }}
                                />
                            </div>
                            <p className="text-[#D2311B] text-base font-medium h-5">
                                {errors.sale?.message}
                            </p>
                        </div>
                        <div>
                            <p className='text-[#333] my-3 text-xl font-bold'>Mô tả</p>
                            <textarea rows={'10'} {...register("desc")} className='w-[100%] border-[1px] border-gray-500'>
                            </textarea>
                        </div>
                        <p className="text-[#D2311B] text-base font-medium h-5">
                            {errors.desc?.message}
                        </p>
                    </div>
                    <div className='text-center bg-white'>
                        <button
                            className='p-2 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 mb-5'
                            onClick={
                                () => {
                                    // data picture giu nguyen khi ma khong co anh xoa , dang trong trang thai edit va chua thay doi , neu khong thi luu data picture moi
                                    setValue("picture", (
                                        (idPic.length == 0 && currentPro.isEdit == true && changePic == false) ? currentPro.data.picture : [mainPicture, ...pictures]
                                    ))
                                    setValidate(validate + 1);
                                }
                            }
                        >{currentPro.isEdit ? "Cập nhật" : "Thêm mới"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
