import { motion } from 'framer-motion';
import {
  Wifi,
  Cpu,
  Bot,
  Brain,
  Shield,
  Building2,
  LucideIcon
} from 'lucide-react';
import HolographicCard from '@/components/ui/HolographicCard';
import RevealText from '@/components/ui/RevealText';

interface Domain {
  title: string;
  description: string;
  icon: LucideIcon;
}

const domains: Domain[] = [
  {
    title: 'Internet of Things',
    description: 'Connected devices enabling seamless communication between physical and digital worlds.',
    icon: Wifi,
  },
  {
    title: 'Embedded Systems',
    description: 'Specialized computing systems for dedicated functions within larger systems.',
    icon: Cpu,
  },
  {
    title: 'Robotics & Automation',
    description: 'Building robots and automated systems for various applications.',
    icon: Bot,
  },
  {
    title: 'AI & Edge Computing',
    description: 'Machine learning on edge devices for real-time intelligent decisions.',
    icon: Brain,
  },
  {
    title: 'Cybersecurity for CPS',
    description: 'Protecting cyber-physical systems through advanced security protocols.',
    icon: Shield,
  },
  {
    title: 'Smart Infrastructure',
    description: 'Intelligent buildings and cities powered by integrated CPS solutions.',
    icon: Building2,
  },
];

const DomainsSection = () => {
  return (
    <section id="domains" className="py-24">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs text-primary tracking-widest uppercase mb-2 block">
            Explore
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            <RevealText text="Our Domains" />
          </h2>
        </motion.div>

        {/* Domain Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {domains.map((domain, index) => (
            <HolographicCard
              key={domain.title}
              className="p-6 h-full flex flex-col items-start hover:border-primary/30 transition-colors"
            >
              <div className="p-3 rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <domain.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-2 text-xl">
                {domain.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {domain.description}
              </p>
            </HolographicCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DomainsSection;
