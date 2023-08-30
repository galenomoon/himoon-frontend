import React from "react";

interface ToggleProps {
  isActive: boolean;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Toggle({ isActive, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!isActive)}
      className={`w-[45px] h-[24px] px-[3px] py-[4px] border-2 flex items-center flex-shrink-0 transition-colors rounded-full duration-200 ${!isActive ? "bg-[#DCDCDC] border-[#636363]" : "dark:border-blue-300 dark:bg-blue-300/60 border-blue-800 bg-blue-600/60"}`}
    >
      <div className={`w-[18px] h-[18px] border-2  flex-shrink-0 rounded-full  duration-100 ease-in-out ${!isActive ? "-translate-x-[1px] border-[#636363] " : "border-blue-800 dark:border-blue-300 translate-x-[18px]"} bg-white dark:bg-gray-800`} />
    </button>
  )
}