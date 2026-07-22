import React from "react"
import { BubbleReactions } from "../../components/ui/bubble"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Lightbulb } from "lucide-react"

function Popup({ allQuestions, currNum }) {
  return (
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
  )
}

export default Popup
