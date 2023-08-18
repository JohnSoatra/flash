import VARS from "@/constants/vars";
import { GetoneUserRouter } from "@/prisma-types/typings";
import { GetOneUser } from "@/typings";
import clear from "@/utils/string/clear";

async function getOneUser(args?: GetOneUser): Promise<GetoneUserRouter> {
    const res = await fetch(clear(`${VARS.ENV.gate_url}/user/getone`), {
        signal: args?.signal,
        credentials: 'include'
    });

    const json = await res.json();

    return json;
}

export default getOneUser;