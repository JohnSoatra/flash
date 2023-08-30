import { GetmanyLoveProductsRouter } from "@/gateway-types/typings";
import { GetManyLoveProducts } from "@/typings";
import fetchHandler from "@/utils/fetch/handler";
import getJson from "@/utils/json/get";

async function getManyLoveProducts({
    signal,
    query,
    onData,
    onError
}: GetManyLoveProducts): Promise<GetmanyLoveProductsRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/product/getmany/love',
        signal,
        query,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default getManyLoveProducts;