/**
 * Question filtering and processing utilities for Question Bank feature
 */

/**
 * Extracts unique tags from an array of questions
 * @param {Array} questions - Array of question objects with tags property
 * @returns {Array} Sorted array of unique tag strings
 */
export const extractUniqueTags = (questions) => {
  const tagSet = new Set()
  questions.forEach((q) => {
    if (q.tags && Array.isArray(q.tags)) {
      q.tags.forEach((tag) => tagSet.add(tag))
    }
  })
  return Array.from(tagSet).sort()
}

/**
 * Filters questions based on multiple criteria
 * @param {Array} questions - Array of questions to filter
 * @param {Object} filters - Filter criteria
 * @param {String} filters.difficulty - Difficulty level filter
 * @param {String} filters.search - Search term for title/description
 * @param {String} filters.tag - Tag filter
 * @returns {Array} Filtered questions
 */
export const filterQuestions = (questions, { difficulty, search, tag }) => {
  return questions.filter((q) => {
    // Difficulty filter
    if (difficulty && difficulty !== 'All' && q.difficulty !== difficulty) {
      return false
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase()
      const titleMatch = q.title?.toLowerCase().includes(searchLower)
      const descriptionMatch = q.description?.toLowerCase().includes(searchLower)
      if (!titleMatch && !descriptionMatch) {
        return false
      }
    }

    // Tag filter
    if (tag && Array.isArray(q.tags)) {
      if (!q.tags.includes(tag)) {
        return false
      }
    }

    return true
  })
}

/**
 * Sorts questions based on specified criteria
 * @param {Array} questions - Array of questions to sort
 * @param {String} sortBy - Sort criterion (newest, oldest, a-z)
 * @returns {Array} Sorted questions
 */
export const sortQuestions = (questions, sortBy) => {
  const sorted = [...questions]

  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    case 'a-z':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return sorted
  }
}

/**
 * Combines filtering and sorting operations
 * @param {Array} questions - Array of questions to process
 * @param {Object} filters - Filter criteria
 * @param {String} sortBy - Sort criterion
 * @returns {Array} Processed questions
 */
export const processQuestions = (questions, filters, sortBy) => {
  const filtered = filterQuestions(questions, filters)
  return sortQuestions(filtered, sortBy)
}
