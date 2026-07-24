import { SignupForm } from "../../components/signup-form"
import { LoginForm } from "../../components/login-form"
import { signInWithGoogle, signUp } from "../../lib/authHandler"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import useSession from "../../hooks/useSession"
import LoadingPage from "../../components/LoadingPage"
import { Navigate } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"

function SignupPage() {
  const { mutate, isPending: pendingEP } = useMutation({
    mutationFn: (values) => signUp(values.password, values.email),
    onError: (err) => toast.error(err.message),
    onSuccess: () => toast.success("User has been created."),
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
            <SignupForm
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

export default SignupPage
