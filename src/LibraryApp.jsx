import React, { useState } from 'react';

function LibraryApp() {
    const [books, setBooks] = useState([
        { id: 1, title: "Harry Potter", author: "J.K. Rowling" },
        { id: 2, title: "The Alchemist", author: "Paulo Coelho" },
        { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee" },
        { id: 4, title: "Animal Farm", author: "George Orwell" },
        { id: 5, title: "Pride and Prejudice", author: "Jane Austen" }
    ]);

    const [newBook, setNewBook] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [search, setSearch] = useState("");

    // Edit state
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editAuthor, setEditAuthor] = useState("");

    const addBook = () => {
        if (newBook.trim() === "") return;
        const author = newAuthor.trim() === "" ? "Unknown" : newAuthor.trim();
        setBooks([...books, { id: Date.now(), title: newBook.trim(), author }]);
        setNewBook("");
        setNewAuthor("");
    };

    const removeBook = (id) => {
        setBooks(books.filter(book => book.id !== id));
    };

    const startEdit = (book) => {
        setEditingId(book.id);
        setEditTitle(book.title || "");
        setEditAuthor(book.author || "");
    };

    const saveEdit = (id) => {
        const title = editTitle.trim();
        const author = editAuthor.trim() === "" ? "Unknown" : editAuthor.trim();
        if (title === "") return;
        setBooks(books.map(b => b.id === id ? { ...b, title, author } : b));
        setEditingId(null);
        setEditTitle("");
        setEditAuthor("");
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditTitle("");
        setEditAuthor("");
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        (book.author && book.author.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="container">
            <h1>Library Management System</h1>

            <input
                className="search"
                type="text"
                placeholder="Search book"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <h3>Add New Book</h3>
            <div className="add-row">
                <div className="add-fields">
                    <input
                        className="add-input"
                        type="text"
                        placeholder="Book name"
                        value={newBook}
                        onChange={(e) => setNewBook(e.target.value)}
                    />

                    <input
                        className="add-input"
                        type="text"
                        placeholder="Author name"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                    />
                </div>

                <div className="add-actions">
                    <button onClick={addBook}>Add</button>
                </div>
            </div>

            <h3>Book List</h3>
            {filteredBooks.map(book => (
                <div className="book" key={book.id}>
                    {editingId === book.id ? (
                        <>
                            <div className="book-meta">
                                <input className="book-input" type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                                <input className="book-input" type="text" value={editAuthor} onChange={(e) => setEditAuthor(e.target.value)} />
                            </div>
                            <div className="book-actions">
                                <button onClick={() => saveEdit(book.id)}>Save</button>
                                <button onClick={cancelEdit}>Cancel</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="book-meta">
                                <span className="title">{book.title}</span>
                                <small className="author">{book.author}</small>
                            </div>
                            <div className="book-actions">
                                <button onClick={() => startEdit(book)}>Edit</button>
                                <button onClick={() => removeBook(book.id)}>Remove</button>
                            </div>
                        </>
                    )}
                </div>
            ))}

            <style>{`
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    background-color: #ce419698;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                }
                .container {
                    max-width: 980px;
                    background-color: white;
                    padding: 48px;
                    border-radius: 12px;
                    box-shadow: 0 12px 32px rgba(0,0,0,0.12);
                    border: 2px solid rgba(202, 27, 27, 0.06);
                    text-align: center;
                }
                h1 {
                    color: #090909;
                    margin-bottom: 20px;
                }
                h3 {
                    color: #080808;
                    margin-top: 20px;
                }
                input {
                    padding: 10px;
                    margin: 10px;
                    border: 2px solid #667eea;
                    border-radius: 5px;
                    width: 80%;
                    max-width: 300px;
                }
                .add-input {
                    display: block;
                    width: 80%;
                    max-width: 300px;
                    margin: 0;
                    text-align: left;
                    box-sizing: border-box;
                    border: 2px solid #667eea;
                    border-radius: 5px;
                    padding: 8px;
                }
                .add-row {
                    display: grid;
                    grid-template-columns: 1fr auto;
                    gap: 12px;
                    align-items: center;
                    width: 100%;
                    max-width: 920px;
                    margin: 12px auto;
                }
                .add-fields { display: flex; flex-direction: column; gap: 8px; }
                .add-actions { display: flex; align-items: center; justify-content: center; padding-left: 12px; }
                @media (max-width: 520px) {
                    .add-row { grid-template-columns: 1fr; }
                    .add-actions { justify-content: flex-start; padding-left: 0; margin-top: 8px; }
                }
                .search {
                    width: 92%;
                    max-width: 640px;
                }
                button {
                    padding: 10px 20px;
                    margin: 10px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                button:hover {
                    background-color: #45a049;
                }
                .book {
                    display: grid;
                    grid-template-columns: 1fr 160px;
                    gap: 12px;
                    align-items: center;
                    max-width: 920px;
                    margin: 14px auto;
                    padding: 12px;
                    background-color: #80abcf;
                    border-radius: 8px;
                    border: 2px solid #ba1212;
                }
                .book button {
                    background-color: #f44336;
                    padding: 5px 10px;
                }
                .book-actions {
                    display: flex;
                    gap: 8px;
                    align-items: center;
                    justify-self: end;
                    border-left: 2px solid rgba(0,0,0,0.08);
                    padding-left: 12px;
                }
                .book-meta {
                    text-align: left;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    min-width: 0;
                }
                .book-meta .title { font-weight: 700; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin: 0; padding: 0; }
                .book-meta .author { font-size: 0.9em; color: #222; display: block; margin: 0; padding: 0; margin-top: 2px; }
                .book-input { width: 100%; padding: 8px; border-radius: 5px; border: 2px solid #667eea; box-sizing: border-box; }
                .book button:hover {
                    background-color: #d32f2f;
                }
            `}</style>
        </div>
    );
}

export default LibraryApp;
