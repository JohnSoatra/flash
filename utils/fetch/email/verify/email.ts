import { VerifyTokenEmailRouter } from "@/prisma-types/typings";
import { VerifyTokenEmail } from "@/typings";
import fetchHandler from "../../handler";

async function verifyEmailToken({
    signal,
    body,
    onData,
    onError,
}: VerifyTokenEmail): Promise<VerifyTokenEmailRouter> {
    const response = await fetchHandler({
        method: 'post',
        url: '/email/verify/email',
        signal,
        body,
        onData,
        onError
    });

    const json = await response.json();

    return json;
}

export default verifyEmailToken;