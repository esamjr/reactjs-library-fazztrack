import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Carousel from '../../components/Carousel';
import BookList from '../../components/BookList';
import Modal from '../../components/Modal';
import Swal from 'sweetalert2';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [reloadBookList, setReloadBookList] = useState(false);
  const [isAddBookModalOpen, setAddBookModalOpen] = useState(false);
  const [bookData, setBookData] = useState({
    title: '',
    yearOfPublication: '',
    authorName: '',
    publisherName: '',
    imageFile: null as unknown as Blob,
    description: '',
  });

  const navigate = useNavigate();
  useEffect(() => {
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const openAddBookModal = () => {
    setAddBookModalOpen(true);
  };

  const closeAddBookModal = () => {
    setAddBookModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
  
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files ? fileInput.files[0] : null;
  
      setBookData({
        ...bookData,
        [name]: file,
      });
    } else {
      setBookData({
        ...bookData,
        [name]: value,
      });
    }
  };

  const handleAddBook = async () => {
    try {
      const bookPayload = {
        judul: bookData.title,
        tahunTerbit: bookData.yearOfPublication,
        namaPengarang: bookData.authorName,
        namaPenerbit: bookData.publisherName,
      };

      const bookAddResponse = await axios.post('http://localhost:9090/admin/books', bookPayload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (bookAddResponse.status === 201) {
        const bookId = bookAddResponse.data.data.id;
        const imageForm = new FormData();
        imageForm.append('file', bookData.imageFile);
        imageForm.append('bookId', bookId);
        const imageUploadResponse = await axios.post('http://localhost:9090/admin/files/book', imageForm, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (imageUploadResponse.status !== 200) {
          console.error('Failed to upload image');
        } else {
          console.log('Image uploaded successfully');
          Swal.fire({
            icon: 'success',
            title: 'Book added successfully',
            text: 'You have successfully added book.',
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/home');
              setReloadBookList(true);
              setBookData({
                title: '',
                yearOfPublication: '',
                authorName: '',
                publisherName: '',
                imageFile: null as unknown as Blob,
                description: '',
              });
            }
          });
        }
        Swal.fire({
          icon: 'success',
          title: 'Book added successfully',
          text: 'You have successfully added book.',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/home');
            setReloadBookList(true);
            setBookData({
              title: '',
              yearOfPublication: '',
              authorName: '',
              publisherName: '',
              imageFile: null as unknown as Blob,
              description: '',
            });
          }
        });
        closeAddBookModal();
      } else {
        console.error('Failed to add book');
        Swal.fire({
          icon: 'error',
          title: 'Book Added Failed',
          text: 'Failed to add book',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Book Added Failed',
        text: 'An error occurred during added book. Please try again later.',
      });
    }
  };

  return (
    <div>
      <Navbar onSidebarToggle={toggleSidebar} />
      <div className="container-fluid">
        <div className="carousel" style={{ marginTop: '20px' }}>
          <Carousel />
        </div>
        <BookList reloadBookList={reloadBookList} />

        <Sidebar user={localStorage.getItem('email') || 'Guest'} isOpen={isSidebarOpen} openAddBookModal={openAddBookModal} />
      </div>
      <Modal isOpen={isAddBookModalOpen} onClose={closeAddBookModal}>
        <h2>Add Book</h2>
        <form id="book-form" className="grid-form">
          <div className="form-group">
            <label htmlFor="image-file">Image File</label>
            <input
              type="file"
              id="image-file"
              name="imageFile"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="book-title">Title</label>
            <input
              type="text"
              id="book-title"
              name="title"
              placeholder="Title..."
              required
              value={bookData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="published-year">Published Year</label>
            <input
              type="text"
              id="published-year"
              name="yearOfPublication"
              placeholder="Published Year..."
              required
              value={bookData.yearOfPublication}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="book-author">Author</label>
            <input
              type="text"
              id="book-author"
              name="authorName"
              placeholder="Author..."
              required
              value={bookData.authorName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="book-publisher">Publisher</label>
            <input
              type="text"
              id="book-publisher"
              name="publisherName"
              placeholder="Publisher..."
              required
              value={bookData.publisherName}
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="book-description">Description</label>
            <textarea
              id="book-description"
              name="description"
              style={{ height: '250px' }}
              placeholder="Description..."
              value={bookData.description}
              onChange={handleInputChange}
            ></textarea>
          </div> */}
          <button type="button" id="save-button" onClick={handleAddBook}>
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Home;
