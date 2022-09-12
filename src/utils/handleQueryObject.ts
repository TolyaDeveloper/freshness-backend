const handleQueryObject = (dbQuery: Record<string, unknown>) => {
  const isUndefinedExists = Object.values(dbQuery).some(
    query => typeof query === 'undefined'
  )

  if (isUndefinedExists) {
    return undefined
  }

  return dbQuery
}

export { handleQueryObject }
