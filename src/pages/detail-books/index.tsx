import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Detail.css';

const DetailPage: React.FC = () => {
  const [book, setBook] = useState({
    imageUrl: '',
    title: '',
    yearOfPublication: '',
    authorName: '',
    publisherName: '',
    description: '',
    isAvailable: true,
  });
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  // const [newImageUrl, setNewImageUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newYearOfPublication, setNewYearOfPublication] = useState('');
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newPublisherName, setPublisherName] = useState('');
  // const [newDescription, setNewDescription] = useState('');
  const [showEditDeleteButtons, setShowEditDeleteButtons] = useState(false);
  const [isBorrowed, setIsBorrowed] = useState(false);
  useEffect(() => {
    const bookId = window.location.pathname.split('/').pop();
    fetchBook(bookId || '');
    const userEmail = localStorage.getItem('email');
    if (userEmail && userEmail.slice(0, 5) === 'admin') {
      setShowEditDeleteButtons(true);
    }
    checkBorrowStatus(bookId, userEmail || '');
  }, []);

  const checkBorrowStatus = async (bookId: string | undefined, userEmail: string) => {
    if (!bookId || !userEmail) return;

    try {
      const response = await axios.get(`http://localhost:9090/books/transaction/${bookId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        const transactionData = response.data.data;
        if (transactionData.user.email === userEmail && !transactionData.isReturned) {
          setIsBorrowed(true);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchBook = async (bookId: string | null) => {
    if (!bookId) return;

    try {
      const response = await axios.get(`http://localhost:9090/books/${bookId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
      });
      const data = response.data.data;
      setBook({
        imageUrl: `http://localhost:9090/files/book/${bookId}`,
        title: data.title,
        yearOfPublication: data.year,
        authorName: data.author.name,
        publisherName: data.publisher.name,
        description: data.description,
        isAvailable: data.isAvailable
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openEditModal = () => {
    // setNewImageUrl(book.imageUrl);
    setNewTitle(book.title);
    setNewYearOfPublication(book.yearOfPublication);
    setNewAuthorName(book.authorName);
    setPublisherName(book.publisherName);
    // setNewDescription(book.description);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);setIsBorrowed
  };

  const updateBook = async () => {
    if (!newTitle || !newYearOfPublication || !newPublisherName || !newAuthorName) {
      alert('Please fill in all the required fields.');
      return;
    }

    try {
      const updatedBook = {
        judul: newTitle,
        tahunTerbit: newYearOfPublication,
        namaPengarang: newAuthorName,
        namaPenerbit: newPublisherName,
      };

      const bookId = window.location.pathname.split('/').pop();
      const response = await axios.put(`http://localhost:9090/admin/books/${bookId}`, updatedBook, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
      });

      if (response.status === 200) {
        // setBook(updatedBook);
        closeEditModal();
        location.reload();
      } else {
        console.error('Failed to update book');
        location.reload();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteBook = async () => {
    const bookId = window.location.pathname.split('/').pop();

    try {
      const response = await axios.delete(`http://localhost:9090/admin/books/${bookId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        console.log('Book deleted successfully');
        window.location.href = '/home';
      } else {
        console.error('Failed to delete book');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const borrowBook = async () => {
    const userEmail = localStorage.getItem('email');
    const bookId = window.location.pathname.split('/').pop();

    if (!userEmail || !bookId) {
      console.error('User email or book ID is missing');
      return;
    }

    const requestData = new FormData();
    requestData.append('emailUser', userEmail);
    requestData.append('idBook', bookId);

    try {
      const response = await axios.post('http://localhost:9090/books/borrow', requestData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        console.log('Book borrowed successfully');
        location.reload();
      } else {
        console.error('Failed to borrow book');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const returnBook = async () => {
    const bookId = window.location.pathname.split('/').pop();

    try {
      const response = await axios.post(`http://localhost:9090/books/return/${bookId}`, null, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        console.log('Book returned successfully');
        location.reload();
      } else {
        console.error('Failed to return book');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div>
      <div className="container-fluid detail">
        <div className="container main-wrap">
          <div className="row">
              <div className="col-md-3">
                  <img className="covernya" src={book.imageUrl} alt="Book Cover" id="book-cover" />
              </div>
              {/* <div className="col-md-6 d-none d-sm-block">
                  <img className="img-preview end-0" src="../assets/img/covernya-1@2x.png" />
              </div> */}
              <div className="col-md-3">
                  <div className="back-button d-flex pointer" onClick={() => window.history.back()}>
                      <img className="arrow" src="../../src/assets/arrow.svg" />
                  </div>
                  {showEditDeleteButtons && (
                    <div className="text-wrapper d-flex pointer" style={{left:1000}}>
                      <div className="text-white shadow rounded p-2" style={{marginRight:'15px'}} onClick={openEditModal}>Edit</div>
                      <div className="text-white shadow rounded p-2" onClick={deleteBook}>Delete</div>
                    </div>
                  )}
                  
              </div>
          </div>
          <div className="row">
                <div className="col-md-7">
                    <div className="overlap-2">
                        <div className="text-wrapper-3 mt-3" id="book-title">{book.title}</div>
                        <div className="genre">
                            <div className="overlap-3">
                                <div className="rectangle"></div>
                                <div className="text-wrapper-4">{book.yearOfPublication}</div>
                            </div>
                        </div>
                    </div>
                    <p className="p" id="book-description">{book.description}</p>
                    <div className="row">
                      {/* <div className="text-wrapper-6 px-3 mt-3 fw-bold" id="book-date">{book.authorName}</div> */}
                      {book.isAvailable == false && (
                        <div className="text-wrapper-5-detail mt-2 text-danger">Unavailable</div>
                      )}
                      {book.isAvailable == true && (
                        <div className="text-wrapper-5-detail mt-2">Available</div>
                      )}
                    </div>
                   
                </div>
                {!showEditDeleteButtons && book.isAvailable == true && (
                   <div className="col-md-5 d-flex flex-column justify-content-end align-items-end">
                     <button className="borrow-button bottom-0 end-20" onClick={borrowBook}>
                       <div className="borrow-wrapper">
                         <div className="text-wrapper-7-detail">Borrow</div>
                       </div>
                     </button>
                   </div>
                )}
                {!showEditDeleteButtons && isBorrowed && (
                   <div className="col-md-5 d-flex flex-column justify-content-end align-items-end">
                     <button className="borrow-button bottom-0 end-20" onClick={returnBook}>
                       <div className="borrow-wrapper">
                         <div className="text-wrapper-7-detail">Return Book</div>
                       </div>
                     </button>
                   </div>
                )}
            </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div id="edit-book-modal" className="modal" style={{display:'block'}}>
          <div className="modal-content">
            <span className="close-button" onClick={closeEditModal}>&times;</span>
            <h1>Edit Data</h1>
            <form id="book-form" className="grid-form">
                <div className="form-group">
                    <label htmlFor="book-title">Title</label>
                    <input type="text" id="book-title" name="title" placeholder="Title..." required
                        value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="published-year">Published Year</label>
                    <input type="text" id="published-year" name="yearOfPublication" placeholder="Published Year..."
                        required value={newYearOfPublication} onChange={(e) => setNewYearOfPublication(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="book-author">Author</label>
                    <input type="text" id="book-author" name="authorName" placeholder="Author..." required
                        value={newAuthorName} onChange={(e) => setNewAuthorName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="book-publisher">Publisher</label>
                    <input type="text" id="book-publisher" name="publisherName" placeholder="Publisher..." required
                        value={newPublisherName} onChange={(e) => setPublisherName(e.target.value)} />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="book-description">Description</label>
                    <textarea id="book-description" name="description" style={{ height: '250px' }}
                        placeholder="Description..." value={bookData.description}
                        onChange={handleInputChange}></textarea>
                </div> */}
                <button type="button" id="save-button" onClick={updateBook}>
                    Update
                </button>
            </form>
            </div>
            </div>
      )}

      {/* Delete Button */}
      {/* <button onClick={deleteBook}>Delete</button> */}
    </div>
  );
};

export default DetailPage;
