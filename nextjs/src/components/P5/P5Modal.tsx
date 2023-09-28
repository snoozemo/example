"use client";

import Modal from "react-modal";
// import { useState } from "react";
Modal.setAppElement("body");
const style: ReactModal.Props["style"] = {
  overlay: {
    backgroundColor: "rgba(241, 16, 16, 0.5)",
  },
  // content: {
  //   backgroundColor: "transparent",
  //   border: "none",
  //   padding: 0,
  //   inset: 0,
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
};
export function P5Modal({ children, ...props }: ReactModal.Props) {
  return (
    <Modal {...props} style={style}>
      {children}
    </Modal>
  );
}
