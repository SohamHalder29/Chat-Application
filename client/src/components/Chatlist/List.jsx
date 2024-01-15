import { useStateProvider } from "@/context/StateContext";
import { GET_INITIAL_CONTACT_ROUTE } from "@/utils/ApiRoutes";

import React, { useEffect } from "react";
import axios from "axios";
import { reducerCases } from "@/context/constants";
import ChatListItem from "./ChatListItem";

const List = () => {
  const [{ userInfo, userContacts, filteredContacts }, dispatch] =
    useStateProvider();

  useEffect(() => {
    const getContact = async () => {
      try {
        const {
          data: { users, onlineUser },
        } = await axios(`${GET_INITIAL_CONTACT_ROUTE}/${userInfo?.id}`);

        dispatch({ type: reducerCases.SET_ONLINE_CONTACTS, onlineUser });
        dispatch({ type: reducerCases.SET_USER_CONTACTS, userContacts: users });
      } catch (error) {
        console.log(error);
      }
    };
    if (userInfo?.id) getContact();
  }, [userInfo]);

  return (
    <div
      className={
        "bg-search-input-container-background flex-auto overflow-auto max-h-full custom-scollbar"
      }>
      {filteredContacts && filteredContacts.length > 0
        ? filteredContacts.map((contact) => (
            <ChatListItem data={contact} key={contact.id} />
          ))
        : userContacts.map((contact) => (
            <ChatListItem data={contact} key={contact.id} />
          ))}
    </div>
  );
};

export default List;
