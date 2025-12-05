import { SearchResult } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Article, Calendar, ChartBar } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface ResultCardProps {
  result: SearchResult
  index: number
  onClick?: () => void
}

export function ResultCard({ result, index, onClick }: ResultCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('da-DK', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getRelevanceBadgeVariant = (score: number) => {
    if (score >= 0.5) return 'default'
    if (score >= 0.3) return 'secondary'
    return 'outline'
  }

  const getRelevanceBadgeClass = (score: number) => {
    if (score >= 0.5) return 'bg-accent text-accent-foreground hover:bg-accent/90'
    if (score >= 0.3) return 'bg-primary text-primary-foreground hover:bg-primary/90'
    return ''
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      <Card 
        className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30 cursor-pointer group"
        onClick={onClick}
      >
        <div className="flex items-start gap-4">
          <div className="mt-1 text-primary/60 group-hover:text-primary transition-colors">
            <Article size={24} weight="duotone" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h2 className="font-display font-semibold text-xl leading-tight text-foreground group-hover:text-primary transition-colors">
                {result.title}
              </h2>
              <Badge 
                variant={getRelevanceBadgeVariant(result.relevanceScore)}
                className={`shrink-0 ${getRelevanceBadgeClass(result.relevanceScore)}`}
              >
                <ChartBar size={14} className="mr-1" />
                {Math.round(result.relevanceScore * 100)}%
              </Badge>
            </div>
            
            <p className="text-foreground/70 mb-4 line-clamp-3 leading-relaxed">
              {result.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {formatDate(result.publishedDate)}
              </span>
              
              <span className="font-medium">
                {result.byline}
              </span>
              
              <Badge variant="outline" className="text-xs uppercase">
                {result.category}
              </Badge>
            </div>
            
            {result.topics && result.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {result.topics.slice(0, 5).map((topic) => (
                  <Badge 
                    key={topic} 
                    variant="secondary"
                    className="text-xs font-normal"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
