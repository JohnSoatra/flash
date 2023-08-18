import clear from "@/utils/string/clear";
import { GetManyOrders } from "@/typings";
import { GetManyOrdersRouter } from "@/prisma-types/typings";

async function getManyOrders(args: GetManyOrders): Promise<GetManyOrdersRouter> {
    const res = await fetch(clear(`
        ${process.env.GATEWAY_URL}order/getmany?
            limit=${args.limit || ''}&
            sort_by=${args.sortBy || ''}&
            order_by=${args.orderBy || ''}`
    ), {
        signal: args.signal,
        credentials: 'include'
    });
    const json = await res.json();

    return json;
}

export default getManyOrders;