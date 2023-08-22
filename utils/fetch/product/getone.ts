import { GetOneProductRouter } from "@/prisma-types/typings";
import { GetOneProduct } from "@/typings";
import fetchHandler from "../handler";

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

    const json = await response.json();

    return json;
}

export default getOneProduct;