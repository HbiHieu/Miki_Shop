import axios from 'axios';
import { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import MainLayout from 'src/layouts';
import {
  AboutSection,
  BestSellerSection,
  HeroSection,
  LatestCollectionSection,
  ProductCategorySection,
} from 'src/sections/main/home';
//always import from src folder, not "./", "../", "../../",...

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;


export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    dataProducts();
  }, []);

  const dataProducts = async (data) => {
    try {
      const res = await axios({
        method: 'GET',
        url: `http://miki-shop.somee.com/api/Products?page=${1}&sortBy=name&order=asc&limit=${12}`,
      });
      const datas = res.data;
      const { data, pagination } = datas;
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Page
        data={{
          title: 'Miki Shop',
          description: '',
          url: '',
          thumbnailUrl: '',
        }}
      />
      <HeroSection />
      <AboutSection />
      <BestSellerSection products={products} />
      <LatestCollectionSection />
      <ProductCategorySection />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-[1329px] top-[3920px]"
        width="111"
        height="387"
        viewBox="0 0 111 387"
        fill="none"
      >
        <circle cx="275.5" cy="275.5" r="275.5" fill="#B78D71" fillOpacity="0.15" />
        <circle cx="275.5" cy="275.5" r="220.453" fill="#B78D71" fillOpacity="0.1" />
      </svg>
    </div>
  );
}
