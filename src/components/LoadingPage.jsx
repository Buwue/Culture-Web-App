import React from "react"
import DotField from "@/components/DotField"
import { Card, CardFooter, CardHeader } from "./ui/card"
import Aurora from "@/components/Aurora"

const examMotivationQuotes = [
  "The exam doesn't know how hard you've worked, but you do, and that's enough.",
  "Every page you review tonight is a door you won't have to knock on tomorrow.",
  "You don't need to feel ready. You just need to begin.",
  "Confidence is built one solved problem at a time.",
  "The version of you on exam day is built by the version of you right now.",
  "Nervous energy is just readiness wearing the wrong name tag.",
  "You've survived every hard exam before this one. That's not luck, that's a pattern.",
  "Small, steady effort beats last-minute panic every time.",
  "Start messy. Clarity comes after you begin, not before.",
  "One more hour of focus is worth more than ten hours of worry.",

  "Your hands might shake. Let them. Your mind still knows what it knows.",
  "Nervousness is proof that this matters to you, use it, don't fight it.",
  "Breathe first. The answers will still be there in five seconds.",
  "You are not behind. You are exactly where your preparation put you.",
  "The exam is just a conversation between you and everything you've already learned.",
  "Panic shrinks your thinking. Calm expands it. Choose calm.",
  "You don't have to feel brave. You just have to pick up the pen.",
  "This is uncomfortable, not impossible.",
  "Your best isn't measured by how calm you feel, it's measured by what you do next.",
  "Trust the hours you already put in. They didn't disappear.",

  "You know more than your anxiety is telling you.",
  "Doubt is loud, but it isn't accurate.",
  "You've prepared. Let the preparation speak louder than the fear.",
  "Believing in yourself isn't arrogance, it's fuel.",
  "You're not gambling on this exam. You're collecting on your work.",
  "The version of you who studied deserves the trust of the version taking the exam.",
  "Your knowledge doesn't vanish because you're nervous.",
  "You are capable of more than your worst moment of doubt suggests.",
  "Every question you get right today is proof, not luck.",
  "You didn't come this far to underestimate yourself now.",

  "Keep going. Tired and finished are not the same thing.",
  "The hardest part of any exam is usually the ten minutes before it starts.",
  "You don't need motivation for every minute, just the next one.",
  "Discipline finishes what motivation started.",
  "Push through the boring parts. That's where mastery hides.",
  "A tired mind that keeps going will always beat a rested mind that gives up.",
  "One more question. Then one more. That's how exams get finished.",
  "You're not too tired to try, you're just tired of trying alone. So don't. Just keep working.",
  "Endurance is a skill, and you're training it right now.",
  "This exam ends. Your effort right now is what shapes how it ends.",

  "Preparation is confidence you can't fake and can't lose.",
  "You studied for this moment. Let it show.",
  "Every flashcard, every practice question, it all adds up to this.",
  "The work you did in silence is about to speak for you.",
  "You built this readiness. Now use it.",
  "Nothing you studied was wasted, even the parts that felt slow.",
  "You've rehearsed for this more than you think.",
  "Preparation doesn't remove nerves. It removes doubt about whether you can handle them.",
  "The hours you put in are quietly on your side today.",
  "You didn't just study information, you studied how to think under pressure.",

  "Slow down enough to read the question twice. Rushing costs more than it saves.",
  "If you get stuck, move on and come back. Stuck is temporary.",
  "Pressure reveals preparation, let it reveal yours.",
  "You don't need a perfect score. You need your best effort.",
  "Uncertainty on one question doesn't undo everything you know.",
  "Stay in the current question. The next one will wait its turn.",
  "It's okay to not know everything. It's not okay to give up on what you do know.",
  "Your composure is a skill too, practice it today.",
  "The exam rewards focus more than speed.",
  "One hard question isn't the whole test. Keep your perspective.",

  "This exam is a moment, not your whole story.",
  "Whatever happens today, your effort was real and it counted.",
  "You are more than a single score.",
  "Growth doesn't always look like winning, sometimes it looks like showing up scared and trying anyway.",
  "However this goes, you'll learn something that helps next time.",
  "Your worth was never up for grades to decide.",
  "This is one chapter, not the whole book.",
  "You can be proud of your effort regardless of the outcome.",
  "The goal isn't perfection, it's honest effort.",
  "One exam doesn't define your intelligence or your future.",

  "Fear of failing and actual failing are two very different things, don't confuse them.",
  "You can be scared and still walk in and do the work.",
  "Courage today just looks like sitting down and starting.",
  "The fear will fade the moment you start writing your first answer.",
  "You don't have to silence the fear. You just have to work alongside it.",
  "Every person who's ever passed a hard exam felt exactly what you're feeling now.",
  "Fear shrinks the second you take action against it.",
  "You are allowed to be nervous and prepared at the same time.",
  "The exam is scary. You are still capable.",
  "Facing this exam is already a form of bravery.",

  "Finish the exam the way you started it, with full effort.",
  "The last ten minutes matter as much as the first ten.",
  "Don't leave answers unwritten out of fear, write what you know.",
  "A finished attempt beats a perfect one that was never tried.",
  "Keep your focus until the very last question, that's where scores are won or lost.",
  "You made it this far into the exam. Finish it the same way.",
  "Every answer you complete is one less thing left to chance.",
  "Don't quit on question 20 after fighting through the first 19.",
  "Cross the finish line, don't just approach it.",
  "The final stretch is where discipline outlasts fatigue.",
]

function LoadingPage() {
  return (
    <div className="relative flex h-dvh w-dvw flex-col items-center justify-center gap-2">
      <div className="absolute inset-0 -z-10">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <Aurora
            colorStops={["#4A6FA5", "#f79a6c", "#8A6E9E"]}
            blend={0.5}
            amplitude={1.0}
            speed={1}
          />
        </div>
      </div>
      <svg
        className="drop-shadow-black-500/60 size-32 animate-pulse text-[#222052] drop-shadow-[0_0_12px]"
        xmlns="http://www.w3.org/2000/svg"
        width="56.467"
        height="36.521"
        viewBox="0 0 56.467 36.521"
      >
        <path
          d="M56.455,5.766a.821.821,0,0,0-.06-.184,1.067,1.067,0,0,0-.045-.114.8.8,0,0,0-.076-.1.8.8,0,0,0-.148-.158l0,0a.865.865,0,0,0-.569-.188h-.006l-10.98.627a.892.892,0,0,0-.834,1l.3,2.383a.893.893,0,0,0,1.127.747l4.976-1.406c-.479.344-.892.641-1.216.878Q33.468,20.279,24.709,24.659T8.466,29.039a1.854,1.854,0,0,1-1.181-2.017A8.9,8.9,0,0,1,8.86,22.79q1.572-2.607,2.264-2.609a1.766,1.766,0,0,1,1.083.3,2.57,2.57,0,0,0,2.412,1.476q1.624,0,6.693-2.51a44.517,44.517,0,0,0,9.7-6.6q4.625-4.083,4.626-7.333a5.186,5.186,0,0,0-2.018-3.642A6.342,6.342,0,0,0,29.238,0Q23.921,0,17.031,4.184A43.789,43.789,0,0,0,5.071,14.913Q0,21.463,0,27.268q0,9.253,7.58,9.253,6.4,0,16.537-5.463A127.41,127.41,0,0,0,42.083,19.49q6.105-4.759,10.435-8.8l-2.151,4.93a.892.892,0,0,0,.519,1.2l2.263.806a.893.893,0,0,0,1.175-.67L56.446,6.117a.948.948,0,0,0,.009-.351m-36.57,4.521q6.1-5.265,8.663-5.265c.393,0,.591.163.591.492q0,1.77-6.449,6.594t-8.613,4.824c-.2,0-.295-.066-.295-.2q0-1.18,6.1-6.448"
          fill="currentColor"
        />
      </svg>
      <div className="flex w-full items-center justify-center">
        <p className="text-center text-lg text-neutral-600">
          {
            examMotivationQuotes[
              Math.floor(Math.random() * examMotivationQuotes.length)
            ]
          }
        </p>
      </div>
    </div>
  )
}

export default LoadingPage
