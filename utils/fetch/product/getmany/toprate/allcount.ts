import { GetmanyToprateProductsAllCountRouter } from "@/prisma-types/typings";
import { GetAllcountToprateProducts } from "@/typings";
import fetchHandler from "@/utils/fetch/handler";

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

    const json = await response.json();

    return json;
}

export default getAllcountToprateProducts;