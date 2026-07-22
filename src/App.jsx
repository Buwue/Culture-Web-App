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
import { Toaster } from "@/components/ui/sonner"
import ProtectedRoute from "./Routes/ProtectedRoute"
import ExamResults from "./Routes/ExamResults/ExamResults"
import Bookmarks from "./Routes/Bookmarks/Bookmarks"
import Test from "./components/Test"

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ExamSelection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exam/:examId"
          element={
            <ProtectedRoute>
              <Window />
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/examresults"
          element={
            <ProtectedRoute>
              <ExamResults />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <Bookmarks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
