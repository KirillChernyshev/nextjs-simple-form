import { createTodo } from "@/lib/todo.server";
import prisma from "@/lib/prisma";

export const formClasses = "flex flex-col space-y-2";
export const buttonClasses =
  "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300";
export const inputClasses = "rounded-md border border-gray-300 px-4 py-2";

export async function getData() {
  const todos = await prisma.todo.findMany();
  return {
    todos,
  };
}

export default async function TodosRoute() {
  async function addItem(formData) {
    "use server";

    const title = formData.get("title") as string;
    return await createTodo({ title });
  }

  const { todos } = await getData();

  return (
    <div className="flex h-screen">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div>
          <h1 className="text-lg font-semibold">Todos</h1>
          <ul className="mt-2">
            {todos.map((todo) => (
              <li key={todo.id}>
                <p>{todo.title}</p>
              </li>
            ))}
          </ul>
        </div>
        <form className={formClasses} method="post" action={addItem}>
          <input className={inputClasses} name="title" />
          <button className={buttonClasses} type="submit">
            Create Todo
          </button>
        </form>
      </div>
    </div>
  );
}
