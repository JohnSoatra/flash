import { VerifyTokenRequestRouter } from "@/prisma-types/typings";
import { VerifyTokenRequest } from "@/typings";
import fetchHandler from "../../handler";

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

    const json = await response.json();

    return json;
}

export default verifyRequestToken;