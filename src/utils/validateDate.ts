const validateDate = (date: Date) => {
  return date instanceof Date && !isNaN(date.getTime()) ? date : undefined
}

export { validateDate }
