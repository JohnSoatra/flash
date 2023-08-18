import { useSelector } from "react-redux";
import { selectUser } from "@/redux/user";

function useUser() {
    return useSelector(selectUser);
}

export default useUser;