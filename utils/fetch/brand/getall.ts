import { GetallBrandsRouter } from "@/prisma-types/typings";
import { GetAllBrands } from "@/typings";
import fetchHandler from "../handler";

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

    const json = await response.json();

    return json;
}

export default getAllBrands;