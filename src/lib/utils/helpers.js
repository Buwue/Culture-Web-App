export const getOptColor = (chosOpt, numOpt, corrOpt, display, waitForOpt) => {
  const disabled = "pointer-events-none cursor-not-allowed"

  if (waitForOpt && chosOpt == null) {
    return "text-[#202153]"
  }

  if (!display) {
    return numOpt == chosOpt ? "text-amber-500" : "text-[#202153]"
  }

  return numOpt == corrOpt
    ? `text-green-500 ${disabled}`
    : numOpt == chosOpt
      ? `text-red-500 ${disabled}`
      : `text-neutral-400 opacity-80 ${disabled}`
}
