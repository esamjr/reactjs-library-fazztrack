import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Book {
  id: string;
  title: string;
  year: string;
}

const BookList: React.FC = () => {
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9090/guest/books');
        const responseData = response.data;
        // const firstDataObject = responseData.length > 0 ? responseData[0] : null;

        console.log(responseData);
        setBook(responseData);
      } catch (error) {
        console.error('Error fetching book list:', error);
        setBook(null);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container" style={{ marginTop: '2%' }}>
      <h2>List Book</h2>
      {book ? (
        <div className="row justify-content-center align-items-center" id="book-list">
          <div className="col-lg-3 mx-lg-1 col-sm-8 mt-sm-3">
            <Link to={`/detail-page/${book.id}`} className="catalog-group-link">
              <div className="catalog-group">
                <div className="dilan">
                  <div className="text-wrapper">{book.title}</div>
                  <p className="p">{book.year}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
};

export default BookList;
