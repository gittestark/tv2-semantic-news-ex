import { MagnifyingGlass } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface EmptyStateProps {
  hasSearched: boolean
  query?: string
}

export function EmptyState({ hasSearched, query }: EmptyStateProps) {
  if (!hasSearched) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center py-20 px-6 text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-6 text-primary/40"
        >
          <MagnifyingGlass size={64} weight="duotone" />
        </motion.div>
        
        <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
          Semantic News Explorer
        </h2>
        
        <p className="text-muted-foreground max-w-md leading-relaxed">
          Use natural language to search through news content. Ask questions or describe topics you're interested in, and discover relevant articles through AI-powered semantic search.
        </p>
        
        <div className="mt-8 grid gap-2 text-sm text-muted-foreground max-w-lg">
          <p className="font-medium text-foreground">Try searching for:</p>
          <ul className="space-y-1 text-left">
            <li>• "What are the latest climate policy developments?"</li>
            <li>• "renewable energy adoption trends"</li>
            <li>• "electric vehicle infrastructure projects"</li>
          </ul>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="mb-6 text-muted-foreground/40">
        <MagnifyingGlass size={64} weight="duotone" />
      </div>
      
      <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
        No results found
      </h2>
      
      <p className="text-muted-foreground max-w-md leading-relaxed">
        No articles matched your query <span className="font-medium text-foreground">"{query}"</span>. 
        Try rephrasing your search or using different keywords.
      </p>
      
      <div className="mt-6 text-sm text-muted-foreground max-w-md">
        <p className="font-medium text-foreground mb-2">Search tips:</p>
        <ul className="space-y-1 text-left">
          <li>• Use natural, conversational language</li>
          <li>• Try broader or more specific terms</li>
          <li>• Check for spelling variations</li>
        </ul>
      </div>
    </motion.div>
  )
}
