import { UpdateoneGeneralRouter } from "@/prisma-types/typings";
import { UpdateGeneral } from "@/typings";
import clear from "@/utils/string/clear";

async function updateContact(args: UpdateGeneral): Promise<UpdateoneGeneralRouter> {
    const res = await fetch(clear(`
        ${process.env.GATEWAY_URL}/user/updateone/contact
    `), {
        signal: args.signal,
        credentials: 'include',
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            'image_url': args.imageUrl,
            'username': args.username,
        })
    });

    const json = await res.json();

    return json;
}

export default updateContact;