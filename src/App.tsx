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
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-sm">
          <div className="container mx-auto px-6 md:px-12 py-7">
            <motion.div 
              className="mb-7"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  animate={{ 
                    scale: [1, 1.08, 1],
                    rotate: [0, 3, -3, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-lg shadow-primary/25">
                    <MagnifyingGlass size={26} weight="bold" className="text-white" />
                  </div>
                </motion.div>
                <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  TV 2 Semantic News Explorer
                </h1>
              </div>
              <p className="text-muted-foreground text-sm md:text-base uppercase tracking-widest font-bold flex items-center gap-2 pl-14">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-sm shadow-accent" />
                AI-Powered Content Discovery
              </p>
            </motion.div>
            
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />

            {!hasSearched && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-8 max-w-4xl mx-auto"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb size={20} weight="duotone" className="text-accent" />
                  <p className="font-bold text-foreground text-sm uppercase tracking-wide">Prøv at søge efter:</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exampleScenarios.map((scenario, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      onClick={() => handleExampleClick(scenario.query)}
                      className="group bg-card/70 backdrop-blur-sm border border-border/60 hover:border-primary/50 rounded-xl p-6 text-left transition-all duration-300 hover:shadow-xl hover:shadow-primary/8 hover:-translate-y-1 active:translate-y-0"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0">{scenario.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-foreground mb-1 text-sm group-hover:text-primary transition-colors">
                            {scenario.title}
                          </p>
                          <p className="text-muted-foreground text-xs mb-2 line-clamp-1">
                            {scenario.description}
                          </p>
                          <p className="text-foreground/70 text-sm font-medium italic line-clamp-2 group-hover:text-primary/80 transition-colors">
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

        <main className="flex-1 container mx-auto px-6 md:px-12 py-10">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Alert variant="destructive" className="mb-8 border">
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
                    className="flex items-center justify-between mb-4 bg-card/60 backdrop-blur-sm p-5 rounded-xl border border-border/60 shadow-sm"
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

        <footer className="border-t border-border/60 py-8 bg-card/40 backdrop-blur-sm">
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