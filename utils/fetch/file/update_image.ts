import { UpdateImage } from "@/typings";
import fetchHandler from "../handler";
import getJson from "@/utils/json/get";

async function updateImage({
    signal,
    body,
    onData,
    onError,
}: UpdateImage): Promise<UpdateFileRouter> {
    const response = await fetchHandler({
        method: 'post',
        url: '/file/update',
        signal,
        body,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default updateImage;