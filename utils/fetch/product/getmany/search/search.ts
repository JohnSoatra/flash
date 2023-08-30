import { GetmanySearchProductsRouter } from "@/gateway-types/typings";
import { GetManySearchProduct } from "@/typings";
import fetchHandler from "@/utils/fetch/handler";
import getJson from "@/utils/json/get";

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

    const json = await getJson(response);

    return json;
}

export default getManySearchProducts;