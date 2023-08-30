'use client';
import Landing from "@/components/Landing";
import BuyNow from "@/components/template/home/BuyNow";
import RecentReview from "@/components/template/home/RecentReview";
import Collection from "@/components/template/product/Collection";
import TabProducts from "@/components/template/product/Tab";
import { ProductX } from "@/typings";

type Props = {
    products: (ProductX & { category: string })[]
}

const Index = ({ products }: Props) => {
    return (
        <div className="max-w-5xl mx-auto">
            <div>
                <Landing />
            </div>

            <section>
                <Collection products={products} />
            </section>

            <section>
                <TabProducts />
            </section>

            <section>
                <RecentReview />
            </section>

            <section>
                <BuyNow />
            </section>
        </div>
  )
}

export default Index;