import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

const ContactList = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [{}, dispatch] = useStateProvider();
  useEffect(() => {
    const getContacts = async () => {
      try {
        const {
          data: { users },
        } = await axios.get(GET_ALL_CONTACTS);
        setAllContacts(users);
      } catch (err) {
        console.log(err);
      }
    };
    getContacts();
  }, []);

  return (
    <div className={"h-full flex flex-col"}>
      <div className={"h-24 flex items-end px-3 py-4"}>
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
    </div>
  );
};

export default ContactList;
