import { GetallCategoriesRouter } from "@/prisma-types/typings";
import { GetAllCategories } from "@/typings";
import fetchHandler from "../handler";

async function getAllCategories({
    signal,
    onData,
    onError,
}: GetAllCategories): Promise<GetallCategoriesRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/category/getall',
        signal,
        onData,
        onError
    });
    
    const json = await response.json();

    return json;
}

export default getAllCategories;