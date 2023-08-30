import { GetallCategoriesRouter } from "@/gateway-types/typings";
import { GetAllCategories } from "@/typings";
import fetchHandler from "../handler";
import getJson from "@/utils/json/get";

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
    
    const json = await getJson(response);

    return json;
}

export default getAllCategories;