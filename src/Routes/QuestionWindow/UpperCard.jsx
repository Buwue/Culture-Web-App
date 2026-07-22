import React from "react"
import { CardHeader, CardTitle } from "../../components/ui/card"
import { Toggle } from "../../components/ui/toggle"
import { BookmarkIcon } from "lucide-react"

function UpperCard({ allQuestions, currNum, bmPressed, handleBookMarking }) {
  return (
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
            onPressedChange={handleBookMarking}
            pressed={bmPressed}
          >
            <BookmarkIcon className="group-aria-pressed/toggle:fill-foreground" />
            Bookmark
          </Toggle>
        </div>
      </div>
    </CardHeader>
  )
}

export default UpperCard
