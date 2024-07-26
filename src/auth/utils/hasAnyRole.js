import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.Jsx";

export const hasAnyRole = (authorities, roles) => roles.some(role => authorities.includes(role));

export const hasAnyRoleV2 = (roles) => {
  const { login } = useContext(AuthContext);
  if (!login || !login.user || !login.user.authorities) {
    return false;
  }
  return roles.some(role => login.user.authorities.includes(role));

}