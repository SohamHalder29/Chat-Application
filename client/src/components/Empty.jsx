import Image from "next/image";
import React from "react";

const Empty = () => {
  return (
    <div
      className={
        "border-1 border-conversation-border w-full bg-panel-header-background flex flex-col h-[100vh] border-b-4 border-b-icon-green justify-center items-center"
      }>
      <Image src={"/whatsapp.gif"} alt={"whatsapp"} priority height={300} width={300} />
    </div>
  );
};

export default Empty;
