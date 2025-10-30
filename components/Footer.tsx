import { Leaf, Mail, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 text-muted-foreground py-12 px-4 border-t border-primary/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-8 h-8 text-emerald-500" />
              <span className="font-poppins text-xl font-bold text-foreground">
                Climate Action Pledge
              </span>
            </div>
            <p className="font-inter text-sm text-muted-foreground leading-relaxed">
              Join thousands of Indians committed to creating a sustainable future through collective climate action.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-space-grotesk text-foreground font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#hero" className="font-inter hover:text-primary transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#pledge-form" className="font-inter hover:text-primary transition">
                  Take the Pledge
                </a>
              </li>
              <li>
                <a href="#pledge-wall" className="font-inter hover:text-primary transition">
                  Pledge Wall
                </a>
              </li>
              <li>
                <a href="#about" className="font-inter hover:text-primary transition">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-space-grotesk text-foreground font-semibold mb-4">Connect With Us</h4>
            <div className="space-y-3">
              <a
                href="mailto:contact@climateactionpledge.in"
                className="font-inter flex items-center gap-2 text-sm hover:text-primary transition"
              >
                <Mail className="w-4 h-4" />
                contact@climateactionpledge.in
              </a>
              <div className="flex gap-4 pt-2">
                <a
                  href="#"
                  className="hover:text-primary transition"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="hover:text-primary transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="hover:text-primary transition"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-inter text-sm text-muted-foreground">
            © {currentYear} Climate Action Pledge. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-green-400 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-green-400 transition">
              Terms of Service
            </a>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-8 text-center">
          <p className="font-inter text-sm italic text-muted-foreground">
            &ldquo;Small pledges create big change — one click at a time.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
