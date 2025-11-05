'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Building, FileText, Ship, GitBranch, Package } from 'lucide-react';
import { useState } from 'react';

export default function NavBar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/ofertas', label: 'Ofertas', icon: FileText },
    { href: '/exportacao/match', label: 'Match Exportação', icon: Ship },
    { href: '/exportacao', label: 'Exportação', icon: Package },
    { href: '/workflow', label: 'Workflow', icon: GitBranch },
    { href: '/cadastros', label: 'Cadastros', icon: Building },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    
    // Tratamento especial para evitar conflito entre /exportacao e /exportacao/match
    if (href === '/exportacao/match') {
      return pathname.startsWith('/exportacao/match');
    }
    if (href === '/exportacao') {
      return pathname === '/exportacao' || (pathname.startsWith('/exportacao/') && !pathname.startsWith('/exportacao/match'));
    }
    
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-menuGreen text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-bold text-menuGreen text-xl">
              PE
            </div>
            <span className="font-bold text-lg hidden sm:block">
              Plataforma Exportação
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive(item.href)
                      ? 'bg-menuGreen-light text-white font-semibold'
                      : 'text-white/80 hover:bg-menuGreen-light/50 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-menuGreen-light transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-menuGreen-light/30">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all mb-1 ${
                    isActive(item.href)
                      ? 'bg-menuGreen-light text-white font-semibold'
                      : 'text-white/80 hover:bg-menuGreen-light/50 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
