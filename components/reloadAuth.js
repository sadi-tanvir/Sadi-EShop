import { useDispatch } from "react-redux"
import React, { useEffect } from "react";

const ReloadAuth = () => {
  const dispatch = useDispatch();
console.log(`run this function outside`);
useEffect(() => {
        console.log(`run this function inside`);
        dispatch({
          type: "loginUser", payload: {
            userInfo: localStorage.getItem("userInfo"),
            accessToken: localStorage.getItem("accessToken")
          }
        })
      }, [])
}

export default ReloadAuth
