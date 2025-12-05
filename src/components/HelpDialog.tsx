import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Question, MagnifyingGlass, Lightbulb, Clock, Users, ChartBar } from '@phosphor-icons/react'

export function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="gap-2 border-border/60 hover:border-primary/60 hover:bg-primary/5 transition-all"
        >
          <Question size={18} weight="duotone" />
          Hjælp
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display flex items-center gap-2">
            <Question size={28} weight="duotone" className="text-primary" />
            Sådan bruger du Arkivsøgning
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            Værktøjet hjælper dig med at finde og analysere tidligere TV 2 nyhedsdækning hurtigt og præcist.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <MagnifyingGlass size={20} weight="duotone" className="text-primary" />
              Hvad kan værktøjet?
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground ml-7">
              <li className="leading-relaxed">
                <strong className="text-foreground">Find tidligere dækning:</strong> Søg i nyhedsarkivet med naturligt sprog - stil spørgsmål som "Hvad har vi skrevet om el-billers ladeproblemer?"
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Undgå dobbeltarbejde:</strong> Tjek om vi allerede har dækket en vinkel, før du går i gang
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Find nye vinkler:</strong> Se hvilke aspekter af et emne vi ikke har belyst endnu
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Spor udvikling:</strong> Følg hvordan en historie har udviklet sig over tid
              </li>
              <li className="leading-relaxed">
                <strong className="text-foreground">Identificer kilder:</strong> Se hvilke eksperter og kilder vi tidligere har brugt til lignende historier
              </li>
            </ul>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Lightbulb size={20} weight="duotone" className="text-primary" />
              Hvornår skal du bruge det?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                <div className="font-semibold text-foreground mb-1.5 flex items-center gap-2">
                  <Clock size={16} weight="duotone" />
                  Breaking news follow-up
                </div>
                <p className="text-muted-foreground text-xs">
                  Tjek hvad vi allerede ved om emnet, før du går i luften med opdateringer
                </p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                <div className="font-semibold text-foreground mb-1.5 flex items-center gap-2">
                  <ChartBar size={16} weight="duotone" />
                  Research til baggrundshistorie
                </div>
                <p className="text-muted-foreground text-xs">
                  Kortlæg tidligere dækning for at finde tråde og mønstre
                </p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                <div className="font-semibold text-foreground mb-1.5 flex items-center gap-2">
                  <Users size={16} weight="duotone" />
                  Kilde- og vinkelinspiration
                </div>
                <p className="text-muted-foreground text-xs">
                  Identificer relevante eksperter og kilder fra lignende historier
                </p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                <div className="font-semibold text-foreground mb-1.5 flex items-center gap-2">
                  <Lightbulb size={16} weight="duotone" />
                  Identificer blinde vinkler
                </div>
                <p className="text-muted-foreground text-xs">
                  Find aspekter af et emne som vi ikke har belyst tilstrækkeligt
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-3">
              Søgetips
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground ml-4">
              <li className="leading-relaxed">
                ✓ <strong className="text-foreground">Brug naturligt sprog:</strong> "Hvad har vi dækket om klimaaftaler?" fungerer bedre end enkelte søgeord
              </li>
              <li className="leading-relaxed">
                ✓ <strong className="text-foreground">Stil spørgsmål:</strong> Tænk på, hvad du gerne vil vide, ikke kun emnet
              </li>
              <li className="leading-relaxed">
                ✓ <strong className="text-foreground">Vær specifik:</strong> "Cyberangreb mod danske virksomheder" giver bedre resultater end bare "cyberangreb"
              </li>
              <li className="leading-relaxed">
                ✓ <strong className="text-foreground">Prøv flere formuleringer:</strong> Hvis du ikke finder det du søger, omformulér søgningen
              </li>
            </ul>
          </div>

          <div className="border-t pt-6 bg-primary/5 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
            <p className="text-xs text-muted-foreground italic">
              Dette er en UX-prototype med fiktive data til test af funktionalitet og workflows.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
