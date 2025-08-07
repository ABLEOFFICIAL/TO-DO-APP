import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TodoCard({ children, id }) {
  const router = useRouter();
  const viewTodo = () => {
    console.log(window.screen.width);

    router.push(`/${id}`);
  };

  return (
    <button
      onClick={viewTodo}
      // href={`/${id}`}
      className="w-full bg-white lg:bg-[#f5f5f5] h-28 rounded-md shadow-sm p-3 flex items-center justify-between"
    >
      {children}
    </button>
  );
}
