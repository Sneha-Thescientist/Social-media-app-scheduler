import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Edit2, Trash2, Plus, Send, BarChart3 } from 'lucide-react';

export default function SocialMediaScheduler() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeView, setActiveView] = useState('posts');
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    content: '',
    platforms: [],
    scheduledDate: '',
    scheduledTime: '',
    status: 'scheduled'
  });

  // Initialize with sample data
  useEffect(() => {
    const samplePosts = [
      {
        id: 1,
        content: 'Excited to announce our new product launch! 🚀 Check out the amazing features we\'ve built for you.',
        platforms: ['twitter', 'linkedin'],
        scheduledDate: '2025-01-15',
        scheduledTime: '10:00',
        status: 'scheduled',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        content: 'Behind the scenes of our latest photoshoot! Stay tuned for more updates.',
        platforms: ['instagram', 'facebook'],
        scheduledDate: '2025-01-10',
        scheduledTime: '14:30',
        status: 'scheduled',
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        content: 'Thank you for 10k followers! We appreciate your support.',
        platforms: ['twitter', 'facebook', 'instagram'],
        scheduledDate: '2024-12-20',
        scheduledTime: '09:00',
        status: 'published',
        createdAt: new Date().toISOString()
      }
    ];
    setPosts(samplePosts);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlatformToggle = (platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleSubmit = () => {
    if (!formData.content || !formData.scheduledDate || !formData.scheduledTime || formData.platforms.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingPost) {
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? { ...formData, id: post.id, createdAt: post.createdAt }
          : post
      ));
    } else {
      const newPost = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      setPosts([newPost, ...posts]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      content: '',
      platforms: [],
      scheduledDate: '',
      scheduledTime: '',
      status: 'scheduled'
    });
    setShowModal(false);
    setEditingPost(null);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      content: post.content,
      platforms: post.platforms,
      scheduledDate: post.scheduledDate,
      scheduledTime: post.scheduledTime,
      status: post.status
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  const getStats = () => {
    return {
      total: posts.length,
      scheduled: posts.filter(p => p.status === 'scheduled').length,
      published: posts.filter(p => p.status === 'published').length,
      draft: posts.filter(p => p.status === 'draft').length
    };
  };

  const formatDate = (date, time) => {
    const d = new Date(`${date}T${time}`);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + 
           ' at ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getPlatformColor = (platform) => {
    const colors = {
      twitter: 'bg-blue-100 text-blue-700',
      facebook: 'bg-blue-100 text-blue-800',
      instagram: 'bg-pink-100 text-pink-700',
      linkedin: 'bg-blue-100 text-blue-900'
    };
    return colors[platform] || 'bg-gray-100 text-gray-700';
  };

  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'bg-yellow-100 text-yellow-800',
      published: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-700',
      failed: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Social Media Scheduler</h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
            >
              <Plus size={20} />
              New Post
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveView('posts')}
              className={`pb-3 px-1 border-b-2 font-medium transition ${
                activeView === 'posts'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Send className="inline mr-2" size={18} />
              Posts
            </button>
            <button
              onClick={() => setActiveView('calendar')}
              className={`pb-3 px-1 border-b-2 font-medium transition ${
                activeView === 'calendar'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Calendar className="inline mr-2" size={18} />
              Calendar
            </button>
            <button
              onClick={() => setActiveView('analytics')}
              className={`pb-3 px-1 border-b-2 font-medium transition ${
                activeView === 'analytics'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <BarChart3 className="inline mr-2" size={18} />
              Analytics
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Total Posts</div>
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Scheduled</div>
            <div className="text-3xl font-bold text-yellow-600">{stats.scheduled}</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Published</div>
            <div className="text-3xl font-bold text-green-600">{stats.published}</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Drafts</div>
            <div className="text-3xl font-bold text-gray-600">{stats.draft}</div>
          </div>
        </div>

        {/* Posts View */}
        {activeView === 'posts' && (
          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
                <Send className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-600 text-lg mb-2">No posts scheduled yet</p>
                <p className="text-gray-500">Create your first post to get started</p>
              </div>
            ) : (
              posts.map(post => (
                <div key={post.id} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2 flex-wrap">
                      {post.platforms.map(platform => (
                        <span
                          key={platform}
                          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getPlatformColor(platform)}`}
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{formatDate(post.scheduledDate, post.scheduledTime)}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Calendar View */}
        {activeView === 'calendar' && (
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Calendar View</h3>
            <div className="text-gray-600">
              <p className="mb-4">Upcoming scheduled posts:</p>
              <div className="space-y-3">
                {posts
                  .filter(p => p.status === 'scheduled')
                  .sort((a, b) => new Date(`${a.scheduledDate}T${a.scheduledTime}`) - new Date(`${b.scheduledDate}T${b.scheduledTime}`))
                  .map(post => (
                    <div key={post.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-24 text-sm font-medium text-gray-700">
                        {new Date(`${post.scheduledDate}T${post.scheduledTime}`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 line-clamp-1">{post.content}</p>
                      </div>
                      <div className="flex gap-1">
                        {post.platforms.map(platform => (
                          <span key={platform} className={`px-2 py-1 rounded text-xs font-semibold capitalize ${getPlatformColor(platform)}`}>
                            {platform[0].toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics View */}
        {activeView === 'analytics' && (
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Analytics Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Posts by Platform</h4>
                {['twitter', 'facebook', 'instagram', 'linkedin'].map(platform => {
                  const count = posts.filter(p => p.platforms.includes(platform)).length;
                  return (
                    <div key={platform} className="flex justify-between items-center mb-2">
                      <span className="capitalize text-gray-600">{platform}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  );
                })}
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Status Distribution</h4>
                <div className="space-y-2">
                  {Object.entries(stats).map(([key, value]) => (
                    key !== 'total' && (
                      <div key={key} className="flex justify-between items-center">
                        <span className="capitalize text-gray-600">{key}</span>
                        <span className="font-semibold">{value}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingPost ? 'Edit Post' : 'Create New Post'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Post Content *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="What's on your mind?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Platforms *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['twitter', 'facebook', 'instagram', 'linkedin'].map(platform => (
                      <button
                        key={platform}
                        onClick={() => handlePlatformToggle(platform)}
                        className={`px-4 py-2 rounded-lg border-2 capitalize font-medium transition ${
                          formData.platforms.includes(platform)
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'
                        }`}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      name="scheduledDate"
                      value={formData.scheduledDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Time *
                    </label>
                    <input
                      type="time"
                      name="scheduledTime"
                      value={formData.scheduledTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
                  >
                    {editingPost ? 'Update Post' : 'Schedule Post'}
                  </button>
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}