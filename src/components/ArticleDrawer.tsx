import { SearchResult } from '@/lib/types'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Calendar, User, Tag, Folder } from '@phosphor-icons/react'
import { Separator } from '@/components/ui/separator'

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
      <SheetContent className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl leading-tight pr-8">
            {article.title}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6 pr-4">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar size={16} />
                {formatDate(article.publishedDate)}
              </span>
              
              <span className="flex items-center gap-1.5">
                <User size={16} />
                {article.byline}
              </span>
              
              <Badge variant="outline" className="text-xs uppercase">
                <Folder size={14} className="mr-1" />
                {article.category}
              </Badge>
              
              <Badge className="bg-accent text-accent-foreground">
                Relevans: {Math.round(article.relevanceScore * 100)}%
              </Badge>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg border border-border">
              <p className="text-base leading-relaxed text-foreground/90 font-medium">
                {article.excerpt}
              </p>
            </div>

            <Separator />

            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-foreground/80 leading-relaxed">
                {article.full_text}
              </div>
            </div>

            {article.topics && article.topics.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Tag size={16} />
                    Emner
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {article.topics.map((topic) => (
                      <Badge 
                        key={topic} 
                        variant="secondary"
                        className="text-xs"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            {article.highlightedSources && article.highlightedSources.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <User size={16} />
                    Kilder i artiklen
                  </h3>
                  <ul className="space-y-1">
                    {article.highlightedSources.map((source, idx) => (
                      <li 
                        key={idx}
                        className="text-sm text-foreground/70 pl-4 border-l-2 border-primary/30"
                      >
                        {source}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
