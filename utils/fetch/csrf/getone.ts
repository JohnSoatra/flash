import { GetCsrfRouter } from "@/prisma-types/typings";
import { GetOneCsrf } from "@/typings";
import fetchHandler from "../handler";
import getJson from "@/utils/json/get";

async function getOneCsrf({
    signal,
    onData,
    onError,
}: GetOneCsrf): Promise<GetCsrfRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/csrf/get',
        signal,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default getOneCsrf;