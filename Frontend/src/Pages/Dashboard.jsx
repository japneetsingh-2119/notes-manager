import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const priorities = ["Low", "Medium", "High"];
const API_URL = "https://notes-manager-jwg7-aey960niy-japneets-projects-0990ce35.vercel.app/api/notes";

export default function NoteManager() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [editNote, setEditNote] = useState({
    id: null,
    title: "",
    description: "",
    priority: "Medium",
  });

  // Fetch notes from API
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        if (res.data.result === "success") {
          const formatted = res.data.data.map((n) => ({ ...n, id: n._id }));
          setNotes(formatted);
        }
      })
      .catch(console.error);
  }, []);

  // Filtered + sorted notes
  const filteredNotes = useMemo(() => {
    return notes
      .filter((note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.description.toLowerCase().includes(search.toLowerCase())
      )
      .filter((note) =>
        filterPriority === "all" ? true : note.priority === filterPriority
      )
      .sort((a, b) => {
        const order = { High: 1, Medium: 2, Low: 3 };
        return order[a.priority] - order[b.priority];
      });
  }, [notes, search, filterPriority]);

  // Add Note (both title and description required)
  const handleAddNote = async () => {
    if (!newNote.title.trim()) return alert("Note title is required");
    if (!newNote.description.trim()) return alert("Note description is required");
    try {
      const res = await axios.post(`${API_URL}/createNote`, newNote);
      if (res.data.result === "success") {
        setNotes([{ ...res.data.data, id: res.data.data._id }, ...notes]);
        setNewNote({ title: "", description: "", priority: "Medium" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      if (res.data.result === "success") {
        setNotes(notes.filter((note) => note.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Edit Start
  const handleEditStart = (note) => {
    setEditNote({
      id: note.id,
      title: note.title,
      description: note.description,
      priority: note.priority,
    });
  };

  // Edit Save (both title and description required)
  const handleEditSave = async () => {
    if (!editNote.title.trim()) return alert("Note title is required");
    if (!editNote.description.trim()) return alert("Note description is required");
    try {
      const res = await axios.put(`${API_URL}/${editNote.id}`, editNote);
      if (res.data.result === "success") {
        setNotes(
          notes.map((note) =>
            note.id === editNote.id ? { ...note, ...editNote } : note
          )
        );
        setEditNote({ id: null, title: "", description: "", priority: "Medium" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCancel = () =>
    setEditNote({ id: null, title: "", description: "", priority: "Medium" });

  return (
  <div className="w-full min-h-screen bg-gray-900 text-gray-100 p-6">
    <h1 className="text-3xl font-bold mb-6 text-center text-white">📝 Note Manager</h1>

    {/* Add Note */}
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 text-gray-800 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Note</h2>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Note title *"
          className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-gray-700 outline-none"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="Note description *"
          className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-gray-700 outline-none"
          rows={3}
          value={newNote.description}
          onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
        />
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <select
            className="border rounded-xl px-4 py-2 w-full sm:w-auto focus:ring-2 focus:ring-gray-700 outline-none"
            value={newNote.priority}
            onChange={(e) => setNewNote({ ...newNote, priority: e.target.value })}
          >
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddNote}
            className="bg-gray-800 text-white px-6 py-2 rounded-xl hover:scale-105 transition-transform w-full sm:w-auto shadow"
          >
            ➕ Add Note
          </button>
        </div>
      </div>
    </div>

    {/* Search & Filter */}
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3 max-w-6xl mx-auto">
      <input
        type="search"
        placeholder="🔍 Search notes..."
        className="border rounded-xl px-4 py-2 w-full sm:w-80 focus:ring-2 focus:ring-gray-200 outline-none text-white bg-gray-800"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex gap-3">
        {["all", ...priorities].map((p) => (
          <button
            key={p}
            onClick={() => setFilterPriority(p)}
            className={`px-5 py-2 rounded-xl shadow ${
              filterPriority === p
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>
    </div>

    {/* Notes List - use full width */}
    <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
      {filteredNotes.length === 0 && (
        <li className="text-center text-gray-400 col-span-full">
          No notes found.
        </li>
      )}
      {filteredNotes.map((note) => (
        <li
          key={note.id}
          className="bg-white p-5 rounded-2xl shadow-md flex flex-col justify-between text-gray-800 hover:shadow-lg transition"
        >
          {editNote.id === note.id ? (
            <>
              <input
                type="text"
                value={editNote.title}
                onChange={(e) =>
                  setEditNote({ ...editNote, title: e.target.value })
                }
                className="border rounded-xl px-2 py-1 mb-2 w-full focus:ring-2 focus:ring-gray-700 outline-none"
              />
              <textarea
                value={editNote.description}
                onChange={(e) =>
                  setEditNote({ ...editNote, description: e.target.value })
                }
                className="border rounded-xl px-2 py-1 mb-2 w-full focus:ring-2 focus:ring-gray-700 outline-none"
                rows={3}
              />
              <div className="flex items-center justify-between mt-3">
                <select
                  value={editNote.priority}
                  onChange={(e) =>
                    setEditNote({ ...editNote, priority: e.target.value })
                  }
                  className="border rounded-xl px-2 py-1 focus:ring-2 focus:ring-gray-700 outline-none"
                >
                  {priorities.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={handleEditSave}
                    className="bg-green-600 text-white px-4 py-1 rounded-xl hover:bg-green-700 transition shadow"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleEditCancel}
                    className="bg-gray-400 text-white px-4 py-1 rounded-xl hover:bg-gray-500 transition shadow"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="font-semibold text-lg">{note.title}</div>
              <p className="text-gray-600 mt-1">{note.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span
                  className={`px-3 py-1 rounded-xl text-white text-sm shadow ${
                    note.priority === "High"
                      ? "bg-red-600"
                      : note.priority === "Medium"
                      ? "bg-amber-500"
                      : "bg-green-600"
                  }`}
                >
                  {note.priority}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditStart(note)}
                    className="bg-gray-700 text-white px-4 py-1 rounded-xl hover:bg-gray-800 transition shadow"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="bg-red-600 text-white px-4 py-1 rounded-xl hover:bg-red-700 transition shadow"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  </div>
);
}