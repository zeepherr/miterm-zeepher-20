import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { toast } from "react-toastify";
import Contents from "../components/Contents";
import Loading from "../components/Loading";
import { todoSche } from "../schemas/todoSchema";
import { useTodoStore } from "../stores/todoStore";
import { useUserStore } from "../stores/userStore";

const defaultV = {
  content: "",
};
function Home() {
  const [form, setForm] = useState(defaultV);
  const loading = useTodoStore((store) => store.loading);
  // const user = useUserStore((store) => store.user.user);
  const fetch = useTodoStore((store) => store.fetchTodo);
  const createTodo = useTodoStore((store) => store.createTodo);
  const token = useUserStore((store) => store.token);
  const hdlCreate = async (evt) => {
    evt.preventDefault();
    const valid = todoSche.safeParse(form);
    if (!valid.success) {
      const err = valid.error.flatten().fieldErrors.content[0];
      err && toast.error(valid.error.flatten().fieldErrors.content[0]);
    }
    try {
      await createTodo(valid.data);
      toast.success("Created successfully!");
      setForm(defaultV);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  if (!token) return <Navigate to={"/login"} replace />;
  if (loading) return <Loading />;
  return (
    <div className="max-h-full max-w-200 mx-auto h-fit p-5 bg-white rounded-sm shadow-xl">
      <div className="">
        <h1 className="text-2xl font-semibold mb-8">My To do</h1>
        <form
          onSubmit={hdlCreate}
          className="w-full flex gap-2 items-center justify-around"
        >
          <input
            onChange={(e) => setForm({ content: e.target.value })}
            type="text"
            name="content"
            placeholder="new task"
            value={form.content}
            className="w-full py-2 px-3 outline-none focus:border-b focus:border-b-gray-300 focus:text-blue-500"
          />
          <button className="text-white shadow-xl  bg-blue-600/90 py-1 px-3 rounded-2xl text-center cursor-pointer hover:bg-blue-700 ">
            Add
          </button>
        </form>
        <Contents />
      </div>
    </div>
  );
}

export default Home;
