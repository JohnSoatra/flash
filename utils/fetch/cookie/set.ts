import { SetCookieRouter } from "@/gateway-types/typings";
import { SetCookie } from "@/typings";
import fetchHandler from "../handler";
import getJson from "@/utils/json/get";

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

    const json = await getJson(response);

    return json;
}

export default setCookie;