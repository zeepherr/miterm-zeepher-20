import { faCircleXmark, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useTodoStore } from "../stores/todoStore";

function Contents() {
  const defaultV = {
    content: "",
    isdone: false,
  };
  const [isEdit, setEdit] = useState(0);
  const [form, setForm] = useState(defaultV);
  const contents = useTodoStore((store) => store.content);
  const deleteTodo = useTodoStore((store) => store.deleteTodo);
  const updateTodo = useTodoStore((store) => store.updateTodo);
  const navigate = useNavigate();
  const hdlDelete = async (id) => {
    try {
      const res = await deleteTodo(id);
      toast.success(res.message);
    } catch (err) {
      toast.error(err);
    }
  };
  const hdlUpdate = async (id, form) => {
    if (form.content.length === 0) {
      toast.error("Please enter some words!");
      setEdit(0);
      return;
    }
    try {
      await updateTodo(id, form);
      toast.success("Updaed successfully!");
      setForm(defaultV);
    } catch (error) {
      toast.error(error.message);
    }
    setEdit(0);
    setForm(defaultV);
  };
  let isActive;
  return (
    <div className="grid gap-1.5 p-2 transition-all ease-in duration-150">
      {contents?.map((item) => {
        isActive = isEdit === item.id;

        return (
          <div
            key={item.id}
            className=" relative flex items-center justify-between  text-gray-500  border-b border-b-blue-300  p-1.5 transition-all ease-in duration-150 "
          >
            <div className=" space-x-1 flex items-center justify-evenly ">
              <input
                type="checkbox"
                checked={isActive ? form.isdone : item.isdone}
                onChange={(e) => setForm({ ...form, isdone: e.target.checked })}
              />
              {isActive ? (
                <input
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  autoFocus
                  type="text"
                  name="content"
                  placeholder={item.content}
                  value={isActive ? form.content : item.content}
                  className="w-full shadow-xl outline-none focus:border-b focus:border-b-gray-300 focus:text-blue-500"
                />
              ) : (
                <span>{item.content}</span>
              )}
              {isActive && (
                <button
                  onClick={() => hdlUpdate(item.id, form)}
                  className="text-white px-1 bg-blue-600/90 shadow-xl  rounded-2xl text-center cursor-pointer"
                >
                  Update
                </button>
              )}
            </div>
            <div>
              <span
                onClick={() => setEdit(item.id)}
                className="space-x-1 cursor-pointer hover:text-blue-400 hover:scale-120 transition-all ease-in-out duration-200"
              >
                Edit
                <FontAwesomeIcon icon={faPencil} />
              </span>
              <FontAwesomeIcon
                icon={faCircleXmark}
                onClick={() => hdlDelete(item.id)}
                className="cursor-pointer hover:text-blue-400 hover:scale-120 transition-all ease-in-out duration-200"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Contents;
