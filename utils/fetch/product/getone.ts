import { GetOneProductRouter } from "@/prisma-types/typings";
import { GetOneProduct } from "@/typings";
import clear from "@/utils/string/clear";

async function getOneProduct(args: GetOneProduct): Promise<GetOneProductRouter> {
    const res = await fetch(clear(`
        ${process.env.GATEWAY_URL}/product/getone?
            id=${args.id}
    `), {
        signal: args.signal,
        credentials: 'include',
    });

    const json = await res.json();

    return json;
}

export default getOneProduct;