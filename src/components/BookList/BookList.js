import './BookList.css';
import Book from '../Book/Book';
import React from 'react';
import { useDebounce } from 'use-debounce';

const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

const BookList = () => {

    const [booksList, setBooksList] = React.useState([]);
    const [filter, setFilter] = React.useState('');
    const [visible, setVisible] = React.useState(false);

    const [filterWithTime] = useDebounce(filter, 500);

    const callApi = () => {

        fetch(API_URL + filterWithTime)
            .then(response => response.json())
            .then(data => {

                if (data.totalItems) {
                    setBooksList(data.items);
                    setVisible(true);
                } else {
                    setVisible(false);
                };
            });
    };

    React.useEffect(() => { filterWithTime && filterWithTime.length >= 3 && callApi() }, [filterWithTime]);

    return (
        <div className='bookslist'>
            <div className='bookslist__container'>
                <p className='bookslist__text'>Buscador de libros</p>
                <input className='bookslist__input' type='text' onChange={(event) => setFilter(event.target.value)} value={filter} />
            </div>

            {(filterWithTime.length < 3) &&
                <p className='bookslist__text'>Introduce al menos tres caracteres...</p>}

            {((visible === false) && (filterWithTime.length >= 3)) &&
                <p className='bookslist__text'>No hay libros</p>}

            {((visible === true) && (filterWithTime.length >= 3)) &&
                <table className='bookslist__table'>
                    <thead>
                        <tr>
                            <th>AUTORES</th>
                            <th>TÍTULO</th>
                            <th>DESCRIPCIÓN</th>
                            <th>PORTADA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {booksList.map(book => <Book key={book.id} book={book} />)}
                    </tbody>
                </table>}
        </div>
    );
};

export default BookList;