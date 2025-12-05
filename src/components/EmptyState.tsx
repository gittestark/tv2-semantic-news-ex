import { MagnifyingGlass, Sparkle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface EmptyStateProps {
  hasSearched: boolean
  query?: string
}

export function EmptyState({ hasSearched, query }: EmptyStateProps) {
  if (!hasSearched) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center py-24 px-6 text-center"
      >
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl rounded-full" />
          <div className="relative text-primary bg-gradient-to-br from-primary/10 to-accent/10 p-6 rounded-2xl">
            <MagnifyingGlass size={72} weight="duotone" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Semantisk Nyhedssøgning
          </h2>
          
          <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed mb-10">
            Brug naturligt sprog til at søge i nyhedsarkivet. Stil spørgsmål eller beskriv emner, og find relevante artikler gennem AI-drevet semantisk søgning.
          </p>
        </motion.div>
        
        <motion.div 
          className="bg-card/60 backdrop-blur-sm border-2 border-primary/20 rounded-2xl p-8 max-w-2xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkle size={24} weight="duotone" className="text-accent" />
            <p className="font-bold text-foreground text-lg">Prøv at søge efter:</p>
          </div>
          <ul className="space-y-3 text-left">
            {[
              "Hvad har vi dækket om unges psykiske mistrivsel?",
              "klimapolitik og EU",
              "cyberangreb på danske virksomheder",
              "elbiler og infrastruktur"
            ].map((example, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="text-foreground/80 font-medium hover:text-primary transition-colors cursor-pointer hover:translate-x-2 duration-200 flex items-center gap-3"
              >
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                {example}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <div className="mb-8 text-muted-foreground/30 bg-muted/30 p-8 rounded-2xl">
        <MagnifyingGlass size={80} weight="duotone" />
      </div>
      
      <h2 className="font-display text-3xl font-bold text-foreground mb-4">
        Ingen resultater fundet
      </h2>
      
      <p className="text-muted-foreground text-lg max-w-xl leading-relaxed mb-8">
        Ingen artikler matchede din søgning <span className="font-bold text-primary">"{query}"</span>. 
        Prøv at omformulere søgningen eller brug andre søgeord.
      </p>
      
      <div className="bg-card/60 backdrop-blur-sm border-2 rounded-xl p-6 max-w-lg">
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
