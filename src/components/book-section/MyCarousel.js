import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

export class MyCarousel extends Component {
    render() {
      const x =`https://via.placeholder.com/600x150/000?text= &bg=373940`;
        return (
            <div>
                 <Carousel>
               {this.props.showBooks &&
                this.props.books.map((book, idx) => {
                return (
                  <Carousel.Item key={idx}>
                  <img
                    className="d-block w-100"
                    src= {x}
                    alt='first slide'
                  />
                  <Carousel.Caption>
                    <h1>{book.name}</h1>
                    <h3>{book.status}</h3>
                    <p>{book.description}</p>
                    <Button onClick={() => this.props.deleteBook(idx)} variant="danger">Delete!</Button>
                    <Button style={{marginLeft:'5px'}} onClick={() => this.props.showUpdateForm(idx)} variant="danger"> Update!</Button>
                  </Carousel.Caption>
                </Carousel.Item>
                )
              })
            }
            </Carousel>
            </div>
        )
    }
}

export default MyCarousel;
