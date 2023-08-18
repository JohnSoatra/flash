import { SetCookieRouter } from "@/prisma-types/typings";
import { SetCookie } from "@/typings";
import clear from "@/utils/string/clear";

async function setCookie(args: SetCookie): Promise<SetCookieRouter> {
    const res = await fetch(clear(`
        ${process.env.GATEWAY_URL}/cookie/set
    `), {
        signal: args.signal,
        credentials: 'include',
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            name: args.name,
            value: args.value
        })
    });

    const json = await res.json();

    return json;
}

export default setCookie;