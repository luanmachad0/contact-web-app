import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function AddEditForm(props) {
  const[form, setValues] = useState({
    id: 0,
    name: ''
  })

  const onChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:39929/peoples', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.name
      })
    })
      .then(response => response.json())
      .then(item => {
          props.addItemToState(item)
          props.toggle()
      })
      .catch(err => console.log(err))
  }

  const submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:39929/peoples', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: form.id,
        name: form.name
      })
    })
      .then(response => response.json())
      .then(item => {
          props.updateState(item)
          props.toggle()
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if(props.item){
      const { id, name } = props.item
      setValues({ id, name })
    }
  }, [])

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" id="name" onChange={onChange} value={form.name === null ? '' : form.name} />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  )
}

export default AddEditForm