import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { CircularProgress } from "../../components/progress-10"

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

export default function ExamBento({ examNames, isExamMode }) {
  const [exams, setExams] = useState([])
  useEffect(() => {
    let addedColors = examNames.map((examName) => {
      let index = Math.floor(Math.random() * colors.length)
      return {
        name: examName.Name,
        color: colors[index],
        bordColor: bordColors[index],
      }
    })
    setExams(addedColors)
  }, [])

  return (
    <div className="relative grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {exams.map((exam, index) => (
        <Link
          key={index}
          to={`/exam/${exam.name}`}
          state={{ isExamMode: isExamMode }}
          style={{
            boxShadow: `0 0 0 2px ${exam.bordColor}, 0 4px 14px 0 ${exam.color}80`,
            backgroundColor: exam.color,
          }}
          className={`group relative flex overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02]`}
        >
          <div className="relative flex w-full flex-row items-center p-6 text-white">
            <CircularProgress
              size="50"
              value="10"
              strokeWidth="5"
              progressClassName="stroke-blue-500"
            />
            <h2 className="text-2xl leading-tight font-bold">{exam.name}</h2>
          </div>
        </Link>
      ))}
    </div>
  )
}
