import { CircleDashedLetterAIcon } from "@/components/icons/tabler-circle-dashed-letter-a"
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
import DotField from "@/components/DotField"
import SmoothButton from "@/components/smoothui/smooth-button"
import { AcademicCapIcon } from "@/components/icons/heroicons-academic-cap"
import { SidebarNavigationSlimDemo } from "../../components/page"
import { BookmarkIcon } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { useQuery } from "@tanstack/react-query"
import { fetchExamNames, fetchExamQuestions } from "../../lib/fetcher"
import { useLocation, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
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
import { useHover } from "react-aria"

const letterIcons = {
  0: <CircleLetterAIcon className="size-15 lg:size-32" />,
  1: <CircleLetterBIcon className="size-15 lg:size-32" />,
  2: <CircleLetterCIcon className="size-15 lg:size-32" />,
  3: <CircleLetterDIcon className="size-15 lg:size-32" />,
  4: <CircleLetterEIcon className="size-15 lg:size-32" />,
}

const getOptColor = (chosOpt, numOpt, corrOpt) => {
  if (chosOpt == null) {
    return "text-[#202153]"
  }

  if (numOpt == corrOpt) {
    return "text-green-500 pointer-events-none cursor-not-allowed"
  }

  if (chosOpt == numOpt) {
    return "text-red-500 pointer-events-none cursor-not-allowed"
  }

  return "text-neutral-400 opacity-80 pointer-events-none cursor-not-allowed"
  //   return "pointer-events-none cursor-not-allowed after:absolute after:inset-0 after:rounded-lg after:bg-black/70"
}

const formatTime = (time) => {
  let minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0")
  let seconds = (time % 60).toString().padStart(2, "0")
  return `${minutes}:${seconds}`
}

function Window() {
  const { examName } = useParams()
  const { isExamMode } = useLocation().state
  const [currNum, setCurrNum] = useState(1)
  const [chosOpt, setChosOpt] = useState(null)
  const [examTimer, setExamTimer] = useState(6000)
  const { hoverProps, isHovered } = useHover({})

  const {
    data: allQuestions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["questions", examName],
    queryFn: () => fetchExamQuestions(examName),
    enabled: !!examName,
  })

  const handleSelection = (option) => {
    setChosOpt(option)
  }

  useEffect(() => {
    const id = setInterval(() => {
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
            <SidebarNavigationSlimDemo className="bg-[#FBF7F5]" />
            <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-2">
              <div className="absolute inset-0 -z-10">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <DotField
                    dotRadius={3}
                    dotSpacing={14}
                    bulgeStrength={5}
                    glowRadius={5}
                    sparkle={false}
                    waveAmplitude={1}
                    cursorRadius={100}
                    cursorForce={30}
                    bulgeOnly
                    gradientFrom="#f79a6c"
                    gradientTo="#FBF7F5"
                    glowColor="#f79a6c"
                  />
                </div>
              </div>
              <div className="flex-cols flex w-[90dvw] justify-between lg:w-[80dvw]">
                <Badge variant="outline" className="text-md bg-[#FBF7F5] p-3">
                  {examName}
                </Badge>
                {isExamMode ? (
                  <Badge
                    {...hoverProps}
                    variant="outline"
                    className="w-[10%] animate-pulse bg-[#FBF7F5] p-3 text-lg text-red-900"
                  >
                    {isHovered ? "Exit" : formatTime(examTimer)}
                  </Badge>
                ) : (
                  <></>
                )}
              </div>
              <div
                className={`relative h-[50dvh] w-[90dvw] lg:h-110 lg:w-[80dvw]`}
              >
                <Card className="h-[50dvh] w-[90dvw] lg:h-110 lg:w-[80dvw]">
                  <CardHeader className="flex flex-col gap-2">
                    <div className="flex w-full flex-row items-center justify-between">
                      <CardTitle className="font-title text-xl text-[#f79a6c] lg:text-3xl">
                        {allQuestions[currNum].text}
                      </CardTitle>

                      <div className="flex items-center justify-center">
                        <Toggle
                          aria-label="Toggle bookmark"
                          size="sm"
                          variant="outline"
                        >
                          <BookmarkIcon className="group-aria-pressed/toggle:fill-foreground" />
                          Bookmark
                        </Toggle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="relative h-full flex-col gap-4 overflow-hidden bg-[#FBF7F5] pt-6 pr-8 pl-8">
                    <AcademicCapIcon
                      className="absolute opacity-20"
                      size="400"
                      color="#f79a6c"
                    />
                    {allQuestions[currNum].options.map((elt, index) => (
                      <Bubble
                        className="h-full w-full max-w-[100%] justify-start"
                        key={index}
                      >
                        {index == allQuestions[currNum].correct &&
                        chosOpt != null ? (
                          <BubbleReactions
                            side="top"
                            align="end"
                            className="size-7 bg-amber-100 text-amber-500"
                          >
                            <Popover>
                              <PopoverTrigger
                                render={
                                  <button>
                                    <Lightbulb />
                                  </button>
                                }
                              />
                              <PopoverContent align="start">
                                <PopoverHeader>
                                  <PopoverTitle>Explication</PopoverTitle>
                                  <PopoverDescription>
                                    {allQuestions[currNum].explication}
                                  </PopoverDescription>
                                </PopoverHeader>
                              </PopoverContent>
                            </Popover>
                          </BubbleReactions>
                        ) : (
                          <></>
                        )}
                        <SmoothButton
                          key={index}
                          variant="outline"
                          className={cn(
                            "h-full w-full justify-start text-[#202153] transition-colors duration-300 lg:text-lg",
                            getOptColor(
                              chosOpt,
                              index,
                              allQuestions[currNum].correct
                            )
                          )}
                          onClick={() => handleSelection(index)}
                        >
                          <div className="transition-colors duration-300">
                            {letterIcons[index]}
                          </div>
                          <p className="transition-colors duration-300">
                            {elt}
                          </p>
                        </SmoothButton>
                      </Bubble>
                    ))}
                  </CardFooter>
                </Card>
              </div>
              <div className="flex w-full flex-col items-center gap-2">
                <InteractiveJump
                  className={`text-base`}
                  totalPages={Object.keys(allQuestions).length}
                  activePage={currNum}
                  setActivePage={setCurrNum}
                  setChosOpt={setChosOpt}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Window
