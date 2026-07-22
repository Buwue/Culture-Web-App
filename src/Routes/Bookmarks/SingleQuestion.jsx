import React, { memo, useState } from "react"
import CollapsibleChangelog from "../../components/shadcn-space/collapsible/collapsible-01"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/ui/collapsible"
import {
  ChevronDown,
  LockOpenIcon,
  LucideCircleCheck,
  LucideCircleMinus,
  LucideCircleX,
} from "lucide-react"
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

function SingleQuestion({
  question,
  index,
  letterIcons,
  getOptColor,
  allQuestions,
  userData,
}) {
  const [isOpened, setOpened] = useState(false)
  const [chosenOpt, setChosenOpt] = useState(null)
  const [displayCorr, setDisplayCorr] = useState(false)

  const toggle = () => {
    setOpened((prev) => !prev)
  }

  return (
    <Collapsible
      key={question.id}
      open={isOpened[index]}
      onOpenChange={() => toggle(index)}
      className="w-full"
    >
      <div className={`overflow-hidden rounded-xl border`}>
        <CollapsibleTrigger className="relative flex h-auto w-full justify-between rounded-none bg-white px-4 py-3 hover:bg-muted">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-foreground">
              {index + 1} - {question.text}
            </span>
          </div>
          <div className="flex flex-row items-center justify-end gap-5">
            <ChevronDown
              className={cn(
                "size-4 text-muted-foreground transition-transform duration-200",
                isOpened && "rotate-180"
              )}
            />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="bg-white data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="space-y-2.5 border-t px-4 py-3">
            {question.options.map((elt, i) => (
              <Bubble
                className="h-full w-full max-w-[100%] justify-start"
                key={i}
              >
                {i == question.correct && displayCorr ? (
                  <Popup allQuestions={allQuestions} currNum={index} />
                ) : (
                  <></>
                )}
                <SmoothButton
                  key={i}
                  variant="outline"
                  className={cn(
                    "h-full w-full justify-start text-[#202153] transition-colors duration-300",
                    getOptColor(chosenOpt, i, question.correct, displayCorr)
                  )}
                >
                  <div className="transition-colors duration-300">
                    {letterIcons[i]}
                  </div>
                  <p className="text-left break-words whitespace-normal transition-colors duration-300">
                    {elt}
                  </p>
                </SmoothButton>
              </Bubble>
            ))}
            <div className="flex flex-row items-center justify-around">
              <SmoothButton
                variant="outline"
                className="h-full justify-start text-xs text-green-500 transition-colors duration-300 lg:text-base"
                onClick={() => {
                  setDisplayCorr((prev) => !prev)
                }}
              >
                Correct Answer
              </SmoothButton>
              <SmoothButton
                variant="outline"
                className="h-full justify-start text-xs transition-colors duration-300 lg:text-base"
                onClick={() =>
                  setChosenOpt((prev) =>
                    !prev ? userData.questsAnswered[question.id] : null
                  )
                }
              >
                Your Answer
              </SmoothButton>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}

export default memo(SingleQuestion)
