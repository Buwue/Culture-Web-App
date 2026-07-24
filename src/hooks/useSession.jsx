import { useQuery } from "@tanstack/react-query"
import supabase from "../lib/supabaseClient"
import { fetchSession, fetchUserData } from "../lib/fetchHandler"
import { useEffect } from "react"
import { queryClient } from "../main"

const useSession = () => {
  const { data: session, isLoading: isLoadingS } = useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    staleTime: Infinity,
  })

  const { data: userData, isLoading: isLoadingD } = useQuery({
    queryKey: ["userData", session?.session?.user?.id],
    queryFn: () => fetchUserData(session.session.user.id),
    enabled: !isLoadingS && !!session?.session?.user?.id,
  })

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((e, newSession) => {
      queryClient.setQueryData(["session"], { session: newSession })
    })

    return () => subscription.unsubscribe()
  }, [])

  return {
    userId: session?.session?.user?.id ?? null,
    loading: isLoadingS || isLoadingD,
    userData: userData,
  }
}

export default useSession
