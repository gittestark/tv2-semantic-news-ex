import { SearchInsights } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Lightbulb, 
  MagnifyingGlass, 
  Target, 
  Users, 
  Warning,
  Clock,
  Sparkle
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface InsightsPanelProps {
  insights: SearchInsights
}

export function InsightsPanel({ insights }: InsightsPanelProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('da-DK', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-5"
    >
      <Card className="p-7 bg-muted/30 border-2 border-primary/30 shadow-md relative overflow-hidden rounded-lg">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-start gap-3 mb-5">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkle size={28} weight="duotone" className="text-primary shrink-0 mt-1" />
            </motion.div>
            <div>
              <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                AI-assistent opsummering
                <Badge variant="secondary" className="text-xs">Powered by Claude</Badge>
              </h3>
              <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                {insights.coverageSummary}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-2 border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 rounded-lg">
        <div className="flex items-center gap-2.5 mb-5">
          <MagnifyingGlass size={22} weight="duotone" className="text-primary" />
          <h3 className="font-bold text-base">Tidligere vinkler</h3>
        </div>
        <ul className="space-y-3">
          {insights.previousAngles.map((angle, idx) => (
            <motion.li 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-sm text-foreground/80 pl-4 border-l-2 border-primary/40 py-2.5 hover:border-primary hover:bg-primary/5 transition-all duration-200 rounded-r"
            >
              {angle}
            </motion.li>
          ))}
        </ul>
      </Card>

      <Card className="p-6 border-2 border-primary/40 hover:border-primary/60 hover:shadow-md transition-all duration-300 rounded-lg">
        <div className="flex items-center gap-2.5 mb-5">
          <Target size={22} weight="duotone" className="text-primary" />
          <h3 className="font-bold text-base">Mulige blinde vinkler</h3>
        </div>
        <ul className="space-y-3">
          {insights.blindSpots.map((spot, idx) => (
            <motion.li 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-sm text-foreground/80 pl-4 border-l-2 border-primary/60 py-2.5 hover:border-primary hover:bg-primary/5 transition-all duration-200 rounded-r"
            >
              {spot}
            </motion.li>
          ))}
        </ul>
      </Card>

      <Card className="p-6 border-2 border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 bg-muted/20 rounded-lg">
        <div className="flex items-center gap-2.5 mb-5">
          <Lightbulb size={22} weight="duotone" className="text-primary" />
          <h3 className="font-bold text-base">Foreslåede nye vinkler</h3>
        </div>
        <ul className="space-y-3">
          {insights.suggestedNewAngles.map((angle, idx) => (
            <motion.li 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-sm text-foreground/80 pl-4 border-l-2 border-primary/40 py-2.5 hover:border-primary hover:bg-primary/5 transition-all duration-200 rounded-r font-medium"
            >
              {angle}
            </motion.li>
          ))}
        </ul>
      </Card>

      <Card className="p-6 border-2 border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 rounded-lg">
        <div className="flex items-center gap-2.5 mb-5">
          <Users size={22} weight="duotone" className="text-primary" />
          <h3 className="font-bold text-base">Brugte kilder</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {insights.usedSources.length > 0 ? (
            insights.usedSources.map((source, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Badge variant="secondary" className="hover:bg-primary/10 transition-colors">
                  {source}
                </Badge>
              </motion.div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Ingen kilder identificeret</p>
          )}
        </div>

        <Separator className="my-6" />

        <div className="flex items-center gap-2.5 mb-4">
          <Users size={20} weight="duotone" className="text-primary" />
          <h4 className="font-bold text-sm">Mulige opfølgningskilder</h4>
        </div>
        <ul className="space-y-2">
          {insights.potentialFollowUpSources.map((source, idx) => (
            <motion.li 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="text-sm text-foreground/75 hover:text-foreground transition-colors"
            >
              • {source}
            </motion.li>
          ))}
        </ul>
      </Card>

      {insights.timeline && insights.timeline.length > 0 && (
        <Card className="p-6 border-2 border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 rounded-lg">
          <div className="flex items-center gap-2.5 mb-6">
            <Clock size={22} weight="duotone" className="text-primary" />
            <h3 className="font-bold text-base">Tidslinje for dækning</h3>
          </div>
          <div className="space-y-4">
            {insights.timeline.slice(0, 10).map((event, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="flex gap-4 items-start hover:bg-primary/5 p-3.5 rounded-md transition-colors"
              >
                <div className="text-xs text-muted-foreground shrink-0 w-24 font-semibold">
                  {formatDate(event.date)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground/85 font-medium leading-relaxed">{event.title}</p>
                  <Badge variant="outline" className="text-xs mt-2.5">
                    {event.category}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      {insights.contradictions && insights.contradictions.length > 0 && (
        <Card className="p-6 border-2 border-destructive/40 hover:border-destructive/60 hover:shadow-md transition-all duration-300 bg-destructive/5 rounded-lg">
          <div className="flex items-center gap-2.5 mb-5">
            <Warning size={22} weight="duotone" className="text-destructive" />
            <h3 className="font-bold text-base">Modsigelser at være opmærksom på</h3>
          </div>
          <ul className="space-y-3">
            {insights.contradictions.map((contradiction, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-sm text-foreground/80 pl-4 border-l-2 border-destructive/50 py-2.5 hover:border-destructive hover:bg-destructive/10 transition-all duration-200 rounded-r font-medium"
              >
                {contradiction}
              </motion.li>
            ))}
          </ul>
        </Card>
      )}
    </motion.div>
  )
}
