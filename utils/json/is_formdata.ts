import { Json } from "@/typings";

function isFormData(json: Json|FormData) {
    if (typeof json.forEach === 'function') {
        return true;
    }

    return false;
}

export default isFormData;