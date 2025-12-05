import { useState } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { ResultCard } from '@/components/ResultCard'
import { EmptyState } from '@/components/EmptyState'
import { LoadingState } from '@/components/LoadingState'
import { ArticleDrawer } from '@/components/ArticleDrawer'
import { InsightsPanel } from '@/components/InsightsPanel'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Warning } from '@phosphor-icons/react'
import { searchArticles } from '@/lib/api'
import type { SearchResult, SearchInsights } from '@/lib/types'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

function App() {
  const [results, setResults] = useState<SearchResult[]>([])
  const [insights, setInsights] = useState<SearchInsights | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [currentQuery, setCurrentQuery] = useState('')
  const [selectedArticle, setSelectedArticle] = useState<SearchResult | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleSearch = async (query: string) => {
    setIsLoading(true)
    setError(null)
    setHasSearched(true)
    setCurrentQuery(query)
    setInsights(null)
    
    try {
      const response = await searchArticles(query)
      setResults(response.results)
      setInsights(response.insights || null)
      
      toast.success(`Fandt ${response.totalCount} resultater`, {
        description: `Semantisk søgning efter: "${query}"`,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'En uventet fejl opstod'
      setError(errorMessage)
      toast.error('Søgning fejlede', {
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleArticleClick = (article: SearchResult) => {
    setSelectedArticle(article)
    setDrawerOpen(true)
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ScrollArea className="h-full">
                  <div className="space-y-4 pb-8">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">
                        Fandt <span className="font-semibold text-foreground">{results.length}</span> resultater
                        {currentQuery && <> for "<span className="font-medium">{currentQuery}</span>"</>}
                      </p>
                    </div>
                    
                    {results.map((result, index) => (
                      <ResultCard 
                        key={result.id} 
                        result={result} 
                        index={index}
                        onClick={() => handleArticleClick(result)}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {insights && (
                <div className="lg:col-span-1">
                  <div className="sticky top-32">
                    <h2 className="font-display text-xl font-semibold mb-4">
                      AI Assistent Insights
                    </h2>
                    <InsightsPanel insights={insights} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <EmptyState hasSearched={hasSearched} query={currentQuery} />
          )}
        </main>

        <footer className="border-t border-border py-6">
          <div className="container mx-auto px-6 md:px-12">
            <p className="text-sm text-muted-foreground text-center">
              Prototype med fiktive data - Klar til integration med AWS Bedrock Knowledge Base
            </p>
          </div>
        </footer>
      </div>
      
      <ArticleDrawer 
        article={selectedArticle}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      
      <Toaster />
    </>
  )
}

export default App