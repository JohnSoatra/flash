import { GetmanyPopularProductsRouter } from "@/prisma-types/typings";
import { GetManyPopularProducts } from "@/typings";
import fetchHandler from "@/utils/fetch/handler";
import getJson from "@/utils/json/get";

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

    const json = await getJson(response);

    return json;
}

export default getManyPopularProducts;