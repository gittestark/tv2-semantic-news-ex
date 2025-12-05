import { useState } from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading: boolean
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Stil et spørgsmål eller søg efter nyheder..."
            className="w-full px-6 py-4 text-base h-auto focus-visible:ring-primary"
            disabled={isLoading}
            maxLength={500}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 h-auto transition-transform hover:scale-102"
        >
          <MagnifyingGlass className="mr-2" />
          Søg
        </Button>
      </div>
    </form>
  )
}
