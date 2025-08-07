import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "@/components/organisms/Layout"
import TasksPage from "@/components/pages/TasksPage"
import ArchivePage from "@/components/pages/ArchivePage"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/today" replace />} />
            <Route path="/today" element={<TasksPage filter="today" />} />
            <Route path="/upcoming" element={<TasksPage filter="upcoming" />} />
            <Route path="/all" element={<TasksPage filter="all" />} />
            <Route path="/archive" element={<ArchivePage />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  )
}

export default App