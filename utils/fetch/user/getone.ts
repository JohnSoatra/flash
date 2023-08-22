import { GetoneUserRouter } from "@/prisma-types/typings";
import { GetOneUser } from "@/typings";
import fetchHandler from "@/utils/fetch/handler";

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

    const json = await response.json();

    return json;
}

export default getOneUser;