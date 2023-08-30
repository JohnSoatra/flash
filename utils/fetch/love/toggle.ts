import { ToggleLoveRouter } from "@/gateway-types/typings";
import { ToggleLove } from "@/typings";
import fetchHandler from "../handler";
import getJson from "@/utils/json/get";

async function toggleLove({
    signal,
    body,
    onData,
    onError,
}: ToggleLove): Promise<ToggleLoveRouter> {
    const response = await fetchHandler({
        method: 'post',
        url: '/love/toggle',
        signal,
        body,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default toggleLove;