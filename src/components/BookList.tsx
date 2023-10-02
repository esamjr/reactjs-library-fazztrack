import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Book {
  id: string;
  title: string;
  year: string;
}
interface BookListProps {
  reloadBookList: boolean;
}
const BookList: React.FC<BookListProps> = ({reloadBookList}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const IMG_BOOK_URL = 'http://localhost:9090/files/book/';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9090/guest/books?deleted=false');
        const datas = response.data.data;
        setBooks(datas);
      } catch (error) {
        console.error('Error fetching book list:', error);
        setBooks([]);
      }
    };

    fetchData();
  }, [reloadBookList]);

  return (
    <div className="container" style={{ marginTop: '2%' }}>
      <h2>List Book</h2>
      {books.length > 0 ? (
        <div className="row justify-content-center align-items-center" id="book-list">
          {books.map((book) => (
            <div className="col-lg-3 mx-lg-1 col-sm-8 mt-sm-3" key={book.id}>
              <Link to={`/detail-page/${book.id}`} className="catalog-group-link">
                <div className="catalog-group">
                  <img className="img" src={`${IMG_BOOK_URL}${book.id}`} alt={`${book.title}`} />
                  <div className="dilan">
                    <div className="text-wrapper text-center">{book.title}</div>
                    {/* <p className="p">{book.}</p> */}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
};

export default BookList;
