import { GetmanyToprateProductsRouter } from "@/prisma-types/typings";
import { GetManyToprateProducts } from "@/typings";
import fetchHandler from "@/utils/fetch/handler";

async function getManyToprateProducts({
    signal,
    query,
    onData,
    onError
}: GetManyToprateProducts): Promise<GetmanyToprateProductsRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/product/getmany/toprate',
        signal,
        query,
        onData,
        onError
    });

    const json = await response.json();

    return json;
}

export default getManyToprateProducts;