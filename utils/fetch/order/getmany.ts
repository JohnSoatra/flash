import { GetManyOrders } from "@/typings";
import { GetManyOrdersRouter } from "@/prisma-types/typings";
import fetchHandler from "../handler";

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

    const json = await response.json();

    return json;
}

export default getManyOrders;