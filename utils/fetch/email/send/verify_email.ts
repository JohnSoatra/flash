import { SendEmailVerifyEmailRouter } from "@/prisma-types/typings";
import { SendEmailVerifyEmail } from "@/typings";
import fetchHandler from "../../handler";

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

    const json = await response.json();

    return json;
}

export default sendEmailVerifyEmail;