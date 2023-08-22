import { GetallCollectionsRouter } from "@/prisma-types/typings";
import { GetAllCollections } from "@/typings";
import fetchHandler from "../handler";

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
    
    const json = await response.json();

    return json;
}

export default getAllCategories;