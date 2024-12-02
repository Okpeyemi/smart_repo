import Background from "@/components/Background";
import Boutton from "@/components/Boutton";
import Logo from "@/components/Logo";
import React from "react";

const page = () => {
  return (
    <div>
      <Background />
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="flex flex-col w-[80%] h-[80%] bg-[#C7ECFF] rounded-[30px] p-5 opacity-[81%] justify-between items-center py-[72px]">
          <Logo />
          <h2 className="text-[54px] font-bold text-center">Vous êtes ? </h2>
          <div>
            <a href="/usager">
              <Boutton className="bg-[#0077FF] cursor-pointer" text="Usager" />
            </a>
            <a href="/visiteur">
              <Boutton
                className="bg-[#FFA600] mt-[45px] cursor-pointer"
                text="Visiteur"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
