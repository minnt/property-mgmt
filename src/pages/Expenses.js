import React, {useState, useEffect} from 'react'
import {InputGroup, Button, HTMLTable, HTMLSelect, Divider, Popover, PopoverInteractionKind, 
  Position, Tab, Tabs, Alignment, Navbar, NavbarGroup} from "@blueprintjs/core"
// import {DatePicker} from "@blueprintjs/datetime"

import Transaction from '../components/Transaction'
import Chart from '../components/Chart'
// import Bills from '../components/Bills'

function Expenses() {
  // Initialize state
  const [balance, setBalance] = useState(0)
  const [descriptionInput, setDescriptionInput] = useState()
  const [amountInput, setAmountInput] = useState()
  const [category, setCategory] = useState('')
  const [transactions, setTransactions] = useState([])
  // const [selectedTab] = useState(0)

  // If the transactions array is updated then update the balance
  useEffect(() => {
    let amounts = transactions.map(trn => parseInt(trn.amount))
    let total = amounts.reduce((acc, item) => (acc += item), 0)
    setBalance(total)
  }, [transactions])

  // Add a transaction to the array on button click
  function addTransaction() {
    var d = new Date()
    var date = d.getDate()
    var month = d.getMonth()

    let transaction = {
      id: transactions.length + 1,
      description: descriptionInput,
      amount: amountInput,
      category: category,
      date: `${month}-${date}`
    }

    setTransactions(prevTransactions => [...prevTransactions, transaction])
  }

  // Clear transactions array on button press
  function clearTransactions() {
    setTransactions([])
  }

  // Handle changes to input !FIX!
  function handleDescriptionInput(e) {
    setDescriptionInput(e.target.value)
  }

  function handleAmountInput(e) {
    setAmountInput(e.target.value)
  }

  function handleSelectCategory(e) {
    setCategory(e.target.value)
  }

  function transactionList() {
    return transactions.map(trn => {
      return <Transaction key={trn.id} description={trn.description} amount={trn.amount} 
        category={trn.category} date={trn.date}/>
    })
  }

  // function activeTab() {
  //   switch(selectedTab) {
  //     case 0:
  //       return <Expenses />
  //     case 1:
  //       return <Bills />
  //     default:
  //       return <Expenses />
  //   }
  //   return (<p>Hello</p>)
  // }

  return (
    <div className="container">

      <h1 className="title">Expense Tracker</h1>
      <hr className="divider"/>

      <Navbar className="mb-20 mt-10">
        <NavbarGroup align={Alignment.LEFT}>
          <Tabs id="TabsExample" selectedTabId="en">
            <Tab id="en" title="Entries"/>
            <Tab id="bi" title="Bills" />
            <Tab id="go" title="Money Goals"/>
          </Tabs>
        </NavbarGroup>
      </Navbar>

      {/* {activeTab()} */}

      <div className="container-inline">
        <div className="flex-container-spacearound2">
          <InputGroup leftIcon="comment" value={descriptionInput} placeholder="Description"
            onChange={handleDescriptionInput} intent="danger"/>
          <InputGroup leftIcon="dollar" value={amountInput} placeholder="Amount"
            onChange={handleAmountInput} />
          <HTMLSelect onChange={handleSelectCategory}>
            <option defaultValue>Category</option>
            <option value="Bills">Bills</option>
            <option value="Luxuries">Luxuries</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Rent">Rent</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Groceries">Groceries</option>
            <option value="Other">Other</option>
          </HTMLSelect>
          {/* <DatePicker /> */}
          <Divider />
          <Button icon="plus" text="Add" onClick={addTransaction}/>
        </div>
        <div className="flex-container-end">
          <h1 className="balance">Balance: ${balance}</h1>
        </div>
      </div>

      <div className="container-inline">
        <div className="flex-container-center mt20 height100">
          <HTMLTable className="width100" bordered={true} striped={true} condensed={true}>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactionList()}
            </tbody>
          </HTMLTable>
        </div>
        
        <div className="container-chart">
          <Chart />
        </div>
      </div>

      
      <div className="flex-container-sb50 mt20">
        <Popover
          interactionKind={PopoverInteractionKind.CLICK}
          popoverClassName="bp3-popover-content-sizing"
          position={Position.BOTTOM}
        >
          <Button icon="trash" intent="danger" text="Clear List" />
          <div>
            <h5>Confirm deletion:</h5>
            <Button icon="ban-circle" className="bp3-popover-dismiss mr-5">Dismiss</Button>
            <Button icon="trash" intent="danger" className="bp3-popover-dismiss" 
              onClick={clearTransactions}>Delete</Button>
          </div>
        </Popover>

        <Button icon="export" text="Export to CSV"/>
        <HTMLSelect onChange={handleSelectCategory}>
          <option defaultValue>Show only:</option>
          <option value="Bills">Bills</option>
          <option value="Luxuries">Luxuries</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Rent">Rent</option>
          <option value="Gasoline">Gasoline</option>
          <option value="Groceries">Groceries</option>
          <option value="Other">Other</option>
        </HTMLSelect>
        <HTMLSelect onChange={handleSelectCategory}>
          <option defaultValue>Sort by:</option>
          <option value="Bills">Amount (Desc)</option>
          <option value="Luxuries">Amount (Asc)</option>
          <option value="Entertainment">Date (Newest)</option>
          <option value="Rent">Date (Oldest)</option>
        </HTMLSelect>
        {/* <Button text="Push Data" onClick={pushData}/> */}
      </div>

    </div>
  )
}

export default Expenses