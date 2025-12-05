import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { motion } from 'framer-motion'

export function LoadingState() {
  return (
    <div className="space-y-5">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
        >
          <Card className="p-8 bg-card/60 backdrop-blur-sm">
            <div className="flex items-start gap-5">
              <Skeleton className="w-7 h-7 mt-1.5 rounded-full shrink-0" />
              
              <div className="flex-1 space-y-5">
                <div className="flex items-start justify-between gap-6">
                  <Skeleton className="h-7 flex-1 max-w-lg rounded-lg" />
                  <Skeleton className="h-8 w-20 rounded-full shrink-0" />
                </div>
                
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-4 w-4/5 rounded-lg" />
                </div>
                
                <div className="flex gap-4 flex-wrap">
                  <Skeleton className="h-5 w-28 rounded-lg" />
                  <Skeleton className="h-5 w-36 rounded-lg" />
                  <Skeleton className="h-5 w-24 rounded-lg" />
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-28 rounded-full" />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
