import { Metadata } from "next";
import Index from './index';
import getOneProduct from "@/utils/fetch/product/getone";

export const metadata: Metadata = {
  title: 'Flash | Home',
  description: 'Flash is an commerce website.',
}

const Home = async () => {
  const pc = await getOneProduct({
    query: {
      id: '1'
    },
    signal: null
  });
  const smartphone = await getOneProduct({
    query: {
      id: '3'
    },
    signal: null
  });
  const earphone = await getOneProduct({
    query: {
      id: 'cljjhdmmw000kjrzko64peetj'
    },
    signal: null
  });

  if (smartphone && earphone && pc) {
    return (
      <Index products={[
        {
          category: 'smartphone',
          ...smartphone
        },
        {
          category: 'laptop',
          ...pc
        },
        {
          category: 'earphone',
          ...earphone
        }
      ]}/>
    );
  }

  return null;

}

export default Home;