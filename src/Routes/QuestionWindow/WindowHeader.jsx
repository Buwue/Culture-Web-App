import React from "react"
import { Badge } from "@/components/ui/badge"
import { InfoIcon } from "../../components/icons/akar-icons-info"

const formatTime = (time) => {
  let minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0")
  let seconds = (time % 60).toString().padStart(2, "0")
  return `${minutes}:${seconds}`
}

function WindowHeader({ examName, isExamMode, examTimer, FinishExams }) {
  return (
    <div className="flex-cols flex w-[90dvw] justify-between lg:w-[80dvw]">
      <Badge variant="outline" className="text-md bg-[#FBF7F5] p-3">
        {examName}
      </Badge>
      {isExamMode ? (
        <Badge
          variant="outline"
          className="flex-cols flex bg-[#FBF7F5] p-3 text-lg text-red-900"
        >
          <InfoIcon /> {formatTime(examTimer)}
        </Badge>
      ) : (
        <></>
      )}
    </div>
  )
}

export default WindowHeader
