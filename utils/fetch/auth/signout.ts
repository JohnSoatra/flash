import { SignoutRouter } from "@/prisma-types/typings";
import { Signout } from "@/typings";
import clear from "@/utils/string/clear";

async function signout(args: Signout): Promise<SignoutRouter> {
    const res = await fetch(clear(`${process.env.GATEWAY_URL}/auth/signout`), {
        signal: args.signal,
        credentials: 'include'
    });

    const json = await res.json();

    return json;
}

export default signout;