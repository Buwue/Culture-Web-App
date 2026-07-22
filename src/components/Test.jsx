import React from "react"
import { Navigate } from "react-router-dom"
import supabase from "../lib/supabaseClient"
import { useMutation } from "@tanstack/react-query"
import { signOut } from "../lib/authHandler"

function Test() {
  const { error } = useMutation({
    mutationFn: signOut(),
  })

  return <Navigate to="/" />
}

export default Test
