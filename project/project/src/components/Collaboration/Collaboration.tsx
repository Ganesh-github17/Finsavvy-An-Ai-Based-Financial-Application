import React, { useState, useEffect } from 'react';
import { UserCircle, Users, MessageSquare, Plus, FileText, Link as LinkIcon } from 'lucide-react';

interface StudyGroup {
  id: number;
  name: string;
  description: string;
  members: number[];
  topics: string[];
  messages: Message[];
  resources: Resource[];
}

interface Message {
  id: number;
  user_id: number;
  content: string;
  timestamp: string;
}

interface Resource {
  id: number;
  title: string;
  type: 'link' | 'file' | 'note';
  content: string;
  added_by: number;
  added_at: string;
}

const Collaboration = () => {
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [newResource, setNewResource] = useState({
    title: '',
    type: 'note' as const,
    content: '',
  });
  const [showNewGroupForm, setShowNewGroupForm] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    topics: [''],
  });

  // Simulated user ID (replace with actual user authentication)
  const currentUserId = 1;

  useEffect(() => {
    // Fetch user's study groups
    fetchStudyGroups();
  }, []);

  const fetchStudyGroups = async () => {
    try {
      const response = await fetch(`/api/collaboration/groups/list?user_id=${currentUserId}`);
      const data = await response.json();
      setGroups(data.groups);
    } catch (error) {
      console.error('Error fetching study groups:', error);
    }
  };

  const handleCreateGroup = async () => {
    try {
      const response = await fetch('/api/collaboration/groups/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: currentUserId,
          name: newGroup.name,
          description: newGroup.description,
          topics: newGroup.topics.filter(topic => topic.trim() !== ''),
        }),
      });
      const data = await response.json();
      fetchStudyGroups();
      setShowNewGroupForm(false);
      setNewGroup({ name: '', description: '', topics: [''] });
    } catch (error) {
      console.error('Error creating study group:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedGroup || !newMessage.trim()) return;

    try {
      const response = await fetch('/api/collaboration/groups/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          group_id: selectedGroup.id,
          user_id: currentUserId,
          content: newMessage,
        }),
      });
      const data = await response.json();
      setSelectedGroup({
        ...selectedGroup,
        messages: [...selectedGroup.messages, data.message],
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleAddResource = async () => {
    if (!selectedGroup || !newResource.title.trim() || !newResource.content.trim()) return;

    try {
      const response = await fetch('/api/collaboration/groups/resources/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          group_id: selectedGroup.id,
          user_id: currentUserId,
          ...newResource,
        }),
      });
      const data = await response.json();
      setSelectedGroup({
        ...selectedGroup,
        resources: [...selectedGroup.resources, data.resource],
      });
      setNewResource({ title: '', type: 'note', content: '' });
    } catch (error) {
      console.error('Error adding resource:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Study Groups</h1>
            <button
              onClick={() => setShowNewGroupForm(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Create New Group
            </button>
          </div>

          {showNewGroupForm && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Create New Study Group</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Group Name"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <textarea
                  placeholder="Group Description"
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Topics</label>
                  {newGroup.topics.map((topic, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => {
                          const newTopics = [...newGroup.topics];
                          newTopics[index] = e.target.value;
                          setNewGroup({ ...newGroup, topics: newTopics });
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Enter a topic"
                      />
                      {index === newGroup.topics.length - 1 && (
                        <button
                          onClick={() => setNewGroup({ ...newGroup, topics: [...newGroup.topics, ''] })}
                          className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
                        >
                          <Plus size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleCreateGroup}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    Create Group
                  </button>
                  <button
                    onClick={() => setShowNewGroupForm(false)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-8">
            {/* Groups List */}
            <div className="col-span-1 space-y-4">
              {groups.map((group) => (
                <div
                  key={group.id}
                  onClick={() => setSelectedGroup(group)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedGroup?.id === group.id
                      ? 'bg-indigo-50 border-2 border-indigo-500'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <h3 className="font-semibold text-lg mb-2">{group.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{group.description}</p>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Users size={16} />
                    <span>{group.members.length} members</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Group Details */}
            {selectedGroup ? (
              <div className="col-span-2 bg-gray-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">{selectedGroup.name}</h2>

                {/* Messages */}
                <div className="bg-white rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Messages</h3>
                  <div className="space-y-4 max-h-60 overflow-y-auto mb-4">
                    {selectedGroup.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-start gap-3 ${
                          message.user_id === currentUserId ? 'flex-row-reverse' : ''
                        }`}
                      >
                        <UserCircle className="w-8 h-8 text-gray-400" />
                        <div
                          className={`rounded-lg p-3 max-w-[70%] ${
                            message.user_id === currentUserId
                              ? 'bg-indigo-500 text-white'
                              : 'bg-gray-100'
                          }`}
                        >
                          <p>{message.content}</p>
                          <span className="text-xs opacity-70">
                            {new Date(message.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                    >
                      Send
                    </button>
                  </div>
                </div>

                {/* Resources */}
                <div className="bg-white rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Resources</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {selectedGroup.resources.map((resource) => (
                      <div key={resource.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          {resource.type === 'link' ? (
                            <LinkIcon className="w-5 h-5 text-blue-500" />
                          ) : (
                            <FileText className="w-5 h-5 text-green-500" />
                          )}
                          <h4 className="font-medium">{resource.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600">{resource.content}</p>
                        <span className="text-xs text-gray-500">
                          Added {new Date(resource.added_at).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={newResource.title}
                      onChange={(e) =>
                        setNewResource({ ...newResource, title: e.target.value })
                      }
                      placeholder="Resource Title"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <select
                      value={newResource.type}
                      onChange={(e) =>
                        setNewResource({
                          ...newResource,
                          type: e.target.value as 'link' | 'file' | 'note',
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="note">Note</option>
                      <option value="link">Link</option>
                      <option value="file">File</option>
                    </select>
                    <textarea
                      value={newResource.content}
                      onChange={(e) =>
                        setNewResource({ ...newResource, content: e.target.value })
                      }
                      placeholder="Resource Content"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <button
                      onClick={handleAddResource}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                    >
                      Add Resource
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-span-2 bg-gray-50 rounded-lg p-6 flex items-center justify-center">
                <p className="text-gray-500">Select a group to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
