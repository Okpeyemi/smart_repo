"use client"

import Background from "@/components/Background";
import Logo from "@/components/Logo";
import React, { useEffect } from "react";

const page = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = "/";
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

  return (
    <div>
      <Background />
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="flex flex-col w-[80%] h-[80%] bg-[#C7ECFF] rounded-[30px] p-5 opacity-[81%] justify-center items-center py-[72px]">
          <Logo />
          <h1 className="text-[64px] font-bold text-center mt-20">MERCI <br />& <br />BIENVENU AU SCOP</h1>
        </div>
      </div>
    </div>
  );
};

export default page;
