import { GetManyOrders } from "@/typings";
import { GetManyOrdersRouter } from "@/gateway-types/typings";
import fetchHandler from "../handler";
import getJson from "@/utils/json/get";

async function getManyOrders({
    signal,
    query,
    onData,
    onError,
}: GetManyOrders): Promise<GetManyOrdersRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/order/getmany',
        signal,
        query,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default getManyOrders;