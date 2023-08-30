import { useSelector } from "react-redux";
import { selectUser } from "@/redux/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ROUTE from "@/constants/route";

function useUser({ require }: { require: boolean }) {
    const router = useRouter();
    const user = useSelector(selectUser);

    useEffect(() => {
        if (user === null && require) {
            router.push(ROUTE.SIGN_IN);
        }   
    }, [user]);

    return user;
}

export default useUser;