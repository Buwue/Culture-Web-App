"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { Hash } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
interface InteractiveJumpProps {
  totalPages: number
  activePage: number
  setActivePage: (page: number) => void
  setChosOpt: (page: any) => void
}
export default function InteractiveJump({
  totalPages,
  activePage,
  setActivePage,
  setChosOpt,
  isBmPressed,
}: InteractiveJumpProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [inputValue, setInputValue] = React.useState(activePage.toString())

  const handlePageChange = (page: number) => {
    const newPage = Math.max(0, Math.min(totalPages - 1, page))
    if (activePage == newPage) {
      return
    }
    setActivePage(newPage)
    setInputValue(newPage.toString())
    setIsEditing(false)
    setChosOpt(null)
    isBmPressed(false)
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const page = parseInt(inputValue)
    if (!isNaN(page)) {
      handlePageChange(page)
    } else {
      setInputValue(activePage.toString())
      setIsEditing(false)
    }
  }

  return (
    <Pagination className="justify-center">
      <PaginationContent className="gap-2 rounded-xl border bg-background p-1.5">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(activePage - 1)
            }}
            className="group rounded-lg hover:bg-secondary/80"
          />
        </PaginationItem>

        <div className="flex min-w-[140px] items-center justify-center px-2">
          <AnimatePresence mode="wait">
            {!isEditing ? (
              <motion.div
                key="viewer"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                onClick={() => setIsEditing(true)}
                className="group flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1 transition-colors hover:bg-secondary/50"
              >
                <span className="text-sm font-semibold tabular-nums">
                  {activePage}
                </span>
                <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  of {totalPages}
                </span>
                <Hash className="h-3 w-3 text-muted-foreground transition-colors group-hover:text-primary" />
              </motion.div>
            ) : (
              <motion.form
                key="editor"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleInputSubmit}
                className="flex items-center gap-1.5"
              >
                <Input
                  autoFocus
                  className="h-7 w-12 px-1 py-0 text-center text-xs tabular-nums focus-visible:ring-1"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  type="text"
                  inputMode="numeric"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="sm"
                  className="h-7 cursor-pointer px-2 text-[10px] font-bold tracking-tighter uppercase"
                >
                  GO
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <PaginationItem className="hidden sm:block">
          <div className="mx-1 h-4 w-px bg-border" />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(activePage + 1)
            }}
            className="group rounded-lg hover:bg-secondary/80"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
