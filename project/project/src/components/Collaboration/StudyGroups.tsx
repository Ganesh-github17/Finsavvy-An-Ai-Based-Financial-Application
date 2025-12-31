import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Plus, Book } from 'lucide-react';

interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
}

interface StudyGroup {
  id: number;
  name: string;
  course_id: string;
  members: string[];
  messages: Message[];
}

const StudyGroups: React.FC = () => {
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudyGroups();
  }, []);

  const fetchStudyGroups = async () => {
    try {
      const response = await fetch('/api/collaboration/study-groups');
      const data = await response.json();
      setGroups(data);
    } catch (err) {
      setError('Failed to fetch study groups');
    }
  };

  const createStudyGroup = async () => {
    if (!newGroupName.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/collaboration/study-groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newGroupName,
          creator_id: localStorage.getItem('userId'),
          course_id: '1', // Replace with actual course ID
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create study group');
      }

      setGroups([...groups, data]);
      setNewGroupName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Study Groups List */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600" />
                Study Groups
              </h2>

              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="New group name"
                    className="flex-1 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <button
                    onClick={createStudyGroup}
                    disabled={loading}
                    className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {groups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGroup(group)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      selectedGroup?.id === group.id
                        ? 'bg-purple-100 text-purple-900'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{group.name}</span>
                      <span className="text-sm text-gray-500">
                        {group.members.length} members
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2">
            {selectedGroup ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg h-[600px] flex flex-col"
              >
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
                    {selectedGroup.name}
                  </h3>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedGroup.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.userId === localStorage.getItem('userId')
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.userId === localStorage.getItem('userId')
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <span className="text-xs opacity-75">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                    <button
                      onClick={() => {
                        // Handle sending message
                      }}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-lg p-8 text-center"
              >
                <Book className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Select a Study Group
                </h3>
                <p className="text-gray-600">
                  Choose a study group from the list to start collaborating with your peers.
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyGroups;
