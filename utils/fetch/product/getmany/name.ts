import { GetmanyProductNamesRouter } from "@/gateway-types/typings";
import { GetManyProductNames } from "@/typings";
import fetchHandler from "../../handler";
import getJson from "@/utils/json/get";

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

    const json = await getJson(response);

    return json;
}

export default getManyProductNames;