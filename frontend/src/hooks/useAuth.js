import {useSelector} from "react-redux";
import {selectCurrentUser,} from '../store/slices/authSlice';
import {useCallback, useMemo} from "react";

export const useAuth = () => {
    const user = useSelector(selectCurrentUser);

    const can = useCallback((perms) => {
        // console.log("Checking perms ", perms)
        return !perms || perms?.length === 0 || perms?.some(perm => {
            // console.log("Checking ",perm, user?.userType)
            return perm === user?.userType;
        });
    }, [user]);

    // console.log("User", user)
    return useMemo(() => ({user, can}), [can, user]);
};
