import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import UserTable from "./components/UserTable";
import Chat from "./components/Chat";
import Navbar from "./components/NavBar";
import Modal from "./components/Modal";
import ProfilePictureUpload from "./components/ProfilePictureUpload";

function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex">
      <Navbar setShowModal={setShowModal} />
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-2xl font-bold mb-6">Stonks Frontend Assignment</h1>
        <Routes>
          <Route path="/" element={<UserTable />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <ProfilePictureUpload />
        </Modal>
      </div>
    </div>
  );
}

export default App;
