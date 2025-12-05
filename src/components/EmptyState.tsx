import { MagnifyingGlass, Sparkle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface EmptyStateProps {
  hasSearched: boolean
  query?: string
}

export function EmptyState({ hasSearched, query }: EmptyStateProps) {
  if (!hasSearched) {
    return null
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <div className="mb-8 text-muted-foreground/30 bg-muted/30 p-8 rounded-2xl shadow-sm">
        <MagnifyingGlass size={80} weight="duotone" />
      </div>
      
      <h2 className="font-display text-3xl font-bold text-foreground mb-4">
        Ingen resultater fundet
      </h2>
      
      <p className="text-muted-foreground text-lg max-w-xl leading-relaxed mb-8">
        Ingen artikler matchede din søgning {query && <><span className="font-bold text-primary">"{query}"</span>. </>}
        Prøv at omformulere søgningen eller brug andre søgeord.
      </p>
      
      <div className="bg-card/70 backdrop-blur-sm border border-border/70 rounded-xl p-6 max-w-lg shadow-sm">
        <p className="font-bold text-foreground mb-4 flex items-center justify-center gap-2">
          <Sparkle size={20} weight="duotone" className="text-accent" />
          Søgetips:
        </p>
        <ul className="space-y-2 text-left text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="text-primary mt-1">•</span>
            <span>Brug naturligt, samtalende sprog</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary mt-1">•</span>
            <span>Prøv bredere eller mere specifikke termer</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary mt-1">•</span>
            <span>Tjek for stavevariationer</span>
          </li>
        </ul>
      </div>
    </motion.div>
  )
}
