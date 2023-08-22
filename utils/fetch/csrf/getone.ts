import { GetCsrfRouter } from "@/prisma-types/typings";
import { GetOneCsrf } from "@/typings";
import fetchHandler from "../handler";

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

    const json = await response.json();

    return json;
}

export default getOneCsrf;