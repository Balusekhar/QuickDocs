import React, { useState } from "react";
import Background from "./assets/components/Background";
import Header from "./assets/components/Header";
import Modal from "./assets/components/Modal"; // Ensure you import the Modal component

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible((isModalVisible) => !isModalVisible);
    console.log(isModalVisible)
  };

  return (
    <div className="relative h-screen w-screen bg-zinc-800">
      <Background />
      <div className="main w-full h-screen fixed z-[5]">
        <Header toggleModal={toggleModal} />
        {isModalVisible ? <Modal toggleModal={toggleModal}/> : null}
      </div>
    </div>
  );
}