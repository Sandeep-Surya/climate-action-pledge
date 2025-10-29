import { Card } from '@/components/ui/card';
import { Heart, Globe, Sparkles, Users } from 'lucide-react';

export default function WhySection() {
  const reasons = [
    {
      icon: Globe,
      title: 'For Our Planet',
      description: 'Climate change affects us all. Every action counts in preserving Earth for future generations.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Heart,
      title: 'For Our Health',
      description: 'A cleaner environment means healthier air, water, and food for our families and communities.',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      icon: Users,
      title: 'For Our Community',
      description: 'Together we create lasting change. Your pledge inspires others to take action.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Sparkles,
      title: 'For Our Future',
      description: 'Small pledges today create big opportunities tomorrow. Build a sustainable legacy.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Why Take the Pledge?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your commitment matters. Join a movement of conscious citizens creating positive environmental impact across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card
                key={index}
                className={`p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${reason.bgColor} border-2 border-transparent hover:border-gray-200`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`p-4 rounded-full ${reason.bgColor} mb-4`}>
                    <Icon className={`w-8 h-8 ${reason.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <blockquote className="text-2xl italic text-gray-700 max-w-3xl mx-auto">
            &ldquo;Small pledges create big change — one click at a time.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
