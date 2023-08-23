import { SendEmailVerifyRequestRouter } from "@/prisma-types/typings";
import { SendEmailVerifyRequest } from "@/typings";
import fetchHandler from "../../handler";
import getJson from "@/utils/json/get";

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

    const json = await getJson(response);

    return json;
}

export default sendEmailVerifyRequest;