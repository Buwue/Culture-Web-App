import supabase from "./supabaseClient"

export const signUp = async (password, email) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  })

  if (error) {
    throw new Error(error.message)
  }
  return data
}

export const signIn = async (password, email) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (error) {
    throw new Error(error.message)
  }
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message)
  }
}

export const signInWithGoogle = async () => {
  const { data, error } = supabase.auth.signInWithOAuth({
    provider: "google",
  })

  if (error) {
    throw new Error(error.message)
  }
  return data
}
