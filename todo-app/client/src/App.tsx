import React, { useState, ChangeEventHandler, useEffect } from "react";
import NoteItem from "./components/NoteItem";
import axios from "axios";

type noteType = {
  id: string;
  title: string;
  description?: string;
};

// let title = "";
const App = () => {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");

  const [count, setCount] = useState(0);
  const [noteToView, setNoteToView] = useState<noteType>();
  const [notes, setNotes] = useState<noteType[]>([]);
  const [values, setValues] = useState({
    title: "",
    description: "",
  });
  const [selectedNoteId, setSelectedNoteId] = useState("");

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    const fetchNotes = async () => {
      // call the api and fetch notes
      const { data } = await axios("http://localhost:3000/");
      setNotes(data.notes);
    };

    fetchNotes();
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <form
        onSubmit={async (evt) => {
          evt.preventDefault();
          if (selectedNoteId) {
            // then we want to update
            const { data } = await axios.patch(
              "http://localhost:3000/" + selectedNoteId,
              {
                title: values.title,
                description: values.description,
              }
            );

            const updatedNotes = notes.map((note) => {
              if (note.id === selectedNoteId) {
                note.title = data.note.title;
                note.description = data.note.description;
              }
              return note;
            });

            setNotes([...updatedNotes]);
            setValues({ title: "", description: "" });
            return;
          }

          const { data } = await axios.post(
            "http://localhost:3000/create",
            {
              title: values.title,
              description: values.description,
            }
          );
          setNotes([data.note, ...notes]);
          setValues({ title: "", description: "" });
        }}
        className="space-y-6 bg-white shadow-md rounded p-5"
      >
        <div>
          <span>{count} </span>
          <button type="button" onClick={() => setCount(count + 1)}>
            Click Me
          </button>
        </div>
        <h1 className="font-semibold text-2xl text-center">Note Application</h1>
        <div>
          <input
            placeholder="Title"
            type="text"
            className="w-full border-b-2 border-gray-700 outline-none"
            onChange={handleChange}
            value={values.title}
            name="title"
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            className="w-full border-b-2 border-gray-700 outline-none resize-none h-36"
            value={values.description}
            onChange={handleChange}
            name="description"
          ></textarea>
        </div>
        <div className="text-right">
          <button className="bg-blue-500 text-white px-5 py-2 rounded">
            Submit
          </button>
        </div>
      </form>

      {/* Note Items */}

      {notes.map((note) => {
        return (
          <NoteItem
            onViewClick={() => {
              if (noteToView) {
                setNoteToView(undefined);
              } else {
                setNoteToView(note);
              }
            }}
            description={
              noteToView?.id === note.id ? noteToView?.description : ""
            }
            onEditClick={() => {
              setSelectedNoteId(note.id);
              setValues({
                title: note.title,
                description: note.description || "",
              });
            }}
            onDeleteClick={async () => {
              const result = confirm("Are you sure?");
              if (result) {
                // delete
                await axios.delete("http://localhost:3000/" + note.id);

                // const updatedNotes = notes.filter(({ id }) => {
                //   if (id !== note.id) return note;
                // });
                const updatedNotes = notes.filter(({ id }) => id !== note.id);

                setNotes([...updatedNotes]);
              }
            }}
            key={note.id}
            title={note.title}
          />
        );
      })}
    </div>
  );
};

export default App;
