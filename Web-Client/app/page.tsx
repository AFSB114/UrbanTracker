import { Sidebar } from "@/components/sidebar"
import { SearchPanel } from "@/components/search-panel"
import { MainContent } from "@/components/main-content"

export default function HomePage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <SearchPanel />
      <MainContent />
    </div>
  )
}
