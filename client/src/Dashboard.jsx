import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch books from your Render backend API
  useEffect(() => {
    axios.get('https://booknest-app-ihdv.onrender.com/api/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error("Error fetching books:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Top Navbar */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">📚</span>
          <h1 className="text-xl font-bold tracking-tight text-indigo-600">BookNest</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-600">Welcome back!</span>
          <button 
            onClick={handleLogout}
            className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search & Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">Explore Library</h2>
            <p className="text-sm text-gray-500">Manage and browse your favorite books in one place.</p>
          </div>
          
          <div className="w-full md:w-72">
            <input 
              type="text"
              placeholder="Search books or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-400 text-lg">No books found in the library yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <div 
                key={book._id || book.id} 
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 bg-indigo-50 rounded-xl mb-4 flex items-center justify-center text-4xl">
                    📖
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">{book.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">By {book.author}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full">
                    {book.genre || 'General'}
                  </span>
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}