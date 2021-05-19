import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import '../../BestBooks.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';
import BookForm from './BookForm';
import UptadeBookForm from './UptadeBookForm';
import MyCarousel from './MyCarousel';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showBooks: false,
      showForm: false,
      bookName: '',
      bookDescription: '',
      bookStatus: '',
      showUpdatingForm:false,
      index:0
    }
  }


  componentDidMount = async () => {
    const { user } = this.props.auth0;
    try {
      // console.log(user.email);
      const params = {
        email: user.email,
      }
      const books = await axios.get(`http://localhost:3001/user`, { params });
      // console.log(books);
      this.setState({
        books: books.data,
        showBooks: true
      });
      // console.log(this.state.books);
    } catch (error) {
      console.log(error);
    }
  }

// function to display a from when a button is clicked 
  revealFrom = ()=> this.setState({showForm : true});
// functions that change state of new books
  updateBookName = (e)=> this.setState({bookName: e.target.value});
  updateBooDescription = (e)=> this.setState({bookDescription: e.target.value}); 
  updateBookStatus = (e)=> this.setState({bookStatus: e.target.value}); 

// function that send new book data to back end 
  addBook = async (e)=>{
    e.preventDefault();
    const {user} = this.props.auth0
    const reqData = {
      bookName: this.state.bookName,
      bookDescription: this.state.bookDescription,
      bookStatus: this.state.bookStatus,
      email: user.email
    }
    // console.log(reqData);

    const newBook = await axios.post(`http://localhost:3001/user`, reqData);

    this.setState({
      books: newBook.data
    });
  }

// function to delete books when clicking a button
  deleteBook = async (index)=>{
    console.log(this.state.books);

    // console.log(index);
    const arrOfBooks = this.state.books.filter((book, idx)=>{
      return idx !== index;
    });
    // console.log(arrOfBooks);

    this.setState({
      books: arrOfBooks
    });
    
    const {user} = this.props.auth0
    const query = {
      email: user.email
    }
    await axios.delete(`http://localhost:3001/user/${index}`, {params: query});
  }

  // function to show the update form when clicking:
  showUpdateForm = (idx) => {
    const booksArray = this.state.books.filter((value, index) => {
      return idx === index
    });
    // console.log(this.state.books);
    this.setState({
      index: idx,
      bookName: booksArray[0].name,
      bookDescription: booksArray[0].description,
      bookStatus:booksArray[0].status,
      showUpdatingForm: true,
    });
  }
// function to update the data in the backend when clicking:
updateBooks = async (e) => {
  e.preventDefault();
  const {user} = this.props.auth0
  const reqBody = {
    bookName: this.state.bookName,
    bookDescription: this.state.bookDescription,
    bookStatus: this.state.bookStatus,
    email: user.email
}
console.log(reqBody);
const updatedBooks = await axios.put(`http://localhost:3001/user/${this.state.index}`, reqBody);
this.setState({
  books: updatedBooks.data
});
}

  render() {
    return (
      <>
        <>
          {this.componentDidMount}
          <Jumbotron>
            <h1>My Favorite Books</h1>
            <p>
              This is a collection of my favorite books
              </p>
            <Button onClick={this.revealFrom} variant="outline-primary">Add a Book</Button><br/><br/>
            {this.state.showForm &&
              <>
                <BookForm
                  updateBookName={this.updateBookName}
                  updateBooDescription={this.updateBooDescription}
                  updateBookStatus={this.updateBookStatus}
                  addBook={this.addBook}
                /><br/><br/>
              </>
              }
                 {this.state.showUpdatingForm &&
              <>
                <UptadeBookForm
                  updateBookName={this.updateBookName}
                  updateBooDescription={this.updateBooDescription}
                  updateBookStatus={this.updateBookStatus}
                  addBook={this.addBook}
                  bookName={this.state.bookName}
                  bookDescription={this.state.bookDescription}
                  bookStatus={this.state.bookStatus}
                  updateBooks={this.updateBooks}
                /><br/><br/>
              </>
              }
              <>
                <MyCarousel 
                showBooks={this.state.showBooks}
                books={this.state.books}
                showUpdateForm={this.showUpdateForm}
                deleteBook={this.deleteBook}
                />
              </>
          </Jumbotron>
        </>
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
