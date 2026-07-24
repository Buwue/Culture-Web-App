import React, { useState } from "react"
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
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { BorderBeam } from "../../components/ui/border-beam"
import { ShineBorder } from "../../components/ui/shine-border"
import { Navigate, useLocation } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchBookmarks } from "../../lib/fetchHandler"
import SingleQuestion from "./SingleQuestion"
import useSession from "../../hooks/useSession"
import LoadingPage from "../../components/LoadingPage"
import { AnimatePresence, motion } from "motion/react"

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

function Bookmarks() {
  const { userId, userData } = useSession()

  const {
    data: allQuestions,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["Bookmarks", userData],
    queryFn: () => fetchBookmarks(userId),
    enabled: !!userId,
  })

  return isLoading || !userId ? (
    <AnimatePresence mode="wait">
      <motion.div
        key="loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <LoadingPage />
      </motion.div>
    </AnimatePresence>
  ) : (
    <AnimatePresence mode="wait">
      <motion.div
        key="bookmark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SidebarNavigationSlimDemo className="bg-[#FBF7F5]" />
        <Background1 />
        <div className="flex h-screen flex-col items-center justify-center gap-3">
          <Card className="relative flex h-[80dvh] w-[90dvw] flex-col items-center overflow-auto border lg:h-[70dvh] lg:w-[60dvw]">
            <CardHeader className="flex flex-col gap-2">
              <div className="flex w-full flex-row items-center justify-center">
                <CardTitle className="font-title text-xl text-[#f79a6c] lg:text-3xl">
                  Bookmarks
                </CardTitle>
              </div>
            </CardHeader>
            <CardFooter className="flex h-[80dvh] w-[89dvw] flex-col items-center gap-4 overflow-auto overflow-x-hidden bg-[#FBF7F5] px-5 lg:h-[70vh] lg:w-[59dvw]">
              <div className="flex h-[80dvh] w-[89dvw] flex-col items-center gap-4 overflow-auto px-5 lg:h-[55vh] lg:w-[59dvw]">
                {allQuestions.map((question, index) => {
                  return (
                    <SingleQuestion
                      question={question}
                      index={index}
                      letterIcons={letterIcons}
                      allQuestions={allQuestions}
                      userData={userData}
                    />
                  )
                })}
              </div>
            </CardFooter>
          </Card>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Bookmarks
