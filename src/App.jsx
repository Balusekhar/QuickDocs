import React, { useState } from "react";
import Background from "./assets/components/Background";
import Header from "./assets/components/Header";
import Modal from "./assets/components/Modal";
import { NoteContext } from "./NoteContext/NoteContext";
import Card from "./assets/components/Card";

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState([]); 

  const toggleModal = () => {
    setModalVisible((isModalVisible) => !isModalVisible);
  };

  const deleteNote = (id)=>{
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    console.log("Deleted note:", noteToDelete);
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      <div className="relative h-screen w-screen bg-zinc-800">
        <Background />
        <div className="main w-full h-screen fixed z-[5]">
          <Header toggleModal={toggleModal} />
          {isModalVisible ? <Modal toggleModal={toggleModal} /> : null}
          <div className="flex flex-wrap">
            {notes.map((note, index) => (
              <Card key={index} note={note} deleteNote={deleteNote}  />
            ))}
          </div>
        </div>
      </div>
    </NoteContext.Provider>
  );
}
