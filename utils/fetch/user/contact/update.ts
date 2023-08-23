import { UpdateoneGeneralRouter } from "@/prisma-types/typings";
import { UpdateContact } from "@/typings";
import fetchHandler from "../../handler";
import getJson from "@/utils/json/get";

async function updateContact({
    signal,
    body,
    onData,
    onError,
}: UpdateContact): Promise<UpdateoneGeneralRouter> {
    const response = await fetchHandler({
        method: 'post',
        url: '/user/updateone/contact',
        signal,
        body,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default updateContact;