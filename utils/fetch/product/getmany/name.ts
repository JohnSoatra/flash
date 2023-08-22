import { GetmanyProductNamesRouter } from "@/prisma-types/typings";
import { GetManyProductNames } from "@/typings";
import fetchHandler from "../../handler";

async function getManyProductNames({
    signal,
    query,
    onData,
    onError,
}: GetManyProductNames): Promise<GetmanyProductNamesRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/product/getmany/name',
        signal,
        query,
        onData,
        onError
    });

    const json = await response.json();

    return json;
}

export default getManyProductNames;