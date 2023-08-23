import { GetmanyNewProductsAllCountRouter } from "@/prisma-types/typings";
import { GetAllcountNewProducts } from "@/typings";
import fetchHandler from "@/utils/fetch/handler";
import getJson from "@/utils/json/get";

async function getAllcountNewProducts({
    signal,
    query,
    onData,
    onError,
}: GetAllcountNewProducts): Promise<GetmanyNewProductsAllCountRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/product/getmany/new/allcount',
        signal,
        query,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default getAllcountNewProducts;