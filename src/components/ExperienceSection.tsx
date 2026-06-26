import { Award, Calendar, ExternalLink } from 'lucide-react';

const experiences = [
  {
  role: '.NET Developer Internship',
  company: 'Digital Engine AB',
  period: '2025 Dec - 2026 April',
  description: 'Developed automation solutions using C# within a cloud-based platform. Built and orchestrated task-based workflows for data processing and system integration.',
  achievements: [
    'Implemented custom commands for data transformation and API integrations',
    'Built end-to-end automation flow from Excel to JSON to external API',
    'Designed batch processing to handle large datasets efficiently',
    'Improved data quality through validation and filtering logic'
  ],
},
  {
  role: 'Webbutvecklare .NET Student',
  company: 'Nackademin',
  period: '2024 - 2026',
  description: 'Focused on backend development with C# and .NET, including APIs, databases, and web applications.',
  achievements: [
    'Built REST APIs using ASP.NET Core',
    'Worked with SQL Server and Entity Framework',
    'Developed full-stack applications with modern web technologies'
  ],
}
];

const certificates = [
  {
    title: 'Degree Certificate',
    issuer: 'Nackademin',
    description: 'Verified digital document issued through TRUE Original.',
    verificationUrl: 'https://verify.trueoriginal.com/4EDB81E4-4649-D168-90C8-BF40A992082C/?ref=badge',
    qrCodeUrl:
      'https://cdn.truecrt.com/cdn/full/qrcode-raw-4EDB81E4-4649-D168-90C8-BF40A992082C.png?ref=qrcode&key=RV1ClB4bQL&s=0',
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Experience</span> & Certificates
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My professional journey in software development, education, and verified credentials.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          {/* Timeline */}
          <div>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />

              {experiences.map((exp, index) => (
                <div
                  key={exp.role}
                  className="relative pl-20 pb-12 last:pb-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-glow" />

                  {/* Content */}
                  <div className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-all duration-300">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="font-display text-xl font-bold">{exp.role}</h3>
                      <span className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                        {exp.company}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar size={14} />
                      {exp.period}
                    </div>

                    <p className="text-muted-foreground mb-4">{exp.description}</p>

                    <div className="space-y-2">
                      {exp.achievements.map((achievement) => (
                        <div key={achievement} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="glass-card rounded-2xl p-6 animate-fade-in-up lg:sticky lg:top-28">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Verified credential</p>
                <h3 className="font-display text-2xl font-bold">Certificates</h3>
              </div>
            </div>

            <div className="space-y-6">
              {certificates.map((certificate) => (
                <div key={certificate.title}>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h4 className="font-display text-xl font-bold">{certificate.title}</h4>
                    <span className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                      {certificate.issuer}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-5">{certificate.description}</p>

                  <a
                    href={certificate.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group block rounded-xl border border-border/70 bg-background/55 p-5 transition-all duration-300 hover:border-primary/50"
                    aria-label={`Open verified ${certificate.title}`}
                  >
                    <img
                      src={certificate.qrCodeUrl}
                      alt="TRUE Original document QR code"
                      className="mx-auto aspect-square w-full max-w-56 rounded-lg bg-white p-3 shadow-soft"
                    />
                  </a>

                  <a
                    href={certificate.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground"
                  >
                    View certificate
                    <ExternalLink size={15} />
                  </a>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
