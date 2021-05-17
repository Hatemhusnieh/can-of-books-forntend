import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showBooks: false,
    }
  }
  
  componentDidMount  = async () => {
    const { user } = this.props.auth0;
    try {
      console.log(user.email);
      const params = {
       email: user.email,
      }
      const books = await axios.get(`http://localhost:3333/user`, {params});
      console.log(books);
       this.setState({
        books: books.data,
        showBooks: true
      });
      console.log(this.state.books);
    } catch (error) {
      console.log(error);
    }
  }
  
  render() {
    return(
      <>
        <>
        {this.componentDidMount}
           <Jumbotron>
              <h1>My Favorite Books</h1>
              <p>
                This is a collection of my favorite books
              </p>
              { this.state.showBooks &&
                  this.state.books.map(book => {
                    return (
                        <div style={{backgroundColor:'#343a40', color:'white', padding:'10px'}}>
                          <h3>{book.name}</h3>
                          <h5>{book.status}</h5>
                          <p>{book.description}</p>
                        </div>
                    )
                  })
              }
          </Jumbotron>
        </>
     </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
