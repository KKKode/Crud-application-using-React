import React, { useState,useEffect } from 'react'
import './style.css';

const localStorageData= ()=>{
  const items= localStorage.getItem("myBasket")
  if(items){
    return JSON.parse(items)
  }else{
    return []
  }
}

const Todo = () => {


  const [enteredData, setEnteredData] = useState("")
  const [storedItems, setStoredItems] = useState(localStorageData())
  const [editItemId, setEditItemId ] = useState("")
  const [button, setButton] = useState(false)

  // adding items 

  const addToItem = () => {
    if (!enteredData) {
      alert("Plz fill something to it");
    }else if(enteredData && button ) {
      setStoredItems(
        storedItems.map((curElm)=>{
          if (curElm.id === editItemId){
          return {...curElm, name: enteredData}
          }
          return curElm
        })        
      )
        setEnteredData("")
       // setEditItemId("")
        setButton(false)
    }
     else {
      const itemsWithId = {
        id: new Date().getTime().toString(),
        name: enteredData
      }
      setStoredItems([...storedItems, itemsWithId]);
      setEnteredData("")
    }
  };

  // edit items
  const editItem= (index)=>{
    const selectedItem = storedItems.find((curElm)=>{
      return curElm.id === index;
    })
    setEnteredData(selectedItem.name)
    setEditItemId(index)
    setButton(true)
  }

// deleting items

  const deleteItem = (ele) => {
    const restOtherItems = storedItems.filter((curElm) => {
      return (
        curElm.id !== ele
      )
    })
    setStoredItems(restOtherItems)
  };
  // delete all items 

  const deleteAll=()=>{
    setStoredItems([])
  }

  // adding items to local storage 

  useEffect(() => {
    localStorage.setItem('myBasket', JSON.stringify(storedItems))
  }, [storedItems])

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={enteredData}
              onChange={(e) => setEnteredData(e.target.value)}
            />
            {
              button ? (<i className="far fa-edit add-btn" onClick={addToItem}></i>) :
              (<i className="fa fa-plus add-btn" onClick={addToItem}></i>)
            }
            
          </div>
          {/* show our items  */}
          <div className="showItems">
            {
              storedItems.map((curElm) => {
                return (

                  <div className="eachItem" key={curElm.id}>
                    <h3>{curElm.name}</h3>
                    <div className="todo-btn">
                      <i className="far fa-edit add-btn" onClick={()=>editItem(curElm.id)}></i>
                      <i className="far fa-trash-alt add-btn" onClick={() => { deleteItem(curElm.id) }}></i>
                    </div>
                  </div>
                )

              })
            }

          </div>

          {/* rmeove all button  */}
          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={deleteAll}>
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo

































































