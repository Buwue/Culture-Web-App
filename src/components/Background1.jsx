import React from "react"
import DotField from "@/components/DotField"

function Background1() {
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
          waveAmplitude={1}
          cursorRadius={100}
          cursorForce={30}
          bulgeOnly
          gradientFrom="#f79a6c"
          gradientTo="#FBF7F5"
          glowColor="#f79a6c"
        />
      </div>
    </div>
  )
}

export default Background1
