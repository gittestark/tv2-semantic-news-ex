import { useState } from 'react'
import { MagnifyingGlass, Sparkle } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading: boolean
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="flex gap-3 items-center">
        <motion.div 
          className="relative flex-1"
          animate={{ scale: isFocused ? 1.003 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10">
            <MagnifyingGlass size={20} weight="duotone" />
          </div>
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Hvad vil du undersøge i tidligere dækning? F.eks. 'Hvad har vi skrevet om...'"
            className="w-full pl-14 pr-6 py-7 text-base h-auto shadow-md border-2 border-border focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all duration-200 bg-card rounded-lg font-normal"
            disabled={isLoading}
            maxLength={500}
          />
          <AnimatePresence>
            {query.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium"
              >
                {query.length}/500
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <Button
          type="submit"
          disabled={isLoading || !query.trim()}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-7 h-auto shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 font-semibold rounded-lg focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkle className="mr-2" weight="duotone" />
              </motion.div>
              Søger...
            </>
          ) : (
            <>
              <MagnifyingGlass className="mr-2" weight="duotone" />
              Søg
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
