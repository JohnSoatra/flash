import { GetmanySearchProductsRouter } from "@/prisma-types/typings";
import { GetManySearchProduct } from "@/typings";
import fetchHandler from "@/utils/fetch/handler";

async function getManySearchProducts({
    signal,
    query,
    onData,
    onError
}: GetManySearchProduct): Promise<GetmanySearchProductsRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/product/getmany/search',
        signal,
        query,
        onData,
        onError
    });

    const json = await response.json();

    return json;
}

export default getManySearchProducts;