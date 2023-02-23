import React from 'react'
import { useDebounce } from 'use-debounce';
import './BookList.css'

const API_URL = 'https://www.googleapis.com/books/v1/volumes?q='



const BookList = () => {

    const [booksList, setBooksList] = React.useState([]);
    const [filter, setFilter] = React.useState('');
    const [filterWithTime] = useDebounce(filter, 1000);


    React.useEffect(() => {

        if (filterWithTime && filterWithTime.length >= 3) {

            fetch(API_URL + filterWithTime)
                .then(response => response.json())
                .then(data => {

                    (data.totalItems === 0) ? setBooksList(booksList) : setBooksList(data.items)
                })
        }
    }, [filterWithTime])

    return (

        <div className='bookslist'>
            <div>
                <p className='bookslist__text'>Buscador de libros</p>
                <input className='bookslist__input' type='text' onChange={(event) => setFilter(event.target.value)} value={filter} />
            </div>
            
            {(filterWithTime.length < 3) ?
                <p>Introduce al menos tres caracteres...</p>
                : <table className='bookslist__table'>
                    <thead>
                        <tr >
                            <th>Autores</th>
                            <th>Título</th>
                            <th>Descripción</th>
                            <th>Portada</th>
                        </tr>
                    </thead>
                    <tbody>

                        {booksList.map(book => (
                            <tr key={book.id}>
                                <td>{book.volumeInfo.authors || 'Sin autores'}</td>
                                <td>{book.volumeInfo.title}</td>
                                <td>{book.volumeInfo.description || 'Sin descripción'}</td>
                                <td>{book.volumeInfo.imageLinks ? <img alt='Sin imagen' src={book.volumeInfo.imageLinks.thumbnail} /> : 'No hay imagen'}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            }
        </div>
    )
}


export default BookList;