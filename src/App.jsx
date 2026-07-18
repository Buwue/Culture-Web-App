import React from "react"
import { Route, Routes } from "react-router-dom"
import SigninPage from "./Routes/Authentication/SigninPage"
import SignupPage from "./Routes/Authentication/SignupPage"
import Window from "./Routes/QuestionWindow/Window"

function App() {
    return (
        <Routes>
            <Route
                path="/signin"
                element={<SigninPage />}
            />
            <Route
                path="/signup"
                element={<SignupPage />}
            />
            <Route
                path="/"
                element={<Window />}
            />
        </Routes>
    )
}

export default App
