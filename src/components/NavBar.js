import React, { useState } from "react";
import { FaComments, FaUser } from "react-icons/fa";
import Modal from "./Modal";
import ProfilePictureUpload from "./ProfilePictureUpload";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  return (
    <div className="h-screen p-3 bg-blue-900 text-white w-64 fixed left-0 top-0">
      <div className="flex flex-col items-center">
        <button
          onClick={handleModalOpen}
          className="mb-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Upload Profile Picture
        </button>
        <a
          href="/"
          className="flex items-center mb-6 p-2 text-white hover:bg-blue-700 rounded w-full"
        >
          <FaUser className="mr-2" />
          <span>User Table</span>
        </a>
        <a
          href="/chat"
          className="flex items-center mb-6 p-2 text-white hover:bg-blue-700 rounded w-full"
        >
          <FaComments className="mr-2" />
          <span>Chat</span>
        </a>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <ProfilePictureUpload />
      </Modal>
    </div>
  );
};

export default Navbar;
