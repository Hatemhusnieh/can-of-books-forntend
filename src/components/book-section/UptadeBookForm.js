import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export class UptadeBookForm extends Component {
  render() {
    return (
      <>
      <>
      <h1>Update your Book!</h1>
      </>
      <Form onSubmit={(e) => this.props.updateBooks(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Book name</Form.Label>
          <Form.Control onChange={(e)=> this.props.updateBookName(e)} type="text" placeholder="ex: The Lord Of The Rings" value={this.props.bookName} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control onChange={(e)=> this.props.updateBooDescription(e)} type="text" placeholder="..." value={this.props.bookDescription}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Status</Form.Label>
          <Form.Control onChange={(e)=> this.props.updateBookStatus(e)} type="text" placeholder="..." value={this.props.bookStatus}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
  </Button>
      </Form>
      </>
    );
  }
}

export default UptadeBookForm;

