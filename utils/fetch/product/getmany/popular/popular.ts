import { GetmanyPopularProductsRouter } from "@/prisma-types/typings";
import { GetManyPopularProducts } from "@/typings";
import fetchHandler from "@/utils/fetch/handler";

async function getManyPopularProducts({
    signal,
    query,
    onData,
    onError
}: GetManyPopularProducts): Promise<GetmanyPopularProductsRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/product/getmany/popular',
        signal,
        query,
        onData,
        onError
    });

    const json = await response.json();

    return json;
}

export default getManyPopularProducts;