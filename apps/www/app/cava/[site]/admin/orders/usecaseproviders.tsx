"use client";

import { useState } from "react";
import { UsecaseContext, RoomUseCases } from "./usecasecontext";


type Props = {
  children?: React.ReactNode;
};

export const UsercaseProvider = ({ children }: Props) => {

  const [provision, setprovision] = useState(false);
  const [showDeleteComponent, setshowDeleteComponent] = useState(false);
  const [sharepointId, setSharepointId] = useState(0);
  const usecases: RoomUseCases = {

    ProvisionRoom: function (sharepointId: number): void {
      setSharepointId(sharepointId);
      setprovision(true);
    },
    DeleteRoom: function (sharepointId: number): void {
      setSharepointId(sharepointId);
      setshowDeleteComponent(true);
    }
  }
  return <UsecaseContext.Provider value={usecases}>


    {children}


  </UsecaseContext.Provider>;
};
