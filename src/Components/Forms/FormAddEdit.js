import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function AddEditForm(props) {
  const[form, setValues] = useState({
    id: 0,
    name: '',
    value: ''
  })

  const onChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submitFormAdd = e => {
    e.preventDefault()
    if (!form.value)
    {
      fetch(props.route, {
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
    } else {
      fetch(props.route, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          value: form.value,
          peopleId: props.people
        })
      })
        .then(response => response.json())
        .then(item => {
            props.addItemToState(item)
            props.toggle()
        })
        .catch(err => console.log(err))
    }
  }

  const submitFormEdit = e => {
    e.preventDefault()
    if (!form.value)
    {
      fetch(props.route, {
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
    } else {
      fetch(props.route, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: form.id,
          name: form.name,
          value: form.value
        })
      })
        .then(response => response.json())
        .then(item => {
            props.updateState(item)
            props.toggle()
        })
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    if(props.item){
      const { id, name, value } = props.item
      setValues({ id, name, value })
    }
  }, [])

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" id="name" onChange={onChange} value={form.name === null ? '' : form.name} />
        {props.contact &&
          <>
            <Label for="value">Value</Label>
            <Input type="text" name="value" id="value" onChange={onChange} value={form.value === null ? '' : form.value} />
          </>
        }
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  )
}

export default AddEditForm