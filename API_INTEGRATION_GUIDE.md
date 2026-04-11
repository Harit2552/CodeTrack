/**
 * Question Bank API Integration Documentation
 * 
 * This file documents the API integration patterns used in the Question Bank feature
 */

/**
 * API Endpoint: GET /api/problems/browse
 * 
 * Purpose: Retrieve questions from the question bank with optional filtering
 * 
 * Query Parameters:
 * - platform (required): 'LeetCode', 'HackerRank', 'Codeforces', 'GeeksforGeeks', 'Other', or 'All'
 * - difficulty (optional): 'Easy', 'Medium', 'Hard'
 * - search (optional): Search term for full-text search
 * - tags (optional): Filter by specific tag
 * - sortBy (optional): 'newest', 'oldest', 'a-z'
 * 
 * Authentication: Required (Bearer token)
 * 
 * Example Requests:
 * 
 * 1. Get all LeetCode questions:
 *    GET /api/problems/browse?platform=LeetCode
 * 
 * 2. Get Medium to Hard problems:
 *    GET /api/problems/browse?platform=All&difficulty=Medium
 * 
 * 3. Search for array problems from all platforms:
 *    GET /api/problems/browse?platform=All&search=array
 * 
 * 4. Get Dynamic Programming problems sorted by newest:
 *    GET /api/problems/browse?platform=LeetCode&tags=DP&sortBy=newest
 * 
 * Response Format:
 * {
 *   "success": true,
 *   "questions": [
 *     {
 *       "_id": "...",
 *       "title": "Two Sum",
 *       "platform": "LeetCode",
 *       "difficulty": "Easy",
 *       "tags": ["Array", "Hash Table"],
 *       "link": "https://leetcode.com/problems/two-sum",
 *       "createdAt": "2024-01-15T10:30:00Z",
 *       "description": "..."
 *     }
 *   ],
 *   "count": 150,
 *   "platform": "All"
 * }
 * 
 * Error Responses:
 * - 401: Unauthorized (missing/invalid token)
 * - 400: Bad request (invalid parameters)
 * - 500: Server error
 */

/**
 * Frontend API Integration Pattern
 * 
 * The BrowseQuestionsByPlatform component uses the following pattern:
 * 
 * 1. User selects platform and applies filters
 * 2. fetchQuestions() is called with the selected platform
 * 3. For "All" platform:
 *    - Sequential API calls are made to each platform
 *    - Results are aggregated
 *    - Tags are extracted from all questions
 * 4. For specific platform:
 *    - Single API call is made
 *    - Questions are directly processed
 * 5. Filtering happens on the frontend (client-side)
 *    - Difficulty filter
 *    - Search/text filter
 *    - Tag filter
 * 6. Sorting is applied client-side
 * 
 * This approach works because:
 * - API is lightweight (only returns questions)
 * - Filtering on frontend provides instant feedback
 * - User has full control over filters without page reloads
 */

/**
 * Performance Considerations
 * 
 * 1. "All" Platform Requests:
 *    - Currently uses sequential API calls (1 per platform)
 *    - Could be optimized with Promise.all() if backend supports batch endpoints
 *    - Trade-off: Sequential prevents race conditions but is slightly slower
 * 
 * 2. Client-side Filtering:
 *    - Provides instant feedback (no network latency)
 *    - Works well with typical question bank sizes (< 1000 questions)
 *    - Would need pagination for very large question banks
 * 
 * 3. Tag Extraction:
 *    - Done once on fetch, not on every filter change
 *    - Prevents unnecessary computations
 * 
 * 4. Future Optimizations:
 *    - Add Backend Pagination for large datasets
 *    - Implement Server-side Filtering with offset/limit
 *    - Add Caching for frequently accessed platforms
 *    - Use React Query for advanced caching strategies
 */

/**
 * Error Handling Strategy
 * 
 * 1. Network Errors:
 *    - Caught in try-catch block
 *    - User shown error message with retry button
 * 
 * 2. Platform-Specific Errors (when fetching "All"):
 *    - Specific platform failure is skipped
 *    - Other platforms continue fetching
 *    - User sees partial results (not ideal but graceful)
 * 
 * 3. Validation:
 *    - Empty platform check
 *    - Empty questions fallback
 *    - Missing data property handling
 * 
 * 4. User Feedback:
 *    - Loading skeleton shown during fetch
 *    - Error message with toast notification
 *    - Retry button for failed requests
 *    - Empty state when no questions found
 */
