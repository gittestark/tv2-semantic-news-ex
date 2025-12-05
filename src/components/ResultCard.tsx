import { SearchResult } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Article, Calendar, ChartBar } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface ResultCardProps {
  result: SearchResult
  index: number
}

export function ResultCard({ result, index }: ResultCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getRelevanceBadgeVariant = (score: number) => {
    if (score >= 0.85) return 'default'
    if (score >= 0.70) return 'secondary'
    return 'outline'
  }

  const getRelevanceBadgeClass = (score: number) => {
    if (score >= 0.85) return 'bg-accent text-accent-foreground hover:bg-accent/90'
    if (score >= 0.70) return 'bg-primary text-primary-foreground hover:bg-primary/90'
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
      <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30 cursor-pointer group">
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
              {result.content}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="font-medium text-primary">
                {result.source}
              </span>
              
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {formatDate(result.publishedDate)}
              </span>
              
              {result.metadata?.author && (
                <span>
                  by {result.metadata.author}
                </span>
              )}
              
              {result.metadata?.category && (
                <Badge variant="outline" className="text-xs">
                  {result.metadata.category}
                </Badge>
              )}
            </div>
            
            {result.metadata?.tags && result.metadata.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {result.metadata.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary"
                    className="text-xs font-normal"
                  >
                    {tag}
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
