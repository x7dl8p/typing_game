export const themes = [
  { name: "dark", label: "dark" },
  { name: "light", label: "light" },
  { name: "blue", label: "blue" },
  { name: "red", label: "red" },
  { name: "yellow", label: "yellow" },
  { name: "green", label: "green" },
  { name: "purple", label: "purple" },
]

export const getCursorColor = (theme?: string) => {
  switch (theme) {
    case "blue":
      return "bg-blue-500"
    case "red":
      return "bg-red-500"
    case "yellow":
      return "bg-yellow-500"
    case "green":
      return "bg-green-500"
    case "purple":
      return "bg-purple-500"
    case "dark":
      return "bg-blue-400"
    case "light":
    default:
      return "bg-blue-500"
  }
}

export const getErrorColor = (theme?: string) => {
  switch (theme) {
    case "blue":
      return "text-red-500"
    case "red":
      return "text-red-600"
    case "yellow":
      return "text-red-600"
    case "green":
      return "text-red-600"
    case "purple":
      return "text-red-500"
    case "dark":
      return "text-red-500"
    case "light":
    default:
      return "text-red-500"
  }
}

export const getThemeTextColor = (theme?: string) => {
  switch (theme) {
    case "dark":
      return "text-neutral-500"
    case "light":
      return "text-neutral-600"
    case "blue":
      return "text-blue-600"
    case "red":
      return "text-red-600"
    case "yellow":
      return "text-yellow-600"
    case "green":
      return "text-green-600"
    case "purple":
      return "text-purple-600"
    default:
      return "text-neutral-600"
  }
}

export const getThemeResultColor = (theme?: string) => {
  switch (theme) {
    case "dark":
      return "text-neutral-500"
    case "light":
      return "text-neutral-600"
    case "blue":
      return "text-blue-700"
    case "red":
      return "text-red-700"
    case "yellow":
      return "text-yellow-700"
    case "green":
      return "text-green-700"
    case "purple":
      return "text-purple-700"
    default:
      return "text-neutral-600"
  }
}