import { CircleLetterAIcon } from "@/components/icons/tabler-circle-letter-a"
import { CircleLetterBIcon } from "@/components/icons/tabler-circle-letter-b"
import { CircleLetterCIcon } from "@/components/icons/tabler-circle-letter-c"
import { CircleLetterDIcon } from "@/components/icons/tabler-circle-letter-d"
import { CircleLetterEIcon } from "@/components/icons/tabler-circle-letter-e"
import InteractiveJump from "@/components/shadcn-space/pagination/pagination-03"
import ButtonCopy from "@/components/smoothui/button-copy/index"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookIcon, Lightbulb, LoaderIcon } from "lucide-react"
import SmoothButton from "@/components/smoothui/smooth-button"
import { AcademicCapIcon } from "@/components/icons/heroicons-academic-cap"
import { SidebarNavigationSlimDemo } from "../../components/page"
import { BookmarkIcon } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchExamQuestions, upsertUserData } from "../../lib/fetchHandler"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from "react"
import LoadingPage from "../../components/LoadingPage"
import { AnimatePresence, motion } from "motion/react"
import { Bubble, BubbleReactions } from "../../components/ui/bubble"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "../../lib/utils"
import { InfoIcon } from "../../components/icons/akar-icons-info"
import Background1 from "../../components/Background1"
import WindowHeader from "./WindowHeader"
import useSession from "../../hooks/useSession"
import UpperCard from "./UpperCard"
import LowerCard from "./LowerCard"

const letterIcons = {
  0: <CircleLetterAIcon className="size-15 lg:size-32" />,
  1: <CircleLetterBIcon className="size-15 lg:size-32" />,
  2: <CircleLetterCIcon className="size-15 lg:size-32" />,
  3: <CircleLetterDIcon className="size-15 lg:size-32" />,
  4: <CircleLetterEIcon className="size-15 lg:size-32" />,
}

function Window() {
  const { examId } = useParams()
  const { isExamMode, examName } = useLocation().state
  const [currNum, setCurrNum] = useState(0)
  const [chosOpt, setChosOpt] = useState(null)
  const [examTimer, setExamTimer] = useState(6000)
  const [bmPressed, isBmPressed] = useState(false)
  const { userId, userData } = useSession()
  const { mutate } = useMutation({ mutationFn: () => upsertUserData(userData) })
  const navigate = useNavigate()
  const examDataRef = useRef({})

  const {
    data: allQuestions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["questions", examId],
    queryFn: () => fetchExamQuestions(examId),
    enabled: !!examId,
  })

  const handleSelection = (option) => {
    setChosOpt(option)
    if (isExamMode) {
      examDataRef.current[currNum] = option
    } else {
      userData.questsAnswered[allQuestions[currNum].id] = option
      mutate()
    }
  }

  const FinishExams = () => {
    navigate(`/examresults/`, {
      replace: true,
      state: {
        answer: examDataRef.current,
        allQuestions: allQuestions,
        examTimer: examTimer,
        examId: examId,
      },
    })
  }

  const handleBookMarking = () => {
    if (bmPressed) {
      userData.bookmarked = userData.bookmarked.filter(
        (elt) => elt != allQuestions[currNum].id
      )
    } else {
      userData.bookmarked.push(allQuestions[currNum].id)
    }
    isBmPressed((prev) => !prev)
    mutate()
  }

  useEffect(() => {
    const id = setInterval(() => {
      if (examTimer <= 0) {
        FinishExams()
      }
      setExamTimer((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(id)
  }, [])

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
            <Background1 isExamMode={isExamMode} />

            <SidebarNavigationSlimDemo
              disabled={true}
              className="bg-[#FBF7F5]"
            />
            <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-2">
              <WindowHeader
                examName={examName}
                isExamMode={isExamMode}
                examTimer={examTimer}
                FinishExams={FinishExams}
              />
              <div
                className={`relative h-[70dvh] w-[90dvw] lg:h-110 lg:w-[80dvw]`}
              >
                <Card className="h-[70dvh] w-[90dvw] lg:h-110 lg:w-[80dvw]">
                  <UpperCard
                    isExamMode={isExamMode}
                    allQuestions={allQuestions}
                    currNum={currNum}
                    bmPressed={bmPressed}
                    handleBookMarking={handleBookMarking}
                  />
                  <CardFooter className="relative h-full flex-col gap-4 overflow-hidden bg-[#FBF7F5]">
                    <AcademicCapIcon
                      className="pointer-events-none absolute inset-0 z-0 m-auto size-[300px] opacity-20 lg:size-[600px]"
                      size="300"

                      color="#f79a6c"
                    />
                    <div className="relative z-10 flex h-full min-h-0 w-full flex-col gap-4 overflow-x-hidden overflow-y-auto py-2 pr-8 pl-8">
                      <LowerCard
                        allQuestions={allQuestions}
                        currNum={currNum}
                        chosOpt={chosOpt}
                        letterIcons={letterIcons}
                        handleSelection={handleSelection}
                        setChosOpt={setChosOpt}
                        userData={userData}
                        isBmPressed={isBmPressed}
                        isExamMode={isExamMode}
                        examDataRef={examDataRef}
                      />
                    </div>
                  </CardFooter>
                </Card>
              </div>
              <div className="flex w-[90dvw] flex-row items-center justify-between gap-2 lg:w-[80dvw]">
                <SmoothButton
                  disabled={isExamMode}
                  variant="outline"
                  className="min-w-0 justify-start text-sm font-medium text-[#202153] hover:text-foreground aria-expanded:text-foreground"
                  onClick={() => {
                    navigate("/")
                  }}
                >
                  Retour
                </SmoothButton>
                <InteractiveJump
                  className={`text-base`}
                  totalPages={Object.keys(allQuestions).length}
                  activePage={currNum + 1}
                  setActivePage={setCurrNum}
                  setChosOpt={setChosOpt}
                  isBmPressed={isBmPressed}
                />
                <SmoothButton
                  variant="outline"
                  className={`min-w-0 justify-end text-sm font-medium text-[#202153] hover:text-foreground aria-expanded:text-foreground ${isExamMode ? "" : "hidden"}`}
                  onClick={() => {
                    FinishExams()
                  }}
                >
                  End
                </SmoothButton>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Window
