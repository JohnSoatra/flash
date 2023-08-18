import { ToggleLoveRouter } from "@/prisma-types/typings";
import { ToggleLove } from "@/typings";
import clear from "@/utils/string/clear";

async function toggleLove(args: ToggleLove): Promise<ToggleLoveRouter> {
    const res = await fetch(clear(`
        ${process.env.GATEWAY_URL}/favorite/toggle?
            product_id=${args.productId}&
            prev_favorited=${args.prevFavorited || ''}
    `), {
        signal: args.signal,
        credentials: 'include'
    });

    const json = await res.json();

    return json;
}

export default toggleLove;