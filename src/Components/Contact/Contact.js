import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from '../Modals/Modal'
import DataTable from '../Tables/DataTable'

function Contact(props) {
  const [items, setItems] = useState([])
  const location = useLocation()
  console.log(location)
  const { itemId } = location.state

  const getItems= () => {
    fetch('https://contactwebapi.azurewebsites.net/contacts/' + itemId)
      .then(response => response.json())
      .then(items => setItems(items))
      .catch(err => console.log(err))
  }

  const addItemToState = (item) => {
    setItems([...items, item])
  }

  const updateState = (item) => {
    const itemIndex = items.findIndex(data => data.id === item.id)
    const newArray = [...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)]
    setItems(newArray)
  }

  const deleteItemFromState = (id) => {
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
  }

  useEffect(() => {
    getItems()
  }, []);

  return (
      
      <Container className="Contact">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>Contact APP</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable items={items} contact={true} route={"https://contactwebapi.azurewebsites.net/contacts/"} updateState={updateState} deleteItemFromState={deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalForm buttonLabel="Add Contact" people={itemId} contact={true} route={"https://contactwebapi.azurewebsites.net/contacts/"} addItemToState={addItemToState}/>
          </Col>
        </Row>
      </Container>
  )
}

export default Contact