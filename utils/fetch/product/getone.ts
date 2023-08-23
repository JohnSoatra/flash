import { GetOneProductRouter } from "@/prisma-types/typings";
import { GetOneProduct } from "@/typings";
import fetchHandler from "../handler";
import getJson from "@/utils/json/get";

async function getOneProduct({
    signal,
    query,
    onData,
    onError
}: GetOneProduct): Promise<GetOneProductRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/product/getone',
        signal,
        query,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default getOneProduct;