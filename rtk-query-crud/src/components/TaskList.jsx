import { useGetTaskQuery, useDeleteTaskMutation, useUpdateTaskMutation } from "../api/apiSlice"


const TaskList = () => {
    const {data:tasks, isError, isLoading, error} = useGetTaskQuery();
    const [deleteTask] = useDeleteTaskMutation(); 
    const [updateTask] = useUpdateTaskMutation();

    if (isLoading) return <div>Loading....</div>
    else if (isError) return <div>Error: {error.message}</div>

    return (
    <div>
        <h1>TaskList</h1>
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <h3>{task.name}</h3>
                    <p>{task.description}</p>
                    <button onClick={() => deleteTask(task.id)}>
                        Eliminar
                    </button>
                    <input type="checkbox" 
                        id={task.id} 
                        checked={task.completed}
                        onChange={(e) => 
                        updateTask({
                        ...task, 
                        completed: e.target.checked
                        })}></input>
                    <label htmlFor={task.id}>
                        completed
                    </label>
                </li>
            ))}
        </ul>
    </div>
    )
}

export default TaskList
