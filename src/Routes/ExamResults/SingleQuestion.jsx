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
  answer,
  letterIcons,
  getOptColor,
  allQuestions,
}) {
  const [isOpened, setOpened] = useState(false)

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
        <CollapsibleTrigger className="flex h-auto w-full justify-between gap-2 rounded-none bg-white px-4 py-3 hover:bg-muted">
          <div className="flex items-center gap-3">
            <span className="text-left font-semibold text-foreground lg:text-base">
              {index + 1} - {question.text}
            </span>
          </div>
          <div className="flex flex-row items-center justify-end gap-5">
            {answer?.[index] == null ? (
              <LucideCircleMinus />
            ) : answer?.[index] == question.correct ? (
              <LucideCircleCheck className="text-green-500" />
            ) : (
              <LucideCircleX className="text-red-500" />
            )}
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
                {i == question.correct ? (
                  <Popup allQuestions={allQuestions} currNum={index} />
                ) : (
                  <></>
                )}
                <SmoothButton
                  key={i}
                  variant="outline"
                  className={cn(
                    "h-full w-full justify-start text-[#202153] transition-colors duration-300",
                    getOptColor(answer?.[index], i, question.correct, false)
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
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}

export default memo(SingleQuestion)
