import { CircleDashedLetterAIcon } from "@/components/icons/tabler-circle-dashed-letter-a"
import { CircleLetterAIcon } from "@/components/icons/tabler-circle-letter-a"
import { CircleLetterBIcon } from "@/components/icons/tabler-circle-letter-b"
import { CircleLetterCIcon } from "@/components/icons/tabler-circle-letter-c"
import { CircleLetterDIcon } from "@/components/icons/tabler-circle-letter-d"
import { CircleLetterEIcon } from "@/components/icons/tabler-circle-letter-e"
import InteractiveJump from "@/components/shadcn-space/pagination/pagination-03"
// import FloatingPill from "#components/shadcn-space/pagination/pagination-01"
import ButtonCopy from "@/components/smoothui/button-copy/index"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookIcon } from "lucide-react"
import DotField from "@/components/DotField"
import SmoothButton from "@/components/smoothui/smooth-button"
import { AcademicCapIcon } from "@/components/icons/heroicons-academic-cap"

function Window() {
    return (
        <div className="flex flex-col h-dvh w-dvw justify-center items-center gap-2">
            <div className="absolute inset-0 -z-10">
                <div style={{ width: "100%", height: "600px", position: "relative" }}>
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
            <div className="w-[90dvw] lg:w-[80dvw]">
                <div className="self-start">
                    <Badge
                        variant="outline"
                        className="bg-[#FBF7F5] text-xs"
                    >
                        Examen 2025
                    </Badge>
                </div>
            </div>

            <Card className="w-[90dvw] h-[50dvh] lg:h-110 lg:w-[80dvw]">
                <CardHeader className="flex flex-row justify-between items-center ">
                    <CardTitle className="text-xl lg:text-3xl font-title text-[#f79a6c] ">
                        Qui fut le premier empereur romain ?
                    </CardTitle>

                    <div className="flex items-center justify-center">
                        <ButtonCopy
                            duration={2000}
                            loadingDuration={1000}
                        />
                    </div>
                </CardHeader>
                <CardFooter className=" relative flex-col gap-3.5 h-full pr-8 pl-8 bg-[#FBF7F5] overflow-hidden">
                    <AcademicCapIcon
                        className="absolute opacity-20 "
                        size="400"
                        color="#f79a6c"
                    />
                    <SmoothButton
                        variant="outline"
                        className="w-full justify-start text-base lg:text-lg h-full"
                    >
                        <CircleLetterAIcon
                            color="#202153"
                            className="size-15 lg:size-32"
                        />{" "}
                        Jules
                    </SmoothButton>
                    <SmoothButton
                        className="w-full justify-start text-base lg:text-lg h-full"
                        variant="outline"
                    >
                        <CircleLetterBIcon
                            color="#202153"
                            className="size-15 lg:size-32"
                        />{" "}
                        Auguste
                    </SmoothButton>
                    <SmoothButton
                        className="w-full justify-start text-base lg:text-lg h-full"
                        variant="outline"
                    >
                        <CircleLetterCIcon
                            color="#202153"
                            className="size-15 lg:size-32"
                        />{" "}
                        Néron
                    </SmoothButton>
                    <SmoothButton
                        className="w-full justify-start text-base lg:text-lg h-full"
                        variant="outline"
                    >
                        <CircleLetterDIcon
                            color="#202153"
                            className="size-15 lg:size-32"
                        />{" "}
                        Trajan
                    </SmoothButton>
                    <SmoothButton
                        className="w-full justify-start text-base lg:text-lg h-full"
                        variant="outline"
                    >
                        <CircleLetterEIcon
                            color="#202153"
                            className="size-15 lg:size-32"
                            // size={""}
                        />{" "}
                        Constantin
                    </SmoothButton>
                </CardFooter>
            </Card>

            <div className="w-full flex flex-col items-center gap-2">
                <InteractiveJump className="text-base" />
            </div>
        </div>
    )
}

export default Window

