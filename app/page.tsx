import { Metadata } from "next";
import Index from './index';
import getOneProduct from "@/utils/fetch/product/getone";

export const metadata: Metadata = {
  title: 'Flash | Home',
  description: 'Flash is an commerce website.',
}

const Home = async () => {
  // const pc = await getOneProduct({
  //   query: {
  //     id: '1'
  //   },
  //   signal: null
  // });
  // const smartphone = await getOneProduct({
  //   query: {
  //     id: '3'
  //   },
  //   signal: null
  // });
  // const earphone = await getOneProduct({
  //   query: {
  //     id: 'cljjh97ha000ijrzkkb8ga4ok'
  //   },
  //   signal: null
  // });

  // if (pc && smartphone && earphone) {
  //   return (
  //     <Index
  //       pc={pc}
  //       smartphone={smartphone}
  //       earphone={earphone}
  //     />
  //   );
  // }

  return (
    <p>No PC, no Smartphone and no Earphone.</p>
  );
}

export default Home;