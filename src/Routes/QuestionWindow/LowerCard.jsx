import React, { useEffect } from "react"
import Popup from "./Popup"
import { AcademicCapIcon } from "../../components/icons/heroicons-academic-cap"
import { Bubble } from "../../components/ui/bubble"
import SmoothButton from "../../components/smoothui/smooth-button"
import { cn } from "../../lib/utils"
import { getOptColor } from "../../lib/utils/helpers"

function LowerCard({
  allQuestions,
  currNum,
  chosOpt,
  letterIcons,
  handleSelection,
  setChosOpt,
  userData,
  isBmPressed,
  isExamMode,
  examDataRef,
}) {
  useEffect(() => {
    if (!isExamMode) {
      if (userData.questsAnswered?.[allQuestions[currNum].id] != null) {
        handleSelection(userData.questsAnswered[allQuestions[currNum].id])
      }
    } else {
      if (examDataRef.current?.[currNum] != null) {
        handleSelection(examDataRef.current?.[currNum])
      }
    }
    if (userData.bookmarked.includes(allQuestions[currNum].id)) {
      isBmPressed(true)
    }
  }, [currNum])

  return (
    <>
      {allQuestions[currNum].options.map((elt, index) => (
        <Bubble
          className="h-full w-full max-w-[100%] justify-start"
          key={index}
        >
          {index == allQuestions[currNum].correct &&
          chosOpt != null &&
          !isExamMode ? (
            <Popup allQuestions={allQuestions} currNum={currNum} />
          ) : (
            <></>
          )}
          <SmoothButton
            key={index}
            variant="outline"
            className={cn(
              "h-full w-full min-w-0 justify-start text-[#202153] transition-colors duration-300 lg:text-lg",
              getOptColor(
                chosOpt,
                index,
                allQuestions[currNum].correct,
                !isExamMode,
                true
              )
            )}
            onClick={() => handleSelection(index)}
          >
            <div className="shrink-0 transition-colors duration-300">
              {letterIcons[index]}
            </div>
            <p className="text-left break-words whitespace-normal transition-colors duration-300">
              {elt}
            </p>
          </SmoothButton>
        </Bubble>
      ))}
    </>
  )
}

export default LowerCard
