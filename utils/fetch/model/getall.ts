import { GetAllModels } from "@/typings";
import { GetallModelsRouter } from "@/gateway-types/typings";
import fetchHandler from "../handler";
import getJson from "@/utils/json/get";

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

    const json = await getJson(response);

    return json;
}

export default getAllModels;