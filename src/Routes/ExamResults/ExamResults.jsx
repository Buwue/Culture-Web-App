import React, { useEffect, useState } from "react"
import CollapsibleChangelog from "../../components/shadcn-space/collapsible/collapsible-01"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/ui/collapsible"
import { ChevronDown, LockOpenIcon } from "lucide-react"
import { Bubble } from "../../components/ui/bubble"
import SmoothButton from "../../components/smoothui/smooth-button"
import Popup from "../QuestionWindow/Popup"
import { cn } from "../../lib/utils"
import { CircleLetterAIcon } from "@/components/icons/tabler-circle-letter-a"
import { CircleLetterBIcon } from "@/components/icons/tabler-circle-letter-b"
import { CircleLetterCIcon } from "@/components/icons/tabler-circle-letter-c"
import { CircleLetterDIcon } from "@/components/icons/tabler-circle-letter-d"
import { CircleLetterEIcon } from "@/components/icons/tabler-circle-letter-e"
import { SidebarNavigationSlimDemo } from "../../components/page"
import Background1 from "../../components/Background1"
import { Switch } from "../../components/switch-07"
import { LockIcon } from "../../components/icons/material-symbols-lock"
import { AcademicCapSolidIcon } from "../../components/icons/heroicons-academic-cap-solid"
import SingleQuestion from "./SingleQuestion"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import { Card } from "../../components/ui/card"
import { BorderBeam } from "../../components/ui/border-beam"
import { ShineBorder } from "../../components/ui/shine-border"
import { Navigate, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"
import {
  fetchExamProgress,
  upsertExamProgress,
  upsertUserData,
} from "../../lib/fetchHandler"
import useSession from "../../hooks/useSession"
import { useQuery } from "@tanstack/react-query"

const formatTime = (time) => {
  let minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0")
  let seconds = (time % 60).toString().padStart(2, "0")
  return `${minutes}:${seconds}`
}

const letterIcons = {
  0: <CircleLetterAIcon className="size-15 lg:size-32" />,
  1: <CircleLetterBIcon className="size-15 lg:size-32" />,
  2: <CircleLetterCIcon className="size-15 lg:size-32" />,
  3: <CircleLetterDIcon className="size-15 lg:size-32" />,
  4: <CircleLetterEIcon className="size-15 lg:size-32" />,
}

function ExamResults() {
  const { userId, userData } = useSession()
  const { answer, allQuestions, examTimer, examId } = useLocation().state

  if (answer == null || allQuestions == null) {
    return <Navigate to="/" />
  }

  const noteCalculator = () => {
    return (
      Math.round(
        ((Object.keys(answer)
          .map((elt) => answer[elt] == allQuestions[elt].correct)
          .reduce((accumulator, curr) => accumulator + Boolean(curr), 0) *
          20) /
          Object.keys(allQuestions).length) *
          100
      ) / 100
    )
  }

  useEffect(() => {
    if (!!userId) {
      userData.examData[examId] = noteCalculator()

      upsertUserData(userData)
    }
  }, [userId])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SidebarNavigationSlimDemo className="bg-[#FBF7F5]" />
        <Background1 />
        <div className="flex h-screen flex-col items-center justify-center gap-3">
          <div className="flex-cols mb-5 flex w-[90dvw] justify-around lg:w-[50dvw]">
            <Card className="relative mb-2 h-[12dvh] w-[22dvw] flex-col items-center justify-center gap-0 bg-[#FBF7F5] p-3 text-center lg:h-[7dvw] lg:w-[10dvw]">
              <h1 className="font-bold lg:text-lg">Questions Done</h1>
              <span className="text-lg font-bold lg:text-3xl">
                {Object.keys(answer).length}/{Object.keys(allQuestions).length}
              </span>
              <BorderBeam
                duration={6}
                borderWidth={2.5}
                size={100}
                className="from-transparent via-[#222052] to-transparent"
              />
              <BorderBeam
                duration={0}
                delay={0}
                size={100}
                borderWidth={2.5}
                className="from-transparent via-[#F89B6D] to-transparent"
              />
            </Card>
            <Card className="relative mb-2 h-[12dvh] w-[22dvw] flex-col items-center justify-center gap-0 bg-[#FBF7F5] p-3 text-center lg:h-[7dvw] lg:w-[10dvw]">
              <h1 className="font-bold lg:text-lg">Note Final</h1>
              <span className="text-lg font-bold lg:text-3xl">
                {noteCalculator().toString().padStart(2, "0")}/20
              </span>
              <BorderBeam
                duration={6}
                delay={8}
                size={100}
                borderWidth={2.5}
                className="from-transparent via-[#F89B6D] to-transparent"
              />
              <BorderBeam
                duration={6}
                borderWidth={2.5}
                size={100}
                className="from-transparent via-[#222052] to-transparent"
              />
            </Card>
            <Card className="relative mb-2 h-[12dvh] w-[22dvw] flex-col items-center justify-center gap-0 bg-[#FBF7F5] p-3 text-center lg:h-[7dvw] lg:w-[10dvw]">
              <h1 className="font-bold lg:text-lg">Time Left</h1>
              <span className="text-lg font-bold lg:text-3xl">
                {formatTime(examTimer)}
              </span>
              <BorderBeam
                duration={6}
                delay={8}
                size={100}
                borderWidth={2.5}
                className="from-transparent via-[#F89B6D] to-transparent"
              />
              <BorderBeam
                duration={6}
                borderWidth={2.5}
                size={100}
                className="from-transparent via-[#222052] to-transparent"
              />
            </Card>
          </div>
          <Card className="relative flex h-[55vh] w-[80dvw] flex-col items-center overflow-auto border bg-[#FBF7F5] lg:w-[60dvw]">
            <div className="flex h-[55vh] w-[79dvw] flex-col items-center gap-4 overflow-auto px-5 lg:w-[59dvw]">
              {allQuestions.map((question, index) => {
                return (
                  <SingleQuestion
                    key={index}
                    question={question}
                    index={index}
                    answer={answer}
                    letterIcons={letterIcons}
                    allQuestions={allQuestions}
                  />
                )
              })}
            </div>
          </Card>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ExamResults
