import { useState } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { ResultCard } from '@/components/ResultCard'
import { EmptyState } from '@/components/EmptyState'
import { LoadingState } from '@/components/LoadingState'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Warning } from '@phosphor-icons/react'
import { mockSearch } from '@/lib/api'
import type { SearchResult } from '@/lib/types'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

function App() {
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [currentQuery, setCurrentQuery] = useState('')

  const handleSearch = async (query: string) => {
    setIsLoading(true)
    setError(null)
    setHasSearched(true)
    setCurrentQuery(query)
    
    try {
      const response = await mockSearch(query)
      setResults(response.results)
      
      toast.success(`Found ${response.totalCount} results`, {
        description: `Semantic search for: "${query}"`,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      toast.error('Search failed', {
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-6 md:px-12 py-6">
            <div className="mb-6">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">
                TV2 Semantic News Explorer
              </h1>
              <p className="text-muted-foreground text-sm uppercase tracking-wider font-medium">
                AI-Powered Content Discovery
              </p>
            </div>
            
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </header>

        <main className="flex-1 container mx-auto px-6 md:px-12 py-8">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <Warning className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <LoadingState />
          ) : results.length > 0 ? (
            <ScrollArea className="h-full">
              <div className="space-y-4 pb-8">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">
                    Found <span className="font-semibold text-foreground">{results.length}</span> results
                    {currentQuery && <> for "<span className="font-medium">{currentQuery}</span>"</>}
                  </p>
                </div>
                
                {results.map((result, index) => (
                  <ResultCard key={result.id} result={result} index={index} />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <EmptyState hasSearched={hasSearched} query={currentQuery} />
          )}
        </main>

        <footer className="border-t border-border py-6">
          <div className="container mx-auto px-6 md:px-12">
            <p className="text-sm text-muted-foreground text-center">
              Prototype - Connect to AWS Bedrock Knowledge Base for production use
            </p>
          </div>
        </footer>
      </div>
      
      <Toaster />
    </>
  )
}

export default App