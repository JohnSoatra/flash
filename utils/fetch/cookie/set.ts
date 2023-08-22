import { SetCookieRouter } from "@/prisma-types/typings";
import { SetCookie } from "@/typings";
import fetchHandler from "../handler";

async function setCookie({
    signal,
    body,
    onData,
    onError,
}: SetCookie): Promise<SetCookieRouter> {
    const response = await fetchHandler({
        method: 'post',
        url: '/cookie/set',
        signal,
        body,
        onData,
        onError
    });

    const json = await response.json();

    return json;
}

export default setCookie;