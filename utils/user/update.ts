import store from "@/redux/store";
import { updateUser } from "@/redux/user";
import { UserOmit } from "@/typings";

function updateUserState(changes: Partial<UserOmit>) {
    for (let key in changes) {
        if (changes[key as keyof Partial<UserOmit>] !== undefined) {
            store.dispatch(updateUser({
                [key]: changes[key as keyof Partial<UserOmit>]
            }));
        }
    }
}

export default updateUserState;