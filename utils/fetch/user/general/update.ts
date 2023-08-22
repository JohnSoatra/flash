import { UpdateoneGeneralRouter } from "@/prisma-types/typings";
import { UpdateGeneral } from "@/typings";
import fetchHandler from "../../handler";

async function updateGeneral({
    signal,
    body,
    onData,
    onError,
}: UpdateGeneral): Promise<UpdateoneGeneralRouter> {
    const response = await fetchHandler({
        method: 'post',
        url: '/user/updateone/general',
        signal,
        body,
        onData,
        onError
    });

    const json = await response.json();

    return json;
}

export default updateGeneral;