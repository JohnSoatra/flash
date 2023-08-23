import { GetallBrandsRouter } from "@/prisma-types/typings";
import { GetAllBrands } from "@/typings";
import fetchHandler from "../handler";
import getJson from "@/utils/json/get";

async function getAllBrands({
    signal,
    onData,
    onError,
}: GetAllBrands): Promise<GetallBrandsRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/brand/getall',
        signal,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default getAllBrands;