import { useState } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { ResultCard } from '@/components/ResultCard'
import { EmptyState } from '@/components/EmptyState'
import { LoadingState } from '@/components/LoadingState'
import { ArticleDrawer } from '@/components/ArticleDrawer'
import { InsightsPanel } from '@/components/InsightsPanel'
import { HelpDialog } from '@/components/HelpDialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Warning, MagnifyingGlass, Lightbulb, ClockCounterClockwise } from '@phosphor-icons/react'
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

  const exampleScenarios = [
    {
      title: "Udvikling over tid",
      query: "Hvad har vi dækket om unges psykiske mistrivsel?",
      icon: "📊",
      description: "Find tidligere vinkler og spor udviklingen"
    },
    {
      title: "Politisk kontekst",
      query: "Klimapolitik og Danmarks EU-forpligtelser",
      icon: "🏛️",
      description: "Kortlæg debat og beslutningsforløb"
    },
    {
      title: "Tværgående tema",
      query: "Cyberangreb mod danske virksomheder og myndigheder",
      icon: "🔒",
      description: "Identificer mønstre og gennemgående kilder"
    },
    {
      title: "Breaking follow-up",
      query: "Infrastrukturproblemer med elbiler i Danmark",
      icon: "⚡",
      description: "Tjek hvad vi allerede ved om emnet"
    }
  ]

  const handleExampleClick = (query: string) => {
    handleSearch(query)
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl border-b border-border shadow-sm">
          <div className="container mx-auto px-6 md:px-12 py-8">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, -2, 0]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center shadow-md">
                        <ClockCounterClockwise size={26} weight="bold" className="text-white" />
                      </div>
                    </motion.div>
                    <div>
                      <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
                        TV 2 Arkivsøgning
                      </h1>
                      <p className="text-muted-foreground text-sm md:text-base mt-1.5 font-medium">
                        Find tidligere dækning, undgå dobbeltarbejde og identificer nye vinkler
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 pt-1">
                  <HelpDialog />
                </div>
              </div>
            </motion.div>
            
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />

            {!hasSearched && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-10 max-w-4xl mx-auto"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Lightbulb size={20} weight="duotone" className="text-primary" />
                  <p className="font-semibold text-foreground text-sm uppercase tracking-wide">Prøv at søge efter:</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exampleScenarios.map((scenario, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      onClick={() => handleExampleClick(scenario.query)}
                      className="group bg-card border border-border hover:border-primary/60 hover:shadow-lg hover:shadow-primary/5 rounded-lg p-6 text-left transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0">{scenario.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground mb-1.5 text-sm group-hover:text-primary transition-colors">
                            {scenario.title}
                          </p>
                          <p className="text-muted-foreground text-xs mb-2.5 line-clamp-1">
                            {scenario.description}
                          </p>
                          <p className="text-foreground/75 text-sm font-medium italic line-clamp-2 group-hover:text-primary transition-colors">
                            "{scenario.query}"
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </header>

        <main className="flex-1 container mx-auto px-6 md:px-12 py-12">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Alert variant="destructive" className="mb-8 border shadow-sm">
                <Warning className="h-5 w-5" weight="duotone" />
                <AlertDescription className="font-medium">{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {isLoading ? (
            <LoadingState />
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-5 pb-8">
                  <motion.div 
                    className="flex items-center justify-between mb-6 bg-card p-5 rounded-lg border border-border shadow-sm"
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
                  <div className="sticky top-32">
                    <motion.h2 
                      className="font-display text-2xl font-bold mb-6 flex items-center gap-2"
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

        <footer className="border-t border-border py-10 bg-muted/30">
          <div className="container mx-auto px-6 md:px-12">
            <p className="text-sm text-muted-foreground text-center font-medium">
              UX-prototype med fiktive data • Demonstrerer intelligent arkivsøgning til journalister
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