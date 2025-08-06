import Logo from "./components/Logo";
import Top from "./components/Top";
import Category from "./components/Category";
import AddModal from "./components/AddModal";
import Todos from "./components/Todos";
// import { TodoProvider } from "./context/contextProvider";
import Note from "./components/Note";

export default function Dashboard() {
  return (
    <div className="bg-[#f5f5f5]">
      <div className="container p-5 w-screen relative min-h-screen">
        <div className="flex items-center justify-between">
          <Logo />
          {/* Note: Folder component is not provided, so omitting it */}
        </div>
        <Top />
        <Category />
        <AddModal />
        <Todos />
        <Note />
      </div>
    </div>
  );
}

// import React from "react";
// import Top from "./components/Top";
// import Logo from "./components/Logo";
// import AddModal from "./components/AddModal";
// import Todos from "./components/Todos";
// import Folder from "./components/Folder";
// import Category from "./components/Category";

// const Dashboard = () => {
//   return (

//     <div className="bg-[#f5f5f5]">
//       <div className="container p-5 w-screen relative min-h-screen">
//         <div className="flex items-center justify-between">
//           <Logo />
//           <Folder />
//         </div>
//         <Top />
//         <Category />
//         <AddModal />
//         <Todos />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
