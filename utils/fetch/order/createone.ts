import { CreateOneOrderRouter } from "@/prisma-types/typings";
import { CreateOneOrder } from "@/typings";
import fetchHandler from "../handler";

async function createoneOrder({
    signal,
    body,
    onData,
    onError,
}: CreateOneOrder): Promise<CreateOneOrderRouter> {
    const response = await fetchHandler({
        method: 'post',
        url: '/order/createone',
        signal,
        body,
        onData,
        onError
    });

    const json = await response.json();

    return json;
}

export default createoneOrder;