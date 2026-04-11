import BrowseQuestionsByPlatform from '../components/ui/BrowseQuestionsByPlatform'

export default function QuestionBankPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-4xl font-bold text-white">Question Bank</h1>
          <p className="text-gray-400 mt-0.5 text-sm">
            Browse curated coding problems by platform and difficulty
          </p>
        </div>
      </div>

      <BrowseQuestionsByPlatform />
    </div>
  )
}
