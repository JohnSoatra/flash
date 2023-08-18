import { GetCookieRouter } from "@/prisma-types/typings";
import { GetCookie } from "@/typings";
import clear from "@/utils/string/clear";

async function getCookie(args: GetCookie): Promise<GetCookieRouter> {
    const res = await fetch(clear(`
        ${process.env.GATEWAY_URL}/cookie/get?
            name=$0
    `, args.name), {
        signal: args.signal,
        credentials: 'include'
    });

    const json = await res.json();

    return json;
}

export default getCookie;