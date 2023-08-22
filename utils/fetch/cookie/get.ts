import { GetCookieRouter } from "@/prisma-types/typings";
import { GetCookie } from "@/typings";
import fetchHandler from "../handler";

async function getCookie({
    signal,
    query,
    onData,
    onError,
}: GetCookie): Promise<GetCookieRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/cookie/get',
        signal,
        query,
        onData,
        onError
    });

    const json = await response.json();

    return json;
}

export default getCookie;