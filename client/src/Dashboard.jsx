import React, { useState, useEffect } from 'react';
import API from './api';

const Dashboard = ({ user, onLogout }) => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', description: '' });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await API.get('/books');
      setBooks(res.data);
    } catch (err) {
      console.error('Failed to fetch books', err);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await API.post('/books', { ...form, userId: user.id });
      setForm({ title: '', author: '', description: '' });
      fetchBooks();
    } catch (err) {
      console.error('Failed to add book', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error('Failed to delete book', err);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', color: '#fff', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #444', paddingBottom: '15px' }}>
        <h2>📚 BookNest Dashboard</h2>
        <div>
          <span style={{ marginRight: '15px' }}>Welcome, <b>{user.name}</b>!</span>
          <button onClick={onLogout} style={{ padding: '6px 12px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', marginTop: '30px' }}>
        <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
          <h3>Add a New Book</h3>
          <form onSubmit={handleAddBook} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
            <input type="text" placeholder="Book Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', background: '#2a2a2a', color: '#fff' }} />
            <input type="text" placeholder="Author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', background: '#2a2a2a', color: '#fff' }} />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', background: '#2a2a2a', color: '#fff', height: '80px' }} />
            <button type="submit" style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Add Book</button>
          </form>
        </div>

        <div>
          <h3>Available Books ({books.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px', maxHeight: '400px', overflowY: 'auto' }}>
            {books.length === 0 ? (
              <p style={{ color: '#888' }}>No books added yet. Add your first book!</p>
            ) : (
              books.map((book) => (
                <div key={book._id} style={{ background: '#1e1e1e', padding: '15px', borderRadius: '8px', border: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', color: '#4dabf7' }}>{book.title}</h4>
                    <small style={{ color: '#aaa' }}>Author: {book.author}</small>
                    <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#ddd' }}>{book.description}</p>
                  </div>
                  <button onClick={() => handleDelete(book._id)} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '16px' }}>🗑️</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;