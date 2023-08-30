import store from "@/redux/store";
import withStoreUrl from "../url/with_store";
import { UpdateField } from "@/typings";

function userChanged(field: UpdateField, data: any): boolean {
    const user = store.getState().user.data;

    if (user) {
        if (field === 'image_url') {
            if ((user[field] && withStoreUrl(user[field]!)) !== data) {
                return true;
            }
        } else {
            if (user[field] !== data) {
                return true;
            }
        }
    }

    return false;
}

export default userChanged;