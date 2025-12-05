import { SearchResult } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Article, Calendar, ChartBar, TrendUp } from '@phosphor-icons/react'
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

  const getRelevanceColor = (score: number) => {
    if (score >= 0.7) return 'from-accent to-accent/80'
    if (score >= 0.5) return 'from-primary to-primary/80'
    return 'from-muted-foreground/60 to-muted-foreground/40'
  }

  const getRelevanceLabel = (score: number) => {
    if (score >= 0.7) return 'Meget relevant'
    if (score >= 0.5) return 'Relevant'
    return 'Mulig match'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ scale: 1.01, y: -3 }}
    >
      <Card 
        className="p-7 hover:shadow-xl hover:shadow-primary/8 transition-all duration-300 hover:border-primary/40 cursor-pointer group bg-card/70 backdrop-blur-sm relative overflow-hidden border border-border/70 rounded-xl"
        onClick={onClick}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
             style={{ backgroundImage: `linear-gradient(to right, var(--primary), var(--accent))` }}
        />
        
        <div className="flex items-start gap-5">
          <motion.div 
            className="mt-1.5 text-primary/40 group-hover:text-primary transition-all duration-300"
            whileHover={{ scale: 1.08, rotate: 3 }}
          >
            <Article size={28} weight="duotone" />
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-6 mb-4">
              <h2 className="font-display font-bold text-xl md:text-2xl leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
                {result.title}
              </h2>
              
              <motion.div 
                className={`shrink-0 px-3 py-1.5 rounded-full bg-gradient-to-br ${getRelevanceColor(result.relevanceScore)} shadow-md flex items-center gap-1.5`}
                whileHover={{ scale: 1.05 }}
              >
                <TrendUp size={14} weight="bold" className="text-white" />
                <span className="text-white font-bold text-sm">
                  {Math.round(result.relevanceScore * 100)}%
                </span>
              </motion.div>
            </div>
            
            <p className="text-foreground/70 mb-5 line-clamp-3 leading-relaxed text-base">
              {result.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-2 font-medium">
                <Calendar size={16} weight="duotone" />
                {formatDate(result.publishedDate)}
              </span>
              
              <span className="font-medium text-foreground/75">
                {result.byline}
              </span>
              
              <Badge variant="outline" className="text-xs uppercase font-semibold tracking-wide border">
                {result.category}
              </Badge>
              
              <Badge variant="secondary" className="text-xs font-medium">
                {getRelevanceLabel(result.relevanceScore)}
              </Badge>
            </div>
            
            {result.topics && result.topics.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {result.topics.slice(0, 6).map((topic, idx) => (
                  <motion.div
                    key={topic}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.08 + idx * 0.05 }}
                  >
                    <Badge 
                      variant="secondary"
                      className="text-xs font-normal hover:bg-primary/10 transition-colors"
                    >
                      {topic}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
