import { GetoneUserRouter } from "@/gateway-types/typings";
import { GetOneUser } from "@/typings";
import fetchHandler from "@/utils/fetch/handler";
import getJson from "@/utils/json/get";

async function getOneUser({
    signal,
    onData,
    onError
}: GetOneUser): Promise<GetoneUserRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/user/getone',
        signal,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default getOneUser;