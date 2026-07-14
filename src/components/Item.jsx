import { faCircleXmark, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useTodoStore } from "../stores/todoStore";

function Item() {
  const defaultV = {
    content: "",
    isdone: false,
  };
  const [isEdit, setEdit] = useState(0);
  const [form, setForm] = useState(defaultV);
  const contents = useTodoStore((store) => store.content);
  const deleteTodo = useTodoStore((store) => store.deleteTodo);
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
    console.log(id, form);
    // try {
    //   await updateTodo(id, form);
    //   toast.success("Created successfully!");
    //   setForm(defaultV);
    // } catch (error) {
    //   toast.error(error.message);
    // }
  };
  console.log(isEdit)
  return (
    <div>
      {contents?.map((item) => {
        const isActive = isEdit === item.id;

        return (
          <div
            key={item.id}
            className=" relative flex items-center justify-between py-1.5 text-gray-500"
          >
            <div className=" space-x-1 flex items-center justify-evenly ">
              <input
                type="checkbox"
                value={isEdit ? form.isdone : item.isdone}
                onChange={(e) => setForm({ isdone: e.target.value })}
                className=""
              />
              {isActive  ? (
                <input
                  onChange={(e) => setForm({ content: e.target.value })}
                  type="text"
                  name="content"
                  value={item.content}
                  className="w-full shadow-xl outline-none focus:border-b focus:border-b-gray-300 focus:text-blue-500"
                />
              ) : (
                <span>{item.content}</span>
              )}
              {isEdit && (
                <button
                  onClick={() => hdlUpdate(item.id, form)}
                  className="text-white px-1 bg-blue-600/90  rounded-2xl text-center cursor-pointer"
                >
                  Update
                </button>
              )}
            </div>
            <div>
              <span
                onClick={() => setEdit(item.id)}
                className="space-x-1 cursor-pointer"
              >
                Edit
                <FontAwesomeIcon icon={faPencil} />
              </span>
              <FontAwesomeIcon
                icon={faCircleXmark}
                onClick={() => hdlDelete(item.id)}
                className="cursor-pointer"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Item;
