import { GetmanySearchProductsAllCountRouter } from "@/prisma-types/typings";
import { GetAllcountSearchProducts } from "@/typings";
import fetchHandler from "@/utils/fetch/handler";
import getJson from "@/utils/json/get";

async function getAllcountSearchProducts({
    signal,
    query,
    onData,
    onError,
}: GetAllcountSearchProducts): Promise<GetmanySearchProductsAllCountRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/product/getmany/search/allcount',
        signal,
        query,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default getAllcountSearchProducts;