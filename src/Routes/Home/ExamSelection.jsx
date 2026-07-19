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
import { useQuery } from "@tanstack/react-query"
import { fetchExamNames } from "../../lib/fetcher"
import { AnimatePresence, motion } from "motion/react"
import LoadingPage from "../../components/LoadingPage"

function ExamSelection() {
  const [isExamMode, setIsExamMode] = useState(false)

  const {
    data: examNames,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["exams"],
    queryFn: fetchExamNames,
  })

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
            <div className="absolute inset-0 -z-10">
              <div
                style={{ width: "100%", height: "100%", position: "relative" }}
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
            <div className="flex h-dvh w-dvw flex-col items-center justify-center">
              <div
                className={`relative h-[50dvh] w-[90dvw] lg:h-150 lg:w-[80dvw]`}
              >
                <Card className="h-[50dvh] w-[90dvw] lg:h-150 lg:w-[80dvw]">
                  <CardHeader className="grid grid-cols-3 grid-rows-1 items-center">
                    <div className="flex justify-start">
                      <SmoothButton
                        variant="outline"
                        className="justify-start text-base leading-tight"
                      >
                        Randomize
                      </SmoothButton>
                    </div>

                    <div className="flex justify-center">
                      <CardTitle className="text-2xl font-bold text-[#f79a6c]">
                        Entrainement
                        <p className="text-sm text-neutral-500">
                          {examNames.length} examens disponibles
                        </p>
                      </CardTitle>
                    </div>
                    <div className="flex items-center justify-end">
                      <Switch
                        checked={isExamMode}
                        className="h-7 w-12 data-[state=checked]:bg-rose-500"
                        icon={
                          isExamMode ? (
                            <LockIcon className="h-4 w-4" />
                          ) : (
                            <LockOpenIcon className="h-4 w-4" />
                          )
                        }
                        onCheckedChange={setIsExamMode}
                        thumbClassName="h-6 w-6 data-[state=checked]:translate-x-5"
                      />
                    </div>
                  </CardHeader>
                  <CardFooter className="relative h-full w-full flex-col gap-3.5 overflow-auto bg-[#FBF7F5] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-button]:h-0 [&::-webkit-scrollbar-button]:w-0 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-stone-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700">
                    <AcademicCapSolidIcon
                      className="absolute opacity-20"
                      size="600"
                      color="#f79a6c"
                    />
                    <ExamBento examNames={examNames} isExamMode={isExamMode} />
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
