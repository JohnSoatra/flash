import { DeleteCookieRouter } from "@/prisma-types/typings";
import { DeleteCookie } from "@/typings";
import fetchHandler from "../handler";

async function deleteCookie({
    signal,
    body,
    onData,
    onError,
}: DeleteCookie): Promise<DeleteCookieRouter> {
    const response = await fetchHandler({
        method: 'post',
        url: '/cookie/delete',
        signal,
        body,
        onData,
        onError
    });

    const json = await response.json();

    return json;
}

export default deleteCookie;