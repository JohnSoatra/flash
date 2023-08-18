import { UpdateoneGeneralRouter } from "@/prisma-types/typings";
import { UpdateGeneral } from "@/typings";
import clear from "@/utils/string/clear";

async function updateGeneral(args: UpdateGeneral): Promise<UpdateoneGeneralRouter> {
    
    const res = await fetch(clear(`${process.env.GATEWAY_URL}/user/updateone/general`), {
        signal: args.signal,
        credentials: 'include',
        method: 'post',
        headers: {
            'content-type': 'application/json',
            'csrf-token': args.csrfToken
        },
        body: JSON.stringify({
            'image_url': args.imageUrl,
            'username': args.username,
        })
    });

    const json = await res.json();

    return json;
}

export default updateGeneral;