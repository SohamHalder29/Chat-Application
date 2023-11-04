import React, { useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { FcGoogle } from "react-icons/fc";
import { firebaseAuth } from "@/utils/firebaseConfig";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

const login = () => {
  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  useEffect(() => {
    if (userInfo?.id && !newUser) {
      router.push("/");
    }
  }, [userInfo, newUser]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);
    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });
        if (!data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: { name, email, profileImage, status: data.status },
          });
          router.push("/onboarding");
        } else {
          const { id, name, email, profilePicture: profileImage } = data.data;
          console.log({ data });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: { id, name, email, profileImage, status: data.status },
          });
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={
        "flex flex-col justify-center items-center bg-panel-header-background h-screen w-screen gap-6"
      }>
      <div className={"flex items-center justify-center gap-2 text-white"}>
        <Image
          src={"/whatsapp.gif"}
          alt={"WhatsApp"}
          width={300}
          height={300}
          priority
          className={"bg-transparent"}
        />
        <span className={"text-7xl font-bold"}> WhatsApp</span>
      </div>
      <button
        className={
          "flex justify-center items-center gap-7 bg-search-input-container-background rounded-lg p-5"
        }
        onClick={handleLogin}>
        <FcGoogle className={"text-4xl"} />
        <span className={"text-white text-2xl"}> Login with Google </span>
      </button>
    </div>
  );
};

export default login;