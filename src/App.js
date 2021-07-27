import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import About from './components/About'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import Header from './components/Header'
import Tasks from './components/Tasks'
//import logo from './logo.svg'


function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }

        getTasks()
    }, [])

    // Fetch Tasks from db.json
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()

        console.debug(data)
        return data
    }

    // Fetch Tasks from db.json
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()

        console.debug(data)
        return data
    }
    
    // Add Task
    const addTask = async (task) => {
        console.debug('add', task)

        const res = await fetch("http://localhost:5000/tasks", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await res.json()
        setTasks([...tasks, data])

        /*
        console.debug("add", task)

        // find next available id
        let uids = tasks.map((task) => task.id)
        let uid = 1
        while (uids.includes(uid)) { uid++ }
        const newTask = {id: uid, ...task}

        setTasks([...tasks, newTask])
        // setShowAddTask(false)
        */
    }

    // Delete Task
    const deleteTask = async (id) => {
        console.debug("delete", id)

        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "DELETE"
        })

        setTasks(tasks.filter((task) => task.id !== id))
    }
  
    // Toggle Reminder
    const toggleReminder = async (id) => {
        console.debug("toggle", id)

        const taskToToggle = await fetchTask(id)
        const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder }

        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({reminder: updatedTask.reminder})
        })

        setTasks(tasks.map((task) =>
            task.id === id ? updatedTask : task
        ))
    }

    return (
        <Router>
            <div className="container">
                <Header title="Task Tracker" onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />

                <Route path="/" exact render={(props) => (
                    <>
                        {showAddTask && <AddTask onAdd={addTask} />}
                        <Tasks onDelete={deleteTask} onToggle={toggleReminder} tasks={tasks} />
                    </>
                )} />
                <Route path="/about" component={About} />
                <Footer />
            </div>
        </Router>
    )
}

export default App
