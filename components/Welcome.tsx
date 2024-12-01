import React from 'react'
import Logo from './Logo'
import Boutton from './Boutton'

const Welcome = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
        <div className="flex flex-col w-[80%] h-[80%] bg-[#C7ECFF] rounded-[30px] p-5 opacity-[81%] justify-between items-center py-[72px]">
            <Logo />
            <h1 className="text-[64px] font-bold">WELCOME</h1>
            <div>
                <a href="/entree"><Boutton className="bg-[#0004FF] cursor-pointer" text="Entrée" /></a>
                <Boutton className="bg-[#F00000] mt-[45px] cursor-pointer" text="Sortie" />
            </div>
        </div>
    </div>
  )
}

export default Welcome