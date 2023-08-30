import { GetmanyRelatedProductsRouter } from "@/gateway-types/typings";
import { GetManyRelatedProducts } from "@/typings";
import fetchHandler from "../../handler";
import getJson from "@/utils/json/get";

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

    const json = await getJson(response);

    return json;
}

export default getManyRelatedProducts;