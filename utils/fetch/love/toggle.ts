import { ToggleLoveRouter } from "@/prisma-types/typings";
import { ToggleLove } from "@/typings";
import fetchHandler from "../handler";

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

    const json = await response.json();

    return json;
}

export default toggleLove;