import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { CircularProgress } from "../../components/progress-10"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog"

const colors = [
  "#222052",
  "#F89B6D",
  "#F05254",
  "#8FD5E6",
  "#7FAF8F",
  "#C4AFD4",
  "#E0BC7A",
  "#8C9BAB",
]
const bordColors = [
  "#161638",
  "#A16A49",
  "#A2373A",
  "#5C8B98",
  "#3E6B4F",
  "#8A6E9E",
  "#B08A3E",
  "#4F5D6E",
]

const examColors = [
  "#1B1A43",
  "#CB7F59",
  "#C44344",
  "#75AEBC",
  "#688F75",
  "#A08FAD",
  "#B79A64",
  "#727F8C",
]
const examBordColors = [
  "#12122D",
  "#84563B",
  "#842D2F",
  "#4B717C",
  "#325740",
  "#715A81",
  "#907132",
  "#404C5A",
]

export default function ExamBento({
  examNames,
  isExamMode,
  examIds,
  examData,
  questions,
}) {
  const [exams, setExams] = useState([])
  useEffect(() => {
    let addedColors = examNames.map((examName, i) => {
      let index = Math.floor(Math.random() * colors.length)
      return {
        id: examIds[i],
        questLen: questions[i].length,
        name: examName,
        color: colors[index],
        bordColor: bordColors[index],
      }
    })
    setExams(addedColors)
  }, [])

  return (
    <div className="relative grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {exams.map((exam, index) => (
        // <Link
        //   key={index}
        //   to={`/exam/${exam.id}`}
        //   state={{ isExamMode: isExamMode, examName: exam.name }}
        //   style={{
        //     boxShadow: `0 0 0 2px ${exam.bordColor}, 0 4px 14px 0 ${exam.color}80`,
        //     backgroundColor: exam.color,
        //   }}
        //   className={`group relative flex h-[10dvh] w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] lg:h-[14dvh]`}
        // >
        <div
          key={index}
          style={{
            boxShadow: `0 0 0 2px ${exam.bordColor}, 0 4px 14px 0 ${exam.color}80`,
            backgroundColor: exam.color,
          }}
          className="group relative flex h-[10dvh] w-full flex-row items-center overflow-hidden rounded-2xl p-3 text-white shadow-lg transition-all duration-300 hover:scale-[1.02] lg:h-[14dvh]"
        >
          <AlertDialog>
            <AlertDialogTrigger
              nativeButton={false}
              render={
                <div className="flex h-full w-full flex-row items-center">
                  <CircularProgress
                    size="50"
                    value={(examData[exam.id] * 100) / 20}
                    strokeWidth="5"
                    progressClassName="stroke-blue-500"
                  />
                  <h2 className="text-2xl leading-tight font-bold">
                    {exam.name}
                  </h2>
                </div>
              }
            />
            <AlertDialogContent
              className={`ring ${isExamMode ? "ring-blue-500" : "ring-green-500"}`}
            >
              <AlertDialogHeader className="bg-[#FBF7F5]">
                <AlertDialogTitle className="bg-[#FBF7F5] text-center">
                  You're about to enter{" "}
                  <span
                    className={`underline underline-offset-3 decoration-[${exam.colorBord}]`}
                  >
                    {exam.name}
                  </span>{" "}
                  with <span className="font-bold">{exam.questLen}</span>{" "}
                  questions.
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  You have chosen{" "}
                  <span
                    className={
                      isExamMode
                        ? "font-bold text-blue-500"
                        : "font-bold text-green-500"
                    }
                  >
                    {isExamMode ? "Exam" : "Entrainement"}
                  </span>
                  {isExamMode
                    ? " Mode, meaning you'll be timed and unable to exit until completion."
                    : " Mode, meaning you'll instantly see the answer upon answering."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="bg-[#FBF7F5]">
                <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant={isExamMode ? "destructive" : "outline"}
                  className={
                    isExamMode
                      ? ""
                      : `bg-green-600 text-white hover:bg-green-700`
                  }
                >
                  <Link
                    key={index}
                    to={`/exam/${exam.id}`}
                    state={{ isExamMode: isExamMode, examName: exam.name }}
                    className="flex h-full w-full items-center justify-center"
                  >
                    Continue
                  </Link>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        // </Link>
      ))}
    </div>
  )
}
