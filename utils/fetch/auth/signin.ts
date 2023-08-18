import { SigninRouter } from "@/prisma-types/typings";
import { Signin } from "@/typings";
import networkEncrypt from "@/utils/crypto/encrypt/network";
import clear from "@/utils/string/clear";

async function signin(args: Signin): Promise<SigninRouter> {
    const res = await fetch(clear(`${process.env.GATEWAY_URL}/auth/signin`), {
        signal: args.signal,
        credentials: 'include',
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            email: args.email,
            password: networkEncrypt(args.password)
        })
    });

    const json = await res.json();

    return json;
}

export default signin;