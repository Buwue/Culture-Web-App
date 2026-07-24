import React from "react"
import DotField from "@/components/DotField"

function Background1({ isExamMode }) {
  return (
    <div className="absolute inset-0 -z-10">
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <DotField
          dotRadius={3}
          dotSpacing={14}
          bulgeStrength={5}
          glowRadius={5}
          sparkle={false}
          waveAmplitude={isExamMode ? 5 : 1}
          cursorRadius={100}
          cursorForce={30}
          bulgeOnly
          gradientFrom={isExamMode ? "#2b7fff" : "#f76c6c"}
          gradientTo="#FBF7F5"
          glowColor={isExamMode ? "#2b7fff" : "#f76c6c"}
        />
      </div>
    </div>
  )
}

export default Background1
