import React, { useState } from "react"
import { SidebarNavigationSlimDemo } from "../../components/page"
import ExamBento from "./ExamBento"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DotField from "@/components/DotField"
import {
  CircleAlertIcon,
  Loader2Icon,
  LoaderIcon,
  LockIcon,
  LockOpenIcon,
  MoonIcon,
  SunMediumIcon,
} from "lucide-react"
import { Switch } from "@/components/switch-07"
import { AcademicCapSolidIcon } from "../../components/icons/heroicons-academic-cap-solid"
import SmoothButton from "@/components/smoothui/smooth-button"
import { Spinner } from "@/components/ui/spinner"
import { useMutation, useQuery } from "@tanstack/react-query"
import {
  fetchAllQuestions,
  fetchExamNameId,
  upsertExamData,
  upsertUserData,
} from "../../lib/fetchHandler"
import { AnimatePresence, motion } from "motion/react"
import LoadingPage from "../../components/LoadingPage"
import Background1 from "../../components/Background1"
import useSession from "../../hooks/useSession"
import { Navigate, useNavigate } from "react-router-dom"

function ExamSelection() {
  const navigate = useNavigate()
  const [isExamMode, setIsExamMode] = useState(false)
  const { userData } = useSession()

  const {
    data: { examNames, examIds } = {},
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["exams"],
    queryFn: () => fetchExamNameId(Object.keys(userData.examData)),
  })

  const { mutate: mutateRandomizer } = useMutation({
    mutationFn: async () => {
      let questionIds = await fetchAllQuestions()
      let allowedQuestionIds = questionIds
        .map((value) => ({ value: value.id, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .splice(0, 80)

      let examId = await upsertExamData(
        allowedQuestionIds,
        `Examen #${examNames.length}`
      )
      return { examId: examId, examName: `Examen #${examNames.length}` }
    },

    onError: (err) => console.log(err),
    onSuccess: async ({ examId, examName }) => {
      userData.examData[examId] = 0
      await upsertUserData(userData)
      refetch()
      navigate(`/exam/${examId}`, {
        state: { examName: examName, isExamMode: isExamMode },
      })
    },
  })

  const handleRandomize = () => {
    mutateRandomizer()
  }

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
      ) : (
        <>
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExamMode && (
              <motion.div
                key="exam-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="pointer-events-none fixed inset-0 z-[100] animate-pulse bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(43,127,255,0.35)_100%)]"
              />
            )}
            <SidebarNavigationSlimDemo className="bg-[#FBF7F5]" />
            <Background1 isExamMode={isExamMode} />
            <div className="relative flex h-dvh min-h-0 w-dvw flex-col items-center justify-center overflow-hidden">
              <div
                className={`relative h-[80dvh] w-[90dvw] sm:h-[50dvh] sm:w-[90dvw] md:h-[0.5dvh] lg:h-150 lg:w-[80dvw]`}
              >
                <Card
                  className={`h-full sm:h-[80dvh] sm:w-[90dvw] md:h-[0.5dvh] lg:h-150 lg:w-[80dvw]`}
                >
                  <CardHeader className="grid grid-cols-2 grid-rows-1 items-center lg:grid-cols-3">
                    <div className="hidden justify-start lg:flex">
                      <SmoothButton
                        variant="outline"
                        className="h-full justify-start text-sm leading-tight lg:text-base"
                        onClick={handleRandomize}
                      >
                        Randomize
                      </SmoothButton>
                    </div>
                    <div className="flex justify-center">
                      <CardTitle
                        className={`text-center text-2xl font-bold text-[#f79a6c] ${isExamMode ? "text-blue-500" : ""}`}
                      >
                        <motion.span
                          key={isExamMode ? "examen" : "entrainement"}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.25 }}
                          className="inline-block"
                        >
                          {isExamMode ? "Examen" : "Entrainement"}
                        </motion.span>
                        <p className="text-sm text-neutral-500 transition duration-400">
                          {examNames.length} examens disponibles
                        </p>
                      </CardTitle>
                    </div>
                    <div className="flex items-center justify-end">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <SmoothButton
                          variant="outline"
                          className={`h-full justify-start text-sm leading-tight text-black transition duration-300 lg:text-base ${isExamMode ? "text-blue-500 inset-shadow-sm shadow-blue-500" : ""}`}
                          onClick={() => setIsExamMode((prev) => !prev)}
                        >
                          Exam Mode
                        </SmoothButton>
                        <SmoothButton
                          variant="outline"
                          className="h-full justify-start text-sm leading-tight lg:hidden lg:text-base"
                          onClick={handleRandomize}
                        >
                          Randomize
                        </SmoothButton>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="relative h-[100%] w-full gap-3.5 bg-[#FBF7F5]">
                    <AcademicCapSolidIcon
                      className="pointer-events-none absolute inset-0 z-0 m-auto size-[300px] opacity-20 lg:size-[600px]"
                      color="#f79a6c"
                    />
                    <div className="z-10 flex h-[100%] min-h-[100%] w-full flex-col overflow-auto pb-20 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-button]:h-0 [&::-webkit-scrollbar-button]:w-0 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-stone-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700">
                      <ExamBento
                        examNames={examNames}
                        isExamMode={isExamMode}
                        examIds={examIds}
                        examData={userData.examData}
                      />
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ExamSelection
