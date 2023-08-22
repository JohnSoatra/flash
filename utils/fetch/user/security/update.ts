import { UpdateoneGeneralRouter } from "@/prisma-types/typings";
import { UpdateSecurity } from "@/typings";
import fetchHandler from "../../handler";

async function updateSecurity({
    signal,
    body,
    onData,
    onError,
}: UpdateSecurity): Promise<UpdateoneGeneralRouter> {
    const response = await fetchHandler({
        method: 'post',
        url: '/user/updateone/security',
        signal,
        body,
        onData,
        onError
    });

    const json = await response.json();

    return json;
}

export default updateSecurity;