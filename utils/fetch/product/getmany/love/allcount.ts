import { GetmanyLoveProductsAllCountRouter } from "@/gateway-types/typings";
import { GetAllcountLoveProducts } from "@/typings";
import fetchHandler from "@/utils/fetch/handler";
import getJson from "@/utils/json/get";

async function getAllcountLoveProducts({
    signal,
    onData,
    onError,
}: GetAllcountLoveProducts): Promise<GetmanyLoveProductsAllCountRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/product/getmany/love/allcount',
        signal,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default getAllcountLoveProducts;