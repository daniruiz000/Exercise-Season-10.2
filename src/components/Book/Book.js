import './Book.css';

const Book = ({book})=>{

    const authors = [book.volumeInfo.authors];
    return(
    <tr key={book.id}>
        <td>{book.volumeInfo.authors ? authors.map(author=> author.toString().replaceAll(',', ', ')) : 'Sin autores'}</td>
        <td>{book.volumeInfo.title}</td>
        <td>{book.volumeInfo.description || 'Sin descripción'}</td>
        <td>{book.volumeInfo.imageLinks ? <img alt='img book' src={book.volumeInfo.imageLinks.thumbnail} /> : 'No hay imagen'}</td>
    </tr>


    );
};

export default Book;