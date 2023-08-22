import { SendEmailVerifyRequestRouter } from "@/prisma-types/typings";
import { SendEmailVerifyRequest } from "@/typings";
import fetchHandler from "../../handler";

async function sendEmailVerifyRequest({
    signal,
    body,
    onData,
    onError,
}: SendEmailVerifyRequest): Promise<SendEmailVerifyRequestRouter> {
    const response = await fetchHandler({
        method: 'post',
        url: '/email/send/verify_request',
        signal,
        body,
        onData,
        onError
    });

    const json = await response.json();

    return json;
}

export default sendEmailVerifyRequest;