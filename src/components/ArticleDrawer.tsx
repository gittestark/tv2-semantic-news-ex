import { SearchResult } from '@/lib/types'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Calendar, User, Tag, Folder, TrendUp } from '@phosphor-icons/react'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'

interface ArticleDrawerProps {
  article: SearchResult | null
  open: boolean
  onClose: () => void
}

export function ArticleDrawer({ article, open, onClose }: ArticleDrawerProps) {
  if (!article) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('da-DK', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-3xl bg-background/95 backdrop-blur-xl border-l border-border/70">
        <SheetHeader>
          <SheetTitle className="font-display text-3xl font-bold leading-tight pr-8 text-foreground">
            {article.title}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-140px)] mt-8 pr-4">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap gap-4 text-sm">
              <motion.span 
                className="flex items-center gap-2 text-muted-foreground font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <Calendar size={18} weight="duotone" />
                {formatDate(article.publishedDate)}
              </motion.span>
              
              <motion.span 
                className="flex items-center gap-2 text-muted-foreground font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <User size={18} weight="duotone" />
                {article.byline}
              </motion.span>
              
              <Badge variant="outline" className="text-xs uppercase font-bold tracking-wide border">
                <Folder size={16} className="mr-1.5" weight="duotone" />
                {article.category}
              </Badge>
              
              <Badge className="bg-gradient-to-r from-primary to-accent text-white shadow-md">
                <TrendUp size={16} className="mr-1.5" weight="bold" />
                Relevans: {Math.round(article.relevanceScore * 100)}%
              </Badge>
            </div>

            <div className="bg-gradient-to-br from-primary/8 to-accent/8 p-6 rounded-xl border border-primary/20 shadow-sm">
              <p className="text-base md:text-lg leading-relaxed text-foreground font-semibold">
                {article.excerpt}
              </p>
            </div>

            <Separator className="my-8" />

            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-foreground/85 leading-relaxed text-base">
                {article.full_text}
              </div>
            </div>

            {article.topics && article.topics.length > 0 && (
              <>
                <Separator className="my-8" />
                <div>
                  <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                    <Tag size={20} weight="duotone" className="text-primary" />
                    Emner
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {article.topics.map((topic, idx) => (
                      <motion.div
                        key={topic}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Badge 
                          variant="secondary"
                          className="text-sm py-1.5 px-3 hover:bg-primary/20 transition-colors"
                        >
                          {topic}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {article.highlightedSources && article.highlightedSources.length > 0 && (
              <>
                <Separator className="my-8" />
                <div>
                  <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                    <User size={20} weight="duotone" className="text-primary" />
                    Kilder i artiklen
                  </h3>
                  <ul className="space-y-3">
                    {article.highlightedSources.map((source, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="text-sm text-foreground/75 pl-5 border-l-3 border-primary/40 py-2 hover:border-primary hover:bg-primary/5 transition-all duration-200 rounded-r font-medium"
                      >
                        {source}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </motion.div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
