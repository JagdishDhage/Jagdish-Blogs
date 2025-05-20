'use client';
import React, { useEffect, useState } from 'react';
import { MessageCircle, Send, Clock, AlertCircle, Loader } from 'lucide-react';

function Comment({ id }) {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  // Fetch existing comments on mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/Comments/GetComment/${id}`);
        const data = await res.json();
        setComments(data || []);
      } catch (err) {
        console.error('Error loading comments:', err);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [id]);

  const handleOnChange = (e) => {
    setComment(e.target.value);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`/api/Comments/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Comment added successfully!');
        setMessageType('success');
        setComment('');
        setComments((prev) => [...prev, { comment, timestamp: Date.now() }]);
      } else {
        setMessage(data.error || 'Failed to add comment');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      setMessage('Something went wrong. Try again later.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      {/* Comment Form Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="text-indigo-600" size={20} />
          <h2 className="text-xl font-semibold text-gray-800">Leave your thoughts</h2>
        </div>
        
        <form onSubmit={handleComment} className="space-y-4">
          <div className="relative">
            <textarea
              name="comment"
              value={comment}
              onChange={handleOnChange}
              placeholder="Share your thoughts..."
              className="w-full p-4 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none h-32"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute bottom-3 right-3 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed"
            >
              {loading ? <Loader className="animate-spin" size={18} /> : <Send size={18} />}
            </button>
          </div>
          
          {/* Feedback message */}
          {message && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded ${messageType === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {messageType === 'success' ? 
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{message}</span>
                </div> : 
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} />
                  <span>{message}</span>
                </div>
              }
            </div>
          )}
        </form>
      </div>

      {/* Comments Section */}
      <div className="border-t border-gray-100 pt-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-800">
            Discussion {comments.length > 0 && <span className="inline-flex items-center justify-center w-6 h-6 ml-2 text-xs font-medium text-white bg-indigo-600 rounded-full">{comments.length}</span>}
          </h3>
          
          {/* Filter/Sort options could be added here */}
        </div>

        {loadingComments ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="animate-spin text-indigo-600 mr-2" size={20} />
            <span className="text-gray-600">Loading comments...</span>
          </div>
        ) : comments.length > 0 ? (
          <ul className="space-y-6">
            {comments.map((c, index) => (
              <li key={index} className="bg-gray-50 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <p className="text-gray-800 mb-3">{c.comment}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock size={14} className="mr-1" />
                  <span>{formatDate(c.timestamp)}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <MessageCircle className="mx-auto text-gray-400 mb-3" size={28} />
            <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;