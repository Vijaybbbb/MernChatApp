import { useState } from 'react'
import './App.css'
import { Button } from '@chakra-ui/react'
import {Route} from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import ChatPage from './Pages/ChatPage/ChatPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
    <Route path='/' component={HomePage} exact/>
    <Route path='/chats' component={ChatPage}/>
    
    </div>
  )
}

export default App
