import React, { useContext, useEffect } from "react";
import { NoteContext } from "../../NoteContext/NoteContext";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

function Modal({ toggleModal, selectedNote }) {
  const { setNotes, notes } = useContext(NoteContext);
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm();

  // Function to format the current date
  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    if (selectedNote) {
      // Pre-populate form fields with selectedNote values if editing
      reset({
        title: selectedNote.title,
        description: selectedNote.description,
      });
    } else {
      // Clear form fields if adding a new note
      reset();
    }
  }, [selectedNote, reset]);

  const onSubmit = (data) => {
    if (isValid) {
      if (selectedNote) {
        // Editing existing note
        const updatedNotes = notes.map((note) =>
          note.id === selectedNote.id ? { ...note, ...data } : note
        );
        setNotes(updatedNotes);
      } else {
        // Adding new note
        const newNote = {
          ...data,
          date: getCurrentDate(),
          id: uuidv4(),
        };
        setNotes((prevNotes) => [...prevNotes, newNote]);
      }
      reset();
      toggleModal();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[10]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg mx-4">
        <h2 className="text-2xl font-bold mb-4 text-white">
          {selectedNote ? "Edit Note" : "Add a Note"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-medium mb-2 text-gray-300"
            >
              Title
            </label>
            <input
              {...register("title", { required: true })}
              id="title"
              type="text"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              placeholder="Enter the title"
              defaultValue={selectedNote ? selectedNote.title : ""}
            />
            <p className="text-rose-600 p-1">
              {errors.title && <span>This field is required</span>}
            </p>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-lg font-medium mb-2 text-gray-300"
            >
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              id="description"
              className="w-full p-2 h-32 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              placeholder="Enter the description"
              defaultValue={selectedNote ? selectedNote.description : ""}
            />
            <p className="text-rose-600 p-1">
              {errors.description && <span>This field is required</span>}
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={toggleModal}
              className="text-white font-semibold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-zinc-600 hover:bg-zinc-900 text-white font-semibold py-2 px-4 rounded"
            >
              {selectedNote ? "Save" : "Add Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;