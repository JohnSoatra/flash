import { GetAllModels } from "@/typings";
import { GetallModelsRouter } from "@/prisma-types/typings";
import fetchHandler from "../handler";

async function getAllModels({
    signal,
    onData,
    onError,
}: GetAllModels): Promise<GetallModelsRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/model/getall',
        signal,
        onData,
        onError
    });

    const json = await response.json();

    return json;
}

export default getAllModels;