import Task from './Task'


const Tasks = ({ tasks, onDelete, onToggle }) => {
    return <>{tasks.length > 0 ? tasks.map((task) => (
        <Task key={task.id} onDelete={onDelete} onToggle={onToggle} task={task} />
    )) : "No tasks to show"}</>
}


export default Tasks
