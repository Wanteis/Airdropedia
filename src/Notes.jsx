import React, { useState } from 'react';

const Notes = () => {
  const [notes, setNotes] = useState([
    { text: 'Sample note 1' },
    { text: 'Sample note 2' },
  ]);
  const [input, setInput] = useState('');

  const addNote = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setNotes([...notes, { text: input }]);
      setInput('');
    }
  };

  const removeNote = (idx) => {
    setNotes(notes.filter((_, i) => i !== idx));
  };

  return (
    <div className="bg-[#181f33] p-6 rounded-xl shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-[#8bb6f9]">My Notes</h2>
      <form onSubmit={addNote} className="flex gap-2 mb-4">
        <input
          className="flex-1 px-3 py-2 rounded-lg bg-[#232b47] text-white border border-[#232b47] focus:outline-none"
          type="text"
          placeholder="Add a new note..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-accent2 text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent transition"
        >
          Add
        </button>
      </form>
      <ul className="space-y-2">
        {notes.map((note, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#232b47]"
          >
            <span className="flex-1">{note.text}</span>
            <button
              className="ml-4 text-red-400 hover:text-red-600"
              onClick={() => removeNote(idx)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
