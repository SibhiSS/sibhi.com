import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import HolographicCard from '@/components/ui/HolographicCard';
import TerminalBadge from '@/components/ui/TerminalBadge';
import RevealText from '@/components/ui/RevealText';

const events = [
  {
    title: 'Inaugural CPS Talk',
    date: 'One-Time',
    location: 'Main Campus',
    type: 'Inauguration',
    description: 'Expert session on real-world CPS architecture and applications.',
  },
  {
    title: 'Embedded Systems Bootcamp',
    date: 'Multi-Session',
    location: 'Tech Lab',
    type: 'Workshop',
    description: 'Hands-on bootcamp on microcontrollers and real-time firmware.',
  },
  {
    title: 'Sensing & Control Workshop',
    date: 'Monthly',
    location: 'Hardware Lab',
    type: 'Workshop',
    description: 'Practical exploration of sensors, actuators, and control logic.',
  },
  {
    title: 'Robotics Buildathon',
    date: 'Weekend',
    location: 'Robotics Lab',
    type: 'Buildathon',
    description: 'Team-based buildathon for integrated robotic automation systems.',
  },
  {
    title: 'CPS Cybersecurity Workshop',
    date: 'One-Time',
    location: 'Hybrid',
    type: 'Workshop',
    description: 'Introduction to firmware vulnerabilities and system threats.',
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs text-primary tracking-widest uppercase mb-2 block">
            Events
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            <RevealText text="Events & Technical Initiatives" />
          </h2>
        </motion.div>

        {/* Events List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {events.map((event, index) => (
            <HolographicCard
              key={event.title}
              className="p-6 hover:border-primary/30"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-shrink-0">
                  <TerminalBadge status={event.date === 'Coming Soon' ? 'warning' : 'active'}>
                    {event.type.toUpperCase()}
                  </TerminalBadge>
                </div>

                <div className="flex-1">
                  <h3 className="font-heading font-bold text-foreground text-lg">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {event.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-secondary/5">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-secondary/5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </HolographicCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
