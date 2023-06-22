import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Footer, Header } from 'src/layouts/default';
import { dataUser } from 'src/recoils/dataUser';
import Profile from 'src/sections/users/Profile';

function UserPage(props) {
    const router = useRouter();
    const user = useRecoilValue(dataUser)
    const [products, setProducts] = useState(1);

    useEffect(() => {
        if (!user) {
            router.replace('/login')
        }
        dataProducts();
    }, []);

    const dataProducts = (data) => {
        try {
            const res = axios({
                method: 'GET',
                url: `https://localhost:7226/api/Products?page=${1}&sortBy=name&order=asc`,
            });
            res.then((response) => {
                const datas = response.data;
                const { data, pagination } = datas;
                setProducts(data);
            });
        } catch (err) {
            console.log('Call API Error');
        }
    };
    return (
        <div className='relative overflow-hidden'>
            <Header />
            {/* <Profile user={user} products={products} /> */}
            <Footer />


        </div>
    );
}

export default UserPage;