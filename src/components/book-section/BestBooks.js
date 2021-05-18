import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import '../../BestBooks.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import BookForm from './BookForm';


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
              <Carousel>
            {this.state.showBooks &&
                this.state.books.map((book, idx) => {
                return (
                  <Carousel.Item key={idx}>
                  <img
                    className="d-block w-100"
                    src='https://via.placeholder.com/600x150/000?text= &bg=373940'
                    alt='first slide'
                  />
                  <Carousel.Caption>
                    <h1>{book.name}</h1>
                    <h3>{book.status}</h3>
                    <p>{book.description}</p>
                    <Button onClick={()=>this.deleteBook(idx)} variant="danger">Delete!</Button>
                  </Carousel.Caption>
                </Carousel.Item>
                )
              })
            }
            </Carousel>

          </Jumbotron>
        </>
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
