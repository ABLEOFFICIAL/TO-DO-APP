import Link from "next/link";

export default function TodoCard({ children, id }) {
  return (
    <Link
      href={`/${id}`}
      className="w-full bg-white h-28 rounded-md shadow-sm p-3 flex items-center justify-between"
    >
      {children}
    </Link>
  );
}
