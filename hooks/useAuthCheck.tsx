"use client";

import { getLocalToken } from "@/services/helpers";
import { selectUser } from "@/shared/redux/reducers/userSlice";
import { resetUser } from "@/shared/redux/reducers/userSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/store";

const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const authenticatedUser =  useAppSelector(selectUser);

  const AuthenticatedUserHaveValidToken = authenticatedUser.user.token || null;

  const IsAuthenticated = !!authenticatedUser.user.token;

  const IsAuth = getLocalToken

  const LoggedInUser = authenticatedUser.user;

  const SignOut = () => dispatch(resetUser());

  return {
    AuthenticatedUserHaveValidToken,
    IsAuthenticated,
    IsAuth,
    SignOut,
    LoggedInUser,
  };
};

export default useAuthCheck;