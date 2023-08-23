import { VerifyTokenRequestRouter } from "@/prisma-types/typings";
import { VerifyTokenRequest } from "@/typings";
import fetchHandler from "../../handler";
import getJson from "@/utils/json/get";

async function verifyRequestToken({
    signal,
    body,
    onData,
    onError,
}: VerifyTokenRequest): Promise<VerifyTokenRequestRouter> {
    const response = await fetchHandler({
        method: 'post',
        url: '/email/verify/request',
        signal,
        body,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default verifyRequestToken;