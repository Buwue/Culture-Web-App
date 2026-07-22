import supabase from "./supabaseClient"

export const fetchExamNameId = async (allowableIds) => {
  const { data, error } = await supabase
    .from("Exams")
    .select("id,Name")
    .in("id", allowableIds)
  if (error) {
    throw new Error(error.message)
  }

  return {
    examNames: data.map((elt) => elt.Name),
    examIds: data.map((elt) => elt.id),
  }
}

export const fetchExamQuestions = async (examId) => {
  const { data: questionIds, error: examError } = await supabase
    .from("Exams")
    .select("Questions")
    .eq("id", examId)
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

export const fetchAllQuestions = async () => {
  const { data, error } = await supabase.from("Questions").select("id")

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const fetchSession = async () => {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession()

  if (sessionError) {
    throw new Error(sessionError.message)
  }

  return { session: sessionData.session }
}

export const fetchUserData = async (id) => {
  const { data: userData, error: userError } = await supabase
    .from("Users")
    .select("*")
    .eq("id", id)
    .single()

  if (userError) {
    throw new Error(userError.message)
  }
  return userData
}

export const upsertUserData = async (userData) => {
  const { error } = await supabase.from("Users").upsert({
    id: userData.id,
    questsAnswered: userData.questsAnswered,
    bookmarked: userData.bookmarked,
    examData: userData.examData,
  })
  if (error) {
    throw new Error(error.message)
  }
}

export const upsertExamData = async (questions, examName) => {
  const { data, error } = await supabase
    .from("Exams")
    .insert({
      Name: examName,
      Questions: questions,
    })
    .select("id")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data.id
}

export const fetchBookmarks = async (userId) => {
  console.log("hi")
  const { data: bookmarkIds, error: bookmarkError } = await supabase
    .from("Users")
    .select("bookmarked")
    .eq("id", userId)
    .single()
  console.log(bookmarkIds)
  if (bookmarkError) {
    throw new Error(bookmarkError.message)
  }

  const { data, error } = await supabase
    .from("Questions")
    .select("*")
    .in("id", bookmarkIds.bookmarked)

  if (error) {
    throw new Error(error.message)
  }

  return data
}
