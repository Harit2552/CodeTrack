# Question Bank API Integration Documentation

This document explains the API integration patterns used in the Question Bank feature.

## Endpoint

- Method: `GET`
- Path: `/api/problems/browse`
- Purpose: Retrieve questions from the question bank with optional filtering.
- Authentication: Required (`Bearer` token)

## Query Parameters

- `platform` (required): `LeetCode`, `HackerRank`, `Codeforces`, `GeeksforGeeks`, `Other`, or `All`
- `difficulty` (optional): `Easy`, `Medium`, `Hard`
- `search` (optional): Search term for full-text search
- `tags` (optional): Filter by a specific tag
- `sortBy` (optional): `newest`, `oldest`, `a-z`

## Example Requests

1. Get all LeetCode questions:
	- `GET /api/problems/browse?platform=LeetCode`
2. Get Medium problems from all platforms:
	- `GET /api/problems/browse?platform=All&difficulty=Medium`
3. Search for array problems from all platforms:
	- `GET /api/problems/browse?platform=All&search=array`
4. Get Dynamic Programming problems sorted by newest:
	- `GET /api/problems/browse?platform=LeetCode&tags=DP&sortBy=newest`

## Response Format

```json
{
  "success": true,
  "questions": [
	 {
		"_id": "...",
		"title": "Two Sum",
		"platform": "LeetCode",
		"difficulty": "Easy",
		"tags": ["Array", "Hash Table"],
		"link": "https://leetcode.com/problems/two-sum",
		"createdAt": "2024-01-15T10:30:00Z",
		"description": "..."
	 }
  ],
  "count": 150,
  "platform": "All"
}
```

## Error Responses

- `401`: Unauthorized (missing or invalid token)
- `400`: Bad request (invalid parameters)
- `500`: Server error

## Frontend Integration Pattern

The `BrowseQuestionsByPlatform` component uses this flow:

1. User selects platform and applies filters.
2. `fetchQuestions()` is called with the selected platform.
3. For `All` platform:
	- Sequential API calls are made to each platform.
	- Results are aggregated.
	- Tags are extracted from all questions.
4. For a specific platform:
	- One API call is made.
	- Questions are processed directly.
5. Filtering happens on the client side:
	- Difficulty filter
	- Search/text filter
	- Tag filter
6. Sorting is applied on the client side.

This approach works because:

- The API is lightweight (returns only questions).
- Client-side filtering provides instant feedback.
- Users can apply multiple filters without page reloads.

## Performance Considerations

1. `All` platform requests:
	- Currently uses sequential API calls (one per platform).
	- Could be optimized with `Promise.all()` if backend batch endpoints are added.
	- Trade-off: Sequential calls reduce race condition risks but are slower.
2. Client-side filtering:
	- Provides instant feedback (no network latency for each filter change).
	- Works well with typical question bank sizes (under 1000 questions).
	- Pagination may be needed for very large datasets.
3. Tag extraction:
	- Done once on fetch, not on every filter change.
	- Reduces repeated computations.
4. Future optimizations:
	- Add backend pagination for large datasets.
	- Implement server-side filtering with offset/limit.
	- Add caching for frequently accessed platforms.
	- Use React Query for advanced caching.

## Error Handling Strategy

1. Network errors:
	- Caught in `try-catch`.
	- User sees an error message with retry action.
2. Platform-specific errors (when fetching `All`):
	- A failed platform is skipped.
	- Remaining platforms continue fetching.
	- User can still see partial results.
3. Validation:
	- Empty platform checks
	- Empty questions fallback
	- Missing `data` property handling
4. User feedback:
	- Loading skeleton shown during fetch.
	- Error message with toast notification.
	- Retry button for failed requests.
	- Empty state when no questions are found.
