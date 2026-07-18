import * as React from "react"

export function CircleLetterEIcon({
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    className,
    ...props
}: React.SVGProps<SVGSVGElement> & {
    size?: number
    color?: string
    strokeWidth?: number
}) {
    return (
        <svg
            style={{ width: size, height: size }}
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
            <path d="M14 8h-4v8h4m-4-4h2.5" />
        </svg>
    )
}
