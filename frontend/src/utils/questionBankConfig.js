/**
 * Platform Configuration and Constants
 * Used across the Question Bank feature for consistent platform handling
 */

export const PLATFORM_CONFIG = {
  'LeetCode': {
    name: 'LeetCode',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-900',
    icon: '⚡',
  },
  'HackerRank': {
    name: 'HackerRank',
    color: 'text-green-400',
    bgColor: 'bg-green-900',
    icon: '🏆',
  },
  'Codeforces': {
    name: 'Codeforces',
    color: 'text-blue-400',
    bgColor: 'bg-blue-900',
    icon: '💻',
  },
  'GeeksforGeeks': {
    name: 'GeeksforGeeks',
    color: 'text-orange-400',
    bgColor: 'bg-orange-900',
    icon: '📚',
  },
  'Other': {
    name: 'Other',
    color: 'text-gray-400',
    bgColor: 'bg-gray-900',
    icon: '📝',
  },
}

export const DIFFICULTY_CONFIG = {
  'Easy': {
    class: 'badge-easy',
    bgColor: 'bg-green-900',
    textColor: 'text-green-200',
  },
  'Medium': {
    class: 'badge-medium',
    bgColor: 'bg-yellow-900',
    textColor: 'text-yellow-200',
  },
  'Hard': {
    class: 'badge-hard',
    bgColor: 'bg-red-900',
    textColor: 'text-red-200',
  },
}

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'a-z', label: 'A - Z' },
]

export const ALL_PLATFORMS = ['LeetCode', 'HackerRank', 'Codeforces', 'GeeksforGeeks', 'Other']
