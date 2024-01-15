import { useStateProvider } from "@/context/StateContext";
import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFilter } from "react-icons/bs"
const SearchBar = () => {

  return (
    <div
      className={
        "bg-search-input-container-background flex py-3 px-5 items-center gap-3 h-16 "
      }>
      <div
        className={
          "bg-panel-header-background flex items-center gap-5 px-3 py-3 rounded-lg flex-grow"
        }>
        <div>
          <BiSearchAlt2
            className={"text-panel-header-icon cursor-pointer text-lg"}
          />
        </div>
        <div className={'w-[90%]'} >
          <input
            type={"text"}
            placeholder={"Search or start a new Chat"}
            className={
              "bg-transparent text-sm focus:outline-none text-white w-full"
            }
          />
        </div>
      </div>
      <div >
      <BsFilter className={"text-panel-header-icon cursor-pointer text-lg"} />
      </div>
    </div>
  );
};

export default SearchBar;
