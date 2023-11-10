import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskList from './components/taskList'
import TaskForm from './components/TaskForm'


function App() {

  return (
  <>
    <TaskForm/>
    <TaskList />
  </>
  );
}

export default App
