import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Components/Modals/Modal'
import DataTable from './Components/Tables/DataTable'

function App(props) {

  const [items, setItems] = useState([])

  const getItems= () => {
    fetch('https://contactwebapi.azurewebsites.net/peoples')
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
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>Contact APP</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable items={items} route={"https://contactwebapi.azurewebsites.net/peoples/"} updateState={updateState} deleteItemFromState={deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalForm buttonLabel="Add People" route={"https://contactwebapi.azurewebsites.net/peoples/"} addItemToState={addItemToState}/>
          </Col>
        </Row>
      </Container>
  )
}

export default App