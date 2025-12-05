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
          Semantisk Nyhedssøgning
        </h2>
        
        <p className="text-muted-foreground max-w-md leading-relaxed">
          Brug naturligt sprog til at søge i nyhedsarkivet. Stil spørgsmål eller beskriv emner, og find relevante artikler gennem AI-drevet semantisk søgning.
        </p>
        
        <div className="mt-8 grid gap-2 text-sm text-muted-foreground max-w-lg">
          <p className="font-medium text-foreground">Prøv at søge efter:</p>
          <ul className="space-y-1 text-left">
            <li>• "Hvad har vi dækket om unges psykiske mistrivsel?"</li>
            <li>• "klimapolitik og EU"</li>
            <li>• "cyberangreb på danske virksomheder"</li>
            <li>• "elbiler og infrastruktur"</li>
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
        Ingen resultater fundet
      </h2>
      
      <p className="text-muted-foreground max-w-md leading-relaxed">
        Ingen artikler matchede din søgning <span className="font-medium text-foreground">"{query}"</span>. 
        Prøv at omformulere søgningen eller brug andre søgeord.
      </p>
      
      <div className="mt-6 text-sm text-muted-foreground max-w-md">
        <p className="font-medium text-foreground mb-2">Søgetips:</p>
        <ul className="space-y-1 text-left">
          <li>• Brug naturligt, samtalende sprog</li>
          <li>• Prøv bredere eller mere specifikke termer</li>
          <li>• Tjek for stavevariationer</li>
        </ul>
      </div>
    </motion.div>
  )
}
