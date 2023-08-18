import { Metadata } from "next";
import Index from './index';
import getOneProduct from "@/utils/fetch/product/getone";

export const metadata: Metadata = {
  title: 'Flash | Home',
  description: 'Flash is an commerce website.',
}

const Home = async () => {
  const pc = await getOneProduct({
    id: '1'
  });
  const smartphone = await getOneProduct({
    id: '3'
  });
  const earphone = await getOneProduct({
    id: 'cljjh97ha000ijrzkkb8ga4ok'
  });

  return (
    <Index
      pc={pc!}
      smartphone={smartphone!}
      earphone={earphone!}
    />
  );

}

export default Home;