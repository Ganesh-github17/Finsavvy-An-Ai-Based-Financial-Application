import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Trash2, Plus } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('financialNotes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  useEffect(() => {
    localStorage.setItem('financialNotes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        date: new Date().toLocaleDateString()
      };
      setNotes([note, ...notes]);
      setNewNote({ title: '', content: '' });
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-dark-gradient text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-accent-blue to-accent-purple text-transparent bg-clip-text">
          Financial Notes
        </h2>

        <div className="bg-dark-card rounded-xl p-6 mb-8 border border-gray-800">
          <input
            type="text"
            placeholder="Note Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            className="w-full bg-dark-lighter text-white border-gray-700 rounded-lg mb-4 focus:ring-primary focus:border-primary"
          />
          <textarea
            placeholder="Write your note..."
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            className="w-full bg-dark-lighter text-white border-gray-700 rounded-lg mb-4 h-32 focus:ring-primary focus:border-primary"
          />
          <button
            onClick={addNote}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-neon"
          >
            <Plus size={20} />
            Add Note
          </button>
        </div>

        <div className="grid gap-6">
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-dark-card rounded-xl p-6 border border-gray-800"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{note.title}</h3>
                  <p className="text-sm text-gray-400">{note.date}</p>
                </div>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-gray-400 hover:text-accent-pink transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <p className="text-gray-300 whitespace-pre-wrap">{note.content}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Notes;
