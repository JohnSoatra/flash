import { SendEmailVerifyEmailRouter } from "@/prisma-types/typings";
import { SendEmailVerifyEmail } from "@/typings";
import fetchHandler from "../../handler";
import getJson from "@/utils/json/get";

async function sendEmailVerifyEmail({
    signal,
    body,
    onData,
    onError,
}: SendEmailVerifyEmail): Promise<SendEmailVerifyEmailRouter> {
    const response = await fetchHandler({
        method: 'post',
        url: '/email/send/verify_email',
        signal,
        body,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default sendEmailVerifyEmail;