import React from "react"
import useSession from "../hooks/useSession"
import LoadingPage from "../components/LoadingPage"
import { Navigate } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"

function ProtectedRoute({ children }) {
  const { userId, loading: isLoading } = useSession()

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LoadingPage />
        </motion.div>
      ) : !userId ? (
        <motion.div
          key="redirect"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Navigate to="/signin" />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProtectedRoute
