export default function TodoCard({ children }) {
  return (
    <div className="w-full bg-white h-28 rounded-md shadow-sm p-3 flex items-center justify-between">
      {children}
    </div>
  );
}

// import React from "react";

// export default function TodoCard({ children }) {
//   return (
//     <div className="w-full bg-white h-28 rounded-md shadow-sm p-3 flex items-center justify-between ">
//       {children}
//     </div>
//   );
// }
