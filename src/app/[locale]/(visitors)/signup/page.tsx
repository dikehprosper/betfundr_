"use client";
import SignUp from "@/components/(SignupSection)/Signup";
import React from "react";
import Nav from "../../../../components/(Navs)/Nav";
import {  useAppSelector } from "@/lib/hooks";
const Signup = () => {
   const updatedTheme = useAppSelector((state) => state.theme.theme);
  return ( 
    <div style={{background: updatedTheme === "dark" ? "rgb(10, 20, 38)": "white"}}>
      <SignUp updatedTheme={updatedTheme} />
    </div>
  );
};

export default Signup;
