import { createTodo } from "@/lib/todo.server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const formClasses = "flex flex-col space-y-2 min-w-[50vw]";
export const inputClasses = "rounded-md border border-gray-300 px-4 py-2";
export const buttonClasses =
  "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300";

// This is a Server Action outside the component
// We can use it without "use server" label
export async function getData() {
  const todos = await prisma.todo.findMany(); // fetch from database
  return { todos };
}

export default async function TodosRoute() {
  // This is a Server Action inside the component
  // We should add "use server" label
  async function addItem(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    console.log("title", title);
    await createTodo({ title }); // save to database

    revalidatePath("/todos");
  }

  const { todos } = await getData();

  return (
    <div className="flex">
      <div className="w-screen flex flex-col justify-center items-center">
        <div className="min-w-[50vw]">
          <h1 className="text-lg font-semibold">Todos</h1>
          <ul className="mt-2">
            {todos.map((todo) => (
              <li key={todo.id}>
                <p>{todo.title}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Don't need to specify method="POST",
            Next.js sends POST for form actions by default */}
        <form key={todos.length} className={formClasses} action={addItem}>
          <input className={inputClasses} name="title" />
          <button className={buttonClasses} type="submit">
            Create Todo
          </button>
        </form>
      </div>
    </div>
  );
}
