import axios from 'axios';
import { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import MainAdLayout from '../mainAdLayout';
import AddForm from './addForm';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import SortProductsAd from './SortProductsAd';
import { axiosClient } from 'src/utils/axios';

Product.getLayout = (page) => <MainAdLayout>{page}</MainAdLayout>;

export default function Product() {
    const [currentPro, setCurrentPro] = useState({
        data: {},
        isEdit: false,
        modalOpen: false,
    });
    const [update, setUpdate] = useState(false);

    //Sate of page product ( option , checkbox )
    const [option, setOption] = useState('');

    const [checkPro, setCheckPro] = useState([]);

    const handleChangeCheckPro = (e) => {
        const id = e.target.id;
        setCheckPro((prev) =>
            prev?.includes(id) ? prev?.filter((item) => item != id) : [...prev, id],
        );
    };

    //func of addProduct (delete and add)
    const notify = () => {
        toast.success('Remove success', {
            position: toast.POSITION.TOP_RIGHT,
        });
    };

    const handleApplyOptions = async () => {
        if (option == 'Xóa') {
            try {
                const imagesToDelete = currentProductPage.map((item) => item.pictures.filter(picture => checkPro.includes(picture.productId))).flat();
                await axiosClient({
                    method: 'DELETE',
                    url: 'http://miki-shop.somee.com/api/Images/delete',
                    data: imagesToDelete,
                });
                const resDeleteProduct = await axiosClient({
                    method: 'DELETE',
                    url: 'http://miki-shop.somee.com/api/Products/delete',
                    data: checkPro,
                });
                notify();
                setCurrentProductPage((prev) => prev.filter((item) => !checkPro.includes(item.id)));
                setCheckPro([]);
            }
            catch (ex) {
                console.log(ex);
            }
        }
    };

    //handle of Add

    const handleAddProduct = () => {
        setCurrentPro({
            data: {},
            isEdit: false,
            modalOpen: true,
        })
    }

    //handle of detailBtn

    const handleDetail = (product) => {
        setCurrentPro({
            data: product,
            isEdit: true,
            modalOpen: true,
        });
    }

    //State of paginate 

    const [pageCount, setPageCount] = useState(null);
    const [page, setPage] = useState(1);
    const [currentProductPage, setCurrentProductPage] = useState(null)
    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    }
    const handleActivePage = (e) => {
        console.log(e);
    }

    // state of Sort 
    const [sort, setSort] = useState('name&order=asc');

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const res = await axios({
                method: 'GET',
                url: `http://miki-shop.somee.com/api/Products?page=${page}&sortBy=${sort}`,
            });
            const { data, pagination } = res.data;
            const { _page, _limit, _totalRows } = pagination;
            //setPagination(pagination);
            //số trang
            setPageCount(Math.ceil(_totalRows / _limit));
            //setProducts(products);
            res.data.data.forEach(product => {
                product.pictures.sort((a, b) => { return a.index - b.index });
            });
            setCurrentProductPage(data);
        }
        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [page, sort, update])

    const tableToolbar = [
        {
            style: "pr-5 text-sm",
            label: "ID"
        }, {
            style: "pr-8 w-[140px] text-sm",
            label: "Ảnh"
        }, {
            style: "pr-8 w-[200px] text-sm",
            label: "Tên"
        }, {
            style: "pr-8 text-sm w-[150px]",
            label: "Thể loại"
        }, {
            style: "pr-8 text-sm",
            label: "Size"
        }, {
            style: "pr-8 text-sm",
            label: "Số lượng"
        }
        ,
        {
            style: "pr-8 text-sm",
            label: " Chi tiết"
        },


        // <th className='pr-8 w-[200px] text-sm font-bold pl-5 bg-[#514943] text-white border-l border-[#87807c]'>Tên</th>
        // <th className='pr-8 text-sm w-[150px] font-bold pl-5 bg-[#514943] text-white border-l border-[#87807c]'>Thể loại</th>
        // <th className='pr-8 text-sm font-bold pl-5 bg-[#514943] text-white border-l border-[#87807c]'>Size</th>
        // <th className='pr-8 text-sm font-bold pl-5 bg-[#514943] text-white border-l border-[#87807c]'>Số lượng</th>
        // <th className='pr-8 text-sm font-bold pl-5 bg-[#514943] text-white border-l border-[#87807c] w-[150px]'>Màu sắc</th>
        // <th className='pr-8 text-sm font-bold pl-5 bg-[#514943] text-white border-l border-[#87807c] w-[100px]'>Giá</th>
        // <th className='pr-8 text-sm font-bold pl-5 bg-[#514943] text-white border-l border-[#87807c]'>Chi tiết</th>

    ]

    const category = ["Dây chuyền", "Nhẫn", "Lắc", "Bông tai"];

    return (
        <div className='m-5 bg-white'>
            <Page
                data={{
                    title: 'Miki Shop Admin Product',
                    description: '',
                    url: '',
                    thumbnailUrl: '',
                }}
            />
            <div className='p-3 font-bold text-blue-300 border-b-[1px] border-solid border-[#ccc]'>Sản phẩm</div>
            <div className='flex justify-between'>
                <div>
                    <select name="" id=""
                        className='p-1 rounded-md border-[1px] border-gray-600 ml-3'
                        onChange={
                            (e) => setOption(e.target.value)
                        }
                    >
                        <option value="--Hành Động--">--Hành Động--</option>
                        <option className='p-6 ml-2' value="Xóa">Xóa</option>
                    </select>
                    <button
                        className='p-1 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 ml-3'
                        onClick={handleApplyOptions}
                    >Áp dụng</button>
                </div>
                <SortProductsAd
                    setPage={setPage}
                    setSortOption={setSort}
                    productSort={setCurrentProductPage}
                />
            </div>
            <table className='m-3'>
                <tbody>
                    <tr>
                        <th className='pr-5 text-sm font-bold pl-5 bg-[#514943] text-white'></th>
                        {tableToolbar.map((item, index) => (
                            <th key={index} className={`${item.style} font-bold pl-5 bg-[#514943] text-white border-l border-[#87807c]`}>{item.label}</th>
                        ))}
                    </tr>
                    {
                        currentProductPage?.map((product, index) =>
                        (
                            <tr className={index % 2 == 1 ? 'bg-[#ccc]' : 'bg-white'} key={product.id}>
                                <td className='border-l border-b border-[#87807c] text-center'>
                                    <input
                                        type="checkbox"
                                        id={product.id}
                                        onChange={
                                            handleChangeCheckPro
                                        } />
                                </td>
                                <td className={`border-l border-b border-[#87807c] text-center`}>{(page - 1) * 10 + index + 1}</td>
                                <td className='w-[100px] h-[100px] text-sm font-bold border-l border-b border-[#87807c] '>
                                    <div className='w-[70px] h-[70px] m-auto border-[1px] border-[#ccc]'>
                                        <img src={product.pictures?.[0].url} className='object-contain object-center h-[70px] w-[70px]' />
                                    </div>
                                </td>
                                <td className='border-l border-b border-[#87807c] text-center'>
                                    {product.name}
                                </td>
                                <td className='border-l border-b border-[#87807c] text-center'>
                                    {category[product.categoryId - 14]}
                                </td>
                                <td className='border-l border-b border-[#87807c] text-center'>
                                    {
                                        product?.stocks?.map((stock) => {
                                            const size = [16, 17, 18]
                                            return size[stock.sizeId - 1];
                                        }).join(', ')
                                    }
                                </td>
                                <td className='border-l border-b border-[#87807c] text-center'>
                                    {
                                        product?.stocks?.reduce((total, category) => {
                                            return total + category.quantity;
                                        }, 0)
                                    }
                                </td>
                                <td className='border-l border-b border-[#87807c] text-center border-r'>
                                    <button
                                        className='p-1 text-white bg-blue-400 rounded-lg'
                                        onClick={() => handleDetail(product)}
                                    >Chi tiết</button>
                                </td>
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>
            <div className='flex justify-between pb-6'>
                <div
                    className='p-3 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 ml-3 cursor-pointer'
                    onClick={
                        handleAddProduct
                    }
                >Add Product
                </div>
                {/* ADD PRODUCT */}
                {
                    currentPro.modalOpen
                        ?
                        <AddForm currentPro={currentPro}
                            setCurrentPro={setCurrentPro}
                            setUpdate={setUpdate}
                        />
                        : null
                }

                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    onPageActive={handleActivePage}
                    activeLinkClassName='active'
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    pageClassName='pageLi'
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    containerClassName={'paginationAdmin'}
                    pageLinkClassName={'pageBtn'}
                    previousLinkClassName={'pageBtn'}
                    nextLinkClassName={'pageBtn'}
                />
            </div >
        </div >
    )
}