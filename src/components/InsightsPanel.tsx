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
  Clock
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <div className="flex items-start gap-3 mb-4">
          <Lightbulb size={24} weight="duotone" className="text-primary shrink-0 mt-1" />
          <div>
            <h3 className="font-display font-semibold text-lg mb-2">
              AI-assistent opsummering
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {insights.coverageSummary}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <MagnifyingGlass size={20} weight="duotone" className="text-primary" />
          <h3 className="font-semibold">Tidligere vinkler</h3>
        </div>
        <ul className="space-y-2">
          {insights.previousAngles.map((angle, idx) => (
            <li 
              key={idx}
              className="text-sm text-foreground/80 pl-4 border-l-2 border-primary/30 py-1"
            >
              {angle}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-6 border-accent/40">
        <div className="flex items-center gap-2 mb-4">
          <Target size={20} weight="duotone" className="text-accent" />
          <h3 className="font-semibold">Mulige blinde vinkler</h3>
        </div>
        <ul className="space-y-2">
          {insights.blindSpots.map((spot, idx) => (
            <li 
              key={idx}
              className="text-sm text-foreground/80 pl-4 border-l-2 border-accent/50 py-1"
            >
              {spot}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb size={20} weight="duotone" className="text-primary" />
          <h3 className="font-semibold">Foreslåede nye vinkler</h3>
        </div>
        <ul className="space-y-2">
          {insights.suggestedNewAngles.map((angle, idx) => (
            <li 
              key={idx}
              className="text-sm text-foreground/80 pl-4 border-l-2 border-primary/30 py-1"
            >
              {angle}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users size={20} weight="duotone" className="text-primary" />
          <h3 className="font-semibold">Brugte kilder</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {insights.usedSources.length > 0 ? (
            insights.usedSources.map((source, idx) => (
              <Badge key={idx} variant="secondary">
                {source}
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Ingen kilder identificeret</p>
          )}
        </div>

        <Separator className="my-4" />

        <div className="flex items-center gap-2 mb-3">
          <Users size={18} weight="duotone" className="text-accent" />
          <h4 className="font-semibold text-sm">Mulige opfølgningskilder</h4>
        </div>
        <ul className="space-y-1">
          {insights.potentialFollowUpSources.map((source, idx) => (
            <li 
              key={idx}
              className="text-sm text-foreground/70"
            >
              • {source}
            </li>
          ))}
        </ul>
      </Card>

      {insights.timeline && insights.timeline.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={20} weight="duotone" className="text-primary" />
            <h3 className="font-semibold">Tidslinje for dækning</h3>
          </div>
          <div className="space-y-3">
            {insights.timeline.slice(0, 10).map((event, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="text-xs text-muted-foreground shrink-0 w-20">
                  {formatDate(event.date)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground/80">{event.title}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {event.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {insights.contradictions && insights.contradictions.length > 0 && (
        <Card className="p-6 border-destructive/40">
          <div className="flex items-center gap-2 mb-4">
            <Warning size={20} weight="duotone" className="text-destructive" />
            <h3 className="font-semibold">Modsigelser at være opmærksom på</h3>
          </div>
          <ul className="space-y-2">
            {insights.contradictions.map((contradiction, idx) => (
              <li 
                key={idx}
                className="text-sm text-foreground/80 pl-4 border-l-2 border-destructive/30 py-1"
              >
                {contradiction}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </motion.div>
  )
}
