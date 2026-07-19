import React from "react"
import { Route, Routes } from "react-router-dom"
import SigninPage from "./Routes/Authentication/SigninPage"
import SignupPage from "./Routes/Authentication/SignupPage"
import Window from "./Routes/QuestionWindow/Window"
import { SidebarNavigationSlimDemo } from "./components/page"
import "./styles/index.css"
import ExamSelection from "./Routes/Home/ExamSelection"
import "./lib/utils/taos"
import LoadingPage from "./components/LoadingPage"

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<ExamSelection />} />
      <Route path="/exam/:examName" element={<Window />} />
    </Routes>
  )
}

export default App
