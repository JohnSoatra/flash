import { GetallCollectionsRouter } from "@/prisma-types/typings";
import { GetAllCollections } from "@/typings";
import fetchHandler from "../handler";
import getJson from "@/utils/json/get";

async function getAllCategories({
    signal,
    onData,
    onError,
}: GetAllCollections): Promise<GetallCollectionsRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/collection/getall',
        signal,
        onData,
        onError
    });
    
    const json = await getJson(response);

    return json;
}

export default getAllCategories;