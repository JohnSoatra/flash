import { DeleteCookieRouter } from "@/prisma-types/typings";
import { DeleteCookie } from "@/typings";
import clear from "@/utils/string/clear";

async function deleteCookie(args: DeleteCookie): Promise<DeleteCookieRouter> {
    const res = await fetch(clear(`
        ${process.env.GATEWAY_URL}/cookie/delete
    `), {
        signal: args.signal,
        credentials: 'include',
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            name: args.name
        })
    });

    const json = await res.json();

    return json;
}

export default deleteCookie;