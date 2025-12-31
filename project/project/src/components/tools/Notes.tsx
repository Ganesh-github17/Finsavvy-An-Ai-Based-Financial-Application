import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Book,
  Save,
  Download,
  Clock,
  Plus,
  X
} from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const handleSaveNote = () => {
    if (newNote.title && newNote.content) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        timestamp: new Date().toLocaleString()
      };
      setNotes([...notes, note]);
      setNewNote({ title: '', content: '' });
      setShowAddNote(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Financial Notes</h2>
        <button
          onClick={() => setShowAddNote(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Add Note
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-lighter rounded-lg p-4 space-y-2"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium">{note.title}</h3>
              <button className="text-gray-400 hover:text-white">
                <Download className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-400 text-sm whitespace-pre-wrap">
              {note.content}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              {note.timestamp}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Note Modal */}
      {showAddNote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-card rounded-xl p-6 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Add New Note</h3>
              <button
                onClick={() => setShowAddNote(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Title</label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) =>
                    setNewNote({ ...newNote, title: e.target.value })
                  }
                  className="w-full bg-dark-lighter border border-gray-700 rounded-lg px-4 py-2"
                  placeholder="Enter note title"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Content</label>
                <textarea
                  value={newNote.content}
                  onChange={(e) =>
                    setNewNote({ ...newNote, content: e.target.value })
                  }
                  className="w-full h-40 bg-dark-lighter border border-gray-700 rounded-lg px-4 py-2 resize-none"
                  placeholder="Enter note content"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveNote}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <Save className="w-4 h-4" />
                  Save Note
                </button>
                <button
                  onClick={() => setShowAddNote(false)}
                  className="flex-1 border border-gray-700 hover:bg-dark-lighter px-4 py-2 rounded-lg transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {notes.length === 0 && !showAddNote && (
        <div className="text-center py-12 text-gray-400">
          <Book className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No notes yet. Click "Add Note" to create your first note.</p>
        </div>
      )}
    </div>
  );
};

export default Notes;
