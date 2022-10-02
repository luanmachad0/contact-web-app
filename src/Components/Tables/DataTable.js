import React from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal';
import { Link } from "react-router-dom";

function DataTable(props){
  const deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch(props.route + id, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
      // body: JSON.stringify({
      //   id
      // })
    })
      .then(item => {
        props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }
  }

  const items = props.items.map(item => {
    return (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.name}</td>
        {props.contact &&
            <th>{item.value}</th>
          }
        <td>
          <div style={{width:"110px"}}>
            <ModalForm buttonLabel="Edit" route={props.route} contact={props.contact} item={item} updateState={props.updateState}/>
            {' '}
            <Button color="danger" onClick={() => deleteItem(item.id)}>Del</Button>
            {' '}
            {!props.contact &&
              <Link to="/contacts" state={{itemId: item.id}} >
                <Button color="btn btn-primary">Contacts</Button>
              </Link>
            }
          </div>
        </td>
      </tr>
      )
    })

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          {props.contact &&
            <th>Value</th>
          }
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>
  )
}

export default DataTable