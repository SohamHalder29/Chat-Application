import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { calculateTime } from "@/utils/CalculateTime";
import React,{useState, useEffect} from "react";
import { icons } from "react-icons";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

const SearchMessages = () => {
  const [{ currentChatUser, messages }, dispatch] = useStateProvider();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchMessages,setSearchMessages] = useState([]);

  useEffect(()=>{
    if(searchTerm){
      setSearchMessages(messages.filter(message => message.type === "text" && message.message.includes(searchTerm)))
    }else{
      setSearchMessages([]);
    }
  },[ searchTerm]);

  return (
    <div
      className={
        "border-conversation-border border-l w-full bg-conversation-panel-background flex flex-col z-10 max-h-screen"
      }>
      <div
        className={
          "h-16 px-6 py-5 flex gap-10 items-center bg-panel-header-background text-primary-strong"
        }>
        <IoClose
          className={"cursor-pointer text-icon-lighter text-2xl"}
          onClick={() => dispatch({ type: reducerCases.SET_MESSAGES_SEARCH })}
        />
        <span> Search Messages</span>
      </div>
      <div className={"overflow-auto h-full custom-scollbar"}>
        <div className={"flex items-center flex-col w-full"}>
          <div className={"flex items-center gap-3 px-5 h-14 w-full"}>
            <div
              className={
                "bg-panel-header-background flex items-center gap-5 px-3 py-3 rounded-lg flex-grow"
              }>
              <div>
                <BiSearchAlt2
                  className={"text-panel-header-icon cursor-pointer text-lg"}
                />
              </div>
              <div className={"w-[90%]"}>
                <input
                  type={"text"}
                  placeholder={"Search Messages"}
                  className={
                    "bg-transparent text-sm focus:outline-none text-white w-full"
                  }
                  value={searchTerm}
                  onChange={(e)=> setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <span className={"mt-10 text-secondary"} >
            {!searchTerm.length && `Search for messages with ${currentChatUser.name}`}
          </span>
        </div>
        <div className={"flex justify-center h-full flex-col"} >
          {
            searchTerm.length >0 && !searchMessages.length && <span className={"text-secondary flex justify-center w-full"} >
              No Messages found
            </span>
          }
          <div className={"flex flex-col w-full h-full"} >
            { searchMessages.map((message)=> <div className={"flex cursor-pointer flex-col justify-center hover:bg-background-default-hover w-full px-5 boder-[0.1px] border-secondary py-5"} >
              <div className={" text-sm text-secondary"} > {calculateTime(message.createAt)} </div>
              <div className={"text-icon-green"} > {message.message}</div>
               </div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMessages;
