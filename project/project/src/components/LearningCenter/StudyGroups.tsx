import React, { useState } from 'react';
import { Users, MessageSquare, Send, Plus, UserPlus, X } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
}

interface Group {
  id: number;
  name: string;
  description: string;
  members: string[];
  messages: Message[];
  course: string;
}

const sampleGroups: Group[] = [
  {
    id: 1,
    name: 'Financial Basics Study Group',
    description: 'Discussion group for beginners learning financial fundamentals',
    members: ['John Doe', 'Jane Smith', 'Mike Johnson'],
    course: 'Financial Basics',
    messages: [
      {
        id: 1,
        text: 'Hey everyone! Ready to study financial basics?',
        sender: 'John Doe',
        timestamp: new Date(),
      },
    ],
  },
  {
    id: 2,
    name: 'Investment Strategies Group',
    description: 'Group for discussing various investment strategies',
    members: ['Sarah Wilson', 'Tom Brown', 'Emily Davis'],
    course: 'Investment Strategies',
    messages: [],
  },
];

const StudyGroups: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>(sampleGroups);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    course: '',
  });

  const handleCreateGroup = () => {
    if (!newGroup.name.trim() || !newGroup.course.trim()) return;

    const group: Group = {
      id: Date.now(),
      name: newGroup.name,
      description: newGroup.description,
      course: newGroup.course,
      members: ['You'], // Add current user as first member
      messages: [],
    };

    setGroups(prevGroups => [...prevGroups, group]);
    setNewGroup({ name: '', description: '', course: '' });
    setShowCreateModal(false);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedGroup) return;

    const message: Message = {
      id: Date.now(),
      text: newMessage,
      sender: 'You',
      timestamp: new Date(),
    };

    const updatedGroup = {
      ...selectedGroup,
      messages: [...selectedGroup.messages, message],
    };

    setGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === selectedGroup.id ? updatedGroup : group
      )
    );

    setSelectedGroup(updatedGroup);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Groups List */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Study Groups</h2>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {groups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGroup(group)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedGroup?.id === group.id
                        ? 'bg-blue-600'
                        : 'bg-gray-700/50 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{group.name}</h3>
                        <p className="text-sm text-gray-400 mt-1">{group.description}</p>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{group.members.length}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {selectedGroup ? (
              <div className="bg-gray-800 rounded-2xl shadow-xl h-[800px] flex flex-col">
                {/* Group Header */}
                <div className="p-6 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedGroup.name}</h2>
                      <p className="text-gray-400">{selectedGroup.course}</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white transition-colors">
                      <UserPlus className="w-5 h-5" />
                      Invite
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {selectedGroup.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-xl p-4 ${
                          message.sender === 'You'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{message.sender}</span>
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p>{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-700">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 bg-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Send
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-2xl p-8 shadow-xl h-[800px] flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Select a Group</h3>
                  <p className="text-gray-400">Choose a study group to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyGroups;
