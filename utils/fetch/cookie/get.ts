import { GetCookieRouter } from "@/prisma-types/typings";
import { GetCookie } from "@/typings";
import fetchHandler from "../handler";
import getJson from "@/utils/json/get";

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

    const json = await getJson(response);

    return json;
}

export default getCookie;