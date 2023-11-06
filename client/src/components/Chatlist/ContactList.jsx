import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import ChatListItem from "./ChatListItem";

const ContactList = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [{}, dispatch] = useStateProvider();
  useEffect(() => {
    const getContacts = async () => {
      try {
        const {
          data: { user },
        } = await axios.get(GET_ALL_CONTACTS);
        setAllContacts(user);
      } catch (err) {
        console.log(err);
      }
    };
    getContacts();
  }, []);

  return (
    <div className={"h-full flex flex-col"}>
      <div className={"h-16 flex items-end px-3 py-6"}>
        <div className={"flex items-center gap-12 text-white"}>
          <BiArrowBack
            className={"cursor-pointer text-xl"}
            onClick={() =>
              dispatch({ type: reducerCases.SET_ALL_CONTACT_PAGE })
            }
          />
          <span> New Chat </span>
        </div>
      </div>
      <div
        className={
          "bg-search-input-container-background h-full flex flex-col flex-auto overflow-auto custom-scollbar "
        }>
        <div className={"flex gap-3 py-3 px-2 h-14 items-center w-full"}>
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
                placeholder={"Search Contacts"}
                className={
                  "bg-transparent text-sm focus:outline-none text-white w-full"
                }
              />
            </div>
          </div>
        </div>
        {Object.entries(allContacts).map(([initialLetter, userList]) => {
          return (
            <div key={Date.now() + initialLetter}>
              <div className={"text-teal-light px-2 py-5"}>
              {
                initialLetter
              }
                {
                  userList.map( (contact) => {
                    return ( <ChatListItem data={contact} isContactPage={true} key={contact.id}  />)
                  } )
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactList;
