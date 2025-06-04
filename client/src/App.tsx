import "./App.css";
import { TaskCard } from "./components/TaskCard";
import { useCreateTask } from "./hooks/useCreateTask";
import { useGetTasks } from "./hooks/useGetTasks";

function App() {
  const { data, isPending, isError } = useGetTasks();
  const { mutate: createTask, isPending: isPendingCreating } = useCreateTask();

  const handleTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    console.log(name);

    if (typeof name === "string" && name.trim().length > 0) {
      createTask(name);
      e.currentTarget.reset();
    }
  };

  return (
    <main className="w-full min-h-full bg-[#121212]">
      <div className="container flex flex-col justify-center items-center gap-12">
        {/* Form Header */}
        <div className="flex flex-col justify-center items-center px-12 w-1/2 h-42 rounded outline-gray-500 outline-1 gap-8">
          <h1 className="text-2xl">Task Manager</h1>
          <div className="w-full">
            <form
              onSubmit={handleTodo}
              method="post"
              className="flex justify-center items-center outline-0 rounded w-full bg-gray-600 h-9 overflow-hidden"
            >
              <input
                type="text"
                name="name"
                id="name"
                minLength={1}
                required
                className="flex-2 outline-0 px-4"
                placeholder="e.g. Doing the math homework"
              />
              <button
                className="flex-1 bg-purple-500 cursor-pointer h-full"
                disabled={isPendingCreating}
              >
                {isPendingCreating ? "Adding Task" : "Create Task"}
              </button>
            </form>
          </div>
        </div>
        {/* Todo Card */}
        <div className="flex flex-col justify-center items-center gap-12 w-1/2">
          {isPending ? (
            <h1>Cargando...</h1>
          ) : isError ? (
            <p>Ocurrió un error al cargar las tareas.</p>
          ) : data?.tasks.length ? (
            data.tasks.map((t) => <TaskCard key={t._id} task={t} />)
          ) : (
            <p>No tasks found.</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
