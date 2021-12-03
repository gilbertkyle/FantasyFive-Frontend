import React from "react";

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "number" | "text";
    pick: any;
    index: number;
    position?: "qb" | "rb" | "wr" | "te" | "defense";
    children: React.ReactNode;
  }

export interface Player {
    id: string;
    name: string;
    position: string;
    team: string;
  }