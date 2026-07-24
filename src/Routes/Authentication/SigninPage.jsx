import { useMutation } from "@tanstack/react-query"
import { LoginForm } from "../../components/login-form"
import { signIn, signInWithGoogle } from "../../lib/authHandler"
import { toast } from "sonner"
import LoadingPage from "../../components/LoadingPage"
import useSession from "../../hooks/useSession"
import { Navigate } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"

function SigninPage({ type }) {
  const { mutate, isPending: pendingEP } = useMutation({
    mutationFn: (values) => signIn(values.password, values.email),
    onError: (err) => toast.error(err.message),
    onSuccess: () => toast.success("User has been logged in."),
  })

  const { mutate: mutateGoogle, isPending: pendingG } = useMutation({
    mutationFn: (values) => signInWithGoogle(),
    onError: (err) => toast.error(err.message),
  })

  const onSubmit = (values) => {
    mutate(values)
  }

  const { userId, loading } = useSession()

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LoadingPage />
        </motion.div>
      ) : userId ? (
        <motion.div
          key="redirect"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Navigate to="/" />
        </motion.div>
      ) : (
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-4xl">
            <LoginForm
              onSubmit={onSubmit}
              isPending={pendingEP || pendingEP}
              mutateGoogle={mutateGoogle}
            />
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default SigninPage
