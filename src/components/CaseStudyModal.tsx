import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type CaseStudy = {
  problem: string;
  solution: string;
  techStack: string[];
  whatIBuilt: string[];
  whatILearned: string[];
};

export type ProjectCaseStudy = {
  title: string;
  caseStudy: CaseStudy;
};

type CaseStudyModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: ProjectCaseStudy | null;
};

const sectionTitleClass = 'text-sm font-semibold uppercase tracking-wide text-muted-foreground';

const animatedSectionClass = 'space-y-2 opacity-0 animate-fade-in-up';

const getAnimationDelayStyle = (index: number) => ({ animationDelay: `${index * 0.08}s` });

const CaseStudyModal = ({ open, onOpenChange, project }: CaseStudyModalProps) => {
  if (!project) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{project.title} Case Study</DialogTitle>
          <DialogDescription>
            A deeper look at the project context, implementation, and key takeaways.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <section className={animatedSectionClass} style={getAnimationDelayStyle(0)}>
            <h4 className={sectionTitleClass}>Problem</h4>
            <p className="text-sm leading-relaxed text-foreground/90">{project.caseStudy.problem}</p>
          </section>

          <section className={animatedSectionClass} style={getAnimationDelayStyle(1)}>
            <h4 className={sectionTitleClass}>Solution</h4>
            <p className="text-sm leading-relaxed text-foreground/90">{project.caseStudy.solution}</p>
          </section>

          <section className={animatedSectionClass} style={getAnimationDelayStyle(2)}>
            <h4 className={sectionTitleClass}>Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.caseStudy.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 rounded text-xs bg-secondary text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section className={animatedSectionClass} style={getAnimationDelayStyle(3)}>
            <h4 className={sectionTitleClass}>What I built</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm leading-relaxed text-foreground/90">
              {project.caseStudy.whatIBuilt.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className={animatedSectionClass} style={getAnimationDelayStyle(4)}>
            <h4 className={sectionTitleClass}>What I learned</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm leading-relaxed text-foreground/90">
              {project.caseStudy.whatILearned.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyModal;
