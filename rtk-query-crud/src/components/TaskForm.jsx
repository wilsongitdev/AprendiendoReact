import { useCreateTaskMutation } from "../api/apiSlice";


const TaskForm = () => {

    const [createTask] = useCreateTaskMutation()
    const handleSubmit = (e) => {
      e.preventDefault();
      const name = e.target.elements.name.value.trim();
      const description = e.target.elements.description.value.trim();
      const completed = e.target.elements.completed.checked;
      
      createTask({
        name,
        description,
        completed
      })
    }
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskName">Nombre</label>
        <input type="text" name="name" autoComplete="off" id="taskName"></input>
        <label htmlFor="taskDescription">Description</label>
        <input type="text" name="description" autoComplete="off" id="taskDescription"></input>
        <label htmlFor="taskCompleted">completed</label>
        <input type="checkbox" name="completed" id="taskCompleted"></input>
        <button>Add Task</button>
      </form>
    )
}

export default TaskForm
