import { GetmanyToprateProductsAllCountRouter } from "@/gateway-types/typings";
import { GetAllcountToprateProducts } from "@/typings";
import fetchHandler from "@/utils/fetch/handler";
import getJson from "@/utils/json/get";

async function getAllcountToprateProducts({
    signal,
    query,
    onData,
    onError,
}: GetAllcountToprateProducts): Promise<GetmanyToprateProductsAllCountRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/product/getmany/toprate/allcount',
        signal,
        query,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default getAllcountToprateProducts;