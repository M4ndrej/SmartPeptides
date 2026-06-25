"use client";

import { useState } from "react";
import DeleteProfileModal from "./DeleteProfileModal";

const DeleteProfileButton = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  return (
    <>
      <div
        className="font-D16px-M14px cursor-pointer select-none font-medium text-gray2 hover:text-gray"
        onClick={() => setIsDeleteOpen(true)}
      >
        Delete account
      </div>
      <DeleteProfileModal isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} />
    </>
  );
};

export default DeleteProfileButton;
