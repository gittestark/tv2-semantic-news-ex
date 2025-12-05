import { useState } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { ResultCard } from '@/components/ResultCard'
import { EmptyState } from '@/components/EmptyState'
import { LoadingState } from '@/components/LoadingState'
import { ArticleDrawer } from '@/components/ArticleDrawer'
import { InsightsPanel } from '@/components/InsightsPanel'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Warning, MagnifyingGlass, Lightbulb } from '@phosphor-icons/react'
import { searchArticles } from '@/lib/api'
import type { SearchResult, SearchInsights } from '@/lib/types'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

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
        <header className="sticky top-0 z-10 bg-background/70 backdrop-blur-xl border-b-2 border-border/50 shadow-lg shadow-primary/5">
          <div className="container mx-auto px-6 md:px-12 py-8">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                    <MagnifyingGlass size={24} weight="bold" className="text-white" />
                  </div>
                </motion.div>
                <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground tracking-tight bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                  TV2 Semantic News Explorer
                </h1>
              </div>
              <p className="text-muted-foreground text-sm md:text-base uppercase tracking-widest font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                AI-Powered Content Discovery
              </p>
            </motion.div>
            
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </header>

        <main className="flex-1 container mx-auto px-6 md:px-12 py-10">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Alert variant="destructive" className="mb-8 border-2">
                <Warning className="h-5 w-5" weight="duotone" />
                <AlertDescription className="font-medium">{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {isLoading ? (
            <LoadingState />
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <div className="space-y-5 pb-8">
                  <motion.div 
                    className="flex items-center justify-between mb-4 bg-card/50 backdrop-blur-sm p-4 rounded-xl border-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-sm text-muted-foreground">
                      Fandt <span className="font-bold text-lg text-primary">{results.length}</span> resultater
                      {currentQuery && <> for "<span className="font-semibold text-foreground">{currentQuery}</span>"</>}
                    </p>
                  </motion.div>
                  
                  {results.map((result, index) => (
                    <ResultCard 
                      key={result.id} 
                      result={result} 
                      index={index}
                      onClick={() => handleArticleClick(result)}
                    />
                  ))}
                </div>
              </div>

              {insights && (
                <div className="lg:col-span-1">
                  <div className="sticky top-40">
                    <motion.h2 
                      className="font-display text-2xl font-bold mb-5 flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Lightbulb size={28} weight="duotone" className="text-primary" />
                      AI Insights
                    </motion.h2>
                    <InsightsPanel insights={insights} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <EmptyState hasSearched={hasSearched} query={currentQuery} />
          )}
        </main>

        <footer className="border-t-2 border-border/50 py-8 bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-6 md:px-12">
            <p className="text-sm text-muted-foreground text-center font-medium">
              Prototype med fiktive data • Klar til integration med AWS Bedrock Knowledge Base
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