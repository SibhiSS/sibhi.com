
import { motion } from 'framer-motion';
import { Eye, Target, GraduationCap, Terminal, Fingerprint } from 'lucide-react';
import HolographicCard from '@/components/ui/HolographicCard';
import RevealText from '@/components/ui/RevealText';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs text-primary tracking-widest uppercase mb-2 block">
            About Us
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            <RevealText text="About the Committee" />
          </h2>
          <div className="max-w-3xl mx-auto px-4 mt-8">
            <p className="font-heading text-sm md:text-lg text-muted-foreground border-l-2 border-primary/50 pl-4 py-2 bg-primary/5 rounded-r-lg text-left">
              <span className="text-primary font-bold">NOVA-CPS</span> <span className="mx-2">→</span>
              Network for Opportunities, Vision, and Advancement in Cyber-Physical Systems
            </p>
          </div>
        </motion.div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Vision Card */}
          <HolographicCard className="p-8 h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">
                Our Vision
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              To establish a dedicated Centre for Cyber-Physical Systems that advances
              CPS learning, promotes high-quality research, and nurtures CPS-specialized
              talent through hands-on development, innovation events, seminars, and hackathons.
            </p>
          </HolographicCard>

          {/* Mission Card */}
          <HolographicCard className="p-8 h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">
                Our Mission
              </h3>
            </div>
            <ul className="text-muted-foreground space-y-4">
              {[
                'Conduct CPS-related workshops & training',
                'Build real CPS projects (IoT + AI + Security)',
                'Create research groups for innovation',
                'Participate in competitions & hackathons',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary mt-1.5">•</span>
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </HolographicCard>
        </div>
      </div>

      {/* Leadership Team */}
      <motion.div
        className="mt-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-center font-heading text-2xl md:text-3xl font-bold text-foreground mb-12">
          <RevealText text="Leadership & Faculty" />
        </h3>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Faculty Coordinator */}
          <HolographicCard className="p-6 flex flex-col items-center text-center h-full hover:border-primary/40">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h4 className="font-heading text-xl font-bold text-foreground mb-1">
              Pradeep Kumar T S
            </h4>
            <span className="text-sm text-primary font-medium tracking-wide uppercas mb-4">
              Faculty Coordinator
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Guiding the academic and technical direction of NOVA CPS with expert mentorship.
            </p>
          </HolographicCard>

          {/* Chairperson */}
          <HolographicCard className="p-6 flex flex-col items-center text-center h-full border-primary/30 hover:border-primary/60 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)]">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 text-primary relative">
              <Terminal className="w-8 h-8" />
              <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping opacity-20" />
            </div>
            <h4 className="font-heading text-xl font-bold text-foreground mb-1">
              Sibhi S
            </h4>
            <span className="text-sm text-primary font-medium tracking-wide uppercase mb-4">
              Chairperson
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Computer Science Engineering background focused on Cyber-Physical Systems, Embedded Systems, and System-level Engineering.
            </p>
            <p className="text-xs text-muted-foreground/80 italic">
              "Emphasizing technical rigor, structured execution, and collaborative growth."
            </p>
          </HolographicCard>

          {/* Co-founder */}
          <HolographicCard className="p-6 flex flex-col items-center text-center h-full hover:border-primary/40">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <Fingerprint className="w-8 h-8" />
            </div>
            <h4 className="font-heading text-xl font-bold text-foreground mb-1">
              Santhosh V
            </h4>
            <span className="text-sm text-primary font-medium tracking-wide uppercase mb-4">
              Co-Founder
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Instrumental in establishing the core foundations and strategic vision of the committee.
            </p>
          </HolographicCard>
        </div>
      </motion.div>
    </section >
  );
};

export default AboutSection;
