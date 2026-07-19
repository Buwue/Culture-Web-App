import supabase from "./supabaseClient"

export const fetchExamNames = async () => {
  const { data, error } = await supabase.from("Exams").select("Name")

  if (error) {
    throw new Error(error.msg)
  }
  return data
}

export const fetchExamQuestions = async (examName) => {
  const { data: questionIds, error: examError } = await supabase
    .from("Exams")
    .select("Questions")
    .eq("Name", examName)
    .single()

  if (examError) {
    throw new Error(examError.message)
  }

  const { data, error } = await supabase
    .from("Questions")
    .select("*")
    .in("id", questionIds.Questions)

  if (error) {
    throw new Error(error.message)
  }

  return data
}
