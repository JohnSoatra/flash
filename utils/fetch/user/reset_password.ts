import { ResetPasswordRouter } from "@/prisma-types/typings";
import { ResetPassword } from "@/typings";
import fetchHandler from "@/utils/fetch/handler";
import getJson from "@/utils/json/get";

async function resetPassword({
    signal,
    body,
    onData,
    onError
}: ResetPassword): Promise<ResetPasswordRouter> {
    const response = await fetchHandler({
        method: 'post',
        url: '/user/reset_password',
        signal,
        body,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default resetPassword;