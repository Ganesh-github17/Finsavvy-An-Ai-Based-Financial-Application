import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MessageSquare, Plus, X } from 'lucide-react';

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  messages: Message[];
}

interface Message {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
}

const StudyGroups: React.FC = () => {
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);
  const [message, setMessage] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchStudyGroups();
  }, []);

  const fetchStudyGroups = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/study-groups');
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error('Error fetching study groups:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedGroup) return;

    try {
      const response = await fetch(`http://localhost:5000/api/study-groups/${selectedGroup.id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: message,
        }),
      });

      if (response.ok) {
        fetchStudyGroups();
        setMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleCreateGroup = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/study-groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGroup),
      });

      if (response.ok) {
        setShowCreateModal(false);
        setNewGroup({ name: '', description: '' });
        fetchStudyGroups();
      }
    } catch (error) {
      console.error('Error creating study group:', error);
    }
  };

  return (
    <div className="flex h-full bg-gray-900">
      {/* Study Groups List */}
      <div className="w-64 bg-gray-800 p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Study Groups</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          {groups.map((group) => (
            <motion.div
              key={group.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedGroup(group)}
              className={`p-3 rounded-lg cursor-pointer ${
                selectedGroup?.id === group.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
            >
              <div className="font-medium">{group.name}</div>
              <div className="text-sm opacity-75 flex items-center mt-1">
                <Users className="w-4 h-4 mr-1" />
                {group.members} members
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedGroup ? (
        <div className="flex-1 flex flex-col">
          <div className="p-4 bg-gray-800 border-b border-gray-700">
            <h3 className="text-lg font-bold text-white">{selectedGroup.name}</h3>
            <p className="text-gray-400 text-sm">{selectedGroup.description}</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {selectedGroup.messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gray-800 rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-blue-400">{msg.username}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-200">{msg.content}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="p-4 bg-gray-800 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a study group to start chatting
        </div>
      )}

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 rounded-lg p-6 w-96"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Create Study Group</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Group Name
                </label>
                <input
                  type="text"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  rows={3}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleCreateGroup}
                disabled={!newGroup.name.trim()}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Create Group
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default StudyGroups;
