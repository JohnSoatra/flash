import { GetmanyNewProductsRouter } from "@/prisma-types/typings";
import { GetManyNewProducts } from "@/typings";
import fetchHandler from "@/utils/fetch/handler";

async function getManyNewProducts({
    signal,
    query,
    onData,
    onError
}: GetManyNewProducts): Promise<GetmanyNewProductsRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/product/getmany/new',
        signal,
        query,
        onData,
        onError
    });

    const json = await response.json();

    return json;
}

export default getManyNewProducts;