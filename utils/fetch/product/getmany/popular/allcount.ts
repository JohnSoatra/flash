import { GetmanyPopularProductsAllCountRouter } from "@/prisma-types/typings";
import { GetAllcountPopularProducts } from "@/typings";
import fetchHandler from "@/utils/fetch/handler";

async function getAllcountPopularProducts({
    signal,
    query,
    onData,
    onError,
}: GetAllcountPopularProducts): Promise<GetmanyPopularProductsAllCountRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/product/getmany/popular/allcount',
        signal,
        query,
        onData,
        onError
    });

    const json = await response.json();

    return json;
}

export default getAllcountPopularProducts;