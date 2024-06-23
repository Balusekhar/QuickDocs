import React, { useState,useRef } from "react";
import Background from "./assets/components/Background";
import Header from "./assets/components/Header";
import Modal from "./assets/components/Modal";
import { NoteContext } from "./NoteContext/NoteContext";
import Card from "./assets/components/Card";

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState([]); 
  const [selectedNote, setSelectedNote] = useState(null);
  const appRef = useRef(null)

  const toggleModal = () => {
    setModalVisible((isModalVisible) => !isModalVisible);
    setSelectedNote(null)
  };

  const deleteNote = (id)=>{
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  }

  const editNote = (note)=>{
    setModalVisible(true)
    setSelectedNote(note) 
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      <div className="relative h-screen w-screen bg-zinc-800">
        <Background />
        <div ref={appRef} className="main w-full h-screen fixed z-[5]">
          <Header toggleModal={toggleModal} />
          {isModalVisible ? <Modal toggleModal={toggleModal} selectedNote={selectedNote}  /> : null}
          <div className="flex flex-wrap">
            {notes.map((note, index) => (
              <Card key={note.id} note={note} deleteNote={deleteNote} handleEdit={editNote} appRef={appRef} />
            ))}
          </div>
        </div>
      </div>
    </NoteContext.Provider>
  );
}
