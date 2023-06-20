import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import ToastMessage from 'src/components/ToastMessage';
import MainLayout from 'src/layouts';
import ProductDetailsSection1 from 'src/sections/main/products/ProductDetailsSection1';
import ProductDetailsSection2 from 'src/sections/main/products/ProductDetailsSection2';
import ProductDetailsSection3 from 'src/sections/main/products/ProductDetailsSection3';
//always import from src folder, not "./", "../", "../../",...

ProductDetails.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// export const getStaticPaths = async () => {
//   const res = await axios({
//     method: 'GET',
//     url: 'https://localhost:7226/api/Products'
//   })
//   const products = res.data;
//   const paths = products?.map(product => ({
//     params: { productId: product.id }
//   }))
//   return { paths, fallback: false }
// }

// export const getStaticProps = async ({ params }) => {
//   console.log(params)
//   const res = await axios({
//     method: 'GET',
//     url: `https://localhost:7226/api/Products/${params}`
//   })
//   const product = res.data;
//   return { props: { product } }
// }

export default function ProductDetails() {
  const [product, setProduct] = useState();
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      try {
        const fetch = async () => {
          console.log(router);
          const res = await axios({
            method: 'GET',
            url: `https://localhost:7226/api/Products/${router.query.productId}`
          })
          console.log(res);
          setProduct(res.data);
        }
        fetch();
      }
      catch (ex) {
        console.log(ex);
      }
    }
  }, [router.isReady])
  const [toast, setToast] = useState(false);
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
      {toast &&
        <ToastMessage />
      }
      <ProductDetailsSection1 product={product} setToast={setToast} />
      <ProductDetailsSection2 product={product} />
      <ProductDetailsSection3 product={product} />
    </div>
  );
}
