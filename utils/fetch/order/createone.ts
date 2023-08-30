import { CreateOneOrderRouter } from "@/gateway-types/typings";
import { CreateOneOrder } from "@/typings";
import fetchHandler from "../handler";
import getJson from "@/utils/json/get";

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

    const json = await getJson(response);

    return json;
}

export default createoneOrder;