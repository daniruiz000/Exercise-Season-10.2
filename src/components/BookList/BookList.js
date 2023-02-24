import './BookList.css'
import React from 'react'
import { useDebounce } from 'use-debounce';

const API_URL = 'https://www.googleapis.com/books/v1/volumes?q='

const BookList = () => {

    const [booksList, setBooksList] = React.useState([]);
    const [filter, setFilter] = React.useState('');
    const [visible, setVisible] = React.useState(false);

    const [filterWithTime] = useDebounce(filter, 1000);

    const callApi = () => {

        fetch(API_URL + filterWithTime)
            .then(response => response.json())
            .then(data => {

                if (data.totalItems){
                    setBooksList(data.items);
                    setVisible(true);
                }else{
                    setVisible(false);
                }
            });
    };

    React.useEffect(()=>{(filterWithTime && filterWithTime.length >= 3 ) && callApi()}, [filterWithTime]);

    return (

        <div className='bookslist'>
            <div>
                <p className='bookslist__text'>Buscador de libros</p>
                <input className='bookslist__input' type='text' onChange={(event) => setFilter(event.target.value)} value={filter} />
            </div>

            {(filterWithTime.length < 3) && <p>Introduce al menos tres caracteres...</p>}
            
            {((visible === false) && (filterWithTime.length >= 3)) && <p>No hay libros</p>}

            {((visible === true) && (filterWithTime.length >= 3)) && <table className='bookslist__table'>
                    <thead>
                        <tr>
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
                </table>}
        </div>
    )
}

export default BookList;