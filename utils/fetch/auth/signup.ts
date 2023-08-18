import { SignupRouter } from "@/prisma-types/typings";
import { Signup } from "@/typings";
import networkEncrypt from "@/utils/crypto/encrypt/network";
import clear from "@/utils/string/clear";

async function signup(args: Signup): Promise<SignupRouter> {
    const res = await fetch(clear(`${process.env.GATEWAY_URL}/auth/signup`), {
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

export default signup;