import { GetmanyNewProductsRouter } from "@/gateway-types/typings";
import { GetManyNewProducts } from "@/typings";
import fetchHandler from "@/utils/fetch/handler";
import getJson from "@/utils/json/get";

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

    const json = await getJson(response);

    return json;
}

export default getManyNewProducts;