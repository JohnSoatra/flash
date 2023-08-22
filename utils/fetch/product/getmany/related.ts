import { GetmanyRelatedProductsRouter } from "@/prisma-types/typings";
import { GetManyRelatedProducts } from "@/typings";
import fetchHandler from "../../handler";

async function getManyRelatedProducts({
    signal,
    query,
    onData,
    onError,
}: GetManyRelatedProducts): Promise<GetmanyRelatedProductsRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/product/getmany/related',
        signal,
        query,
        onData,
        onError
    });

    const json = await response.json();

    return json;
}

export default getManyRelatedProducts;