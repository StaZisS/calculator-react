import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Межмуниципальный Бердский отдел Управления Росреестра по Новосибирской области</p>
        <nav className="flex gap-4">
          <Link to="/residential-share" className="hover:text-foreground transition-colors">
            Расчёт доли
          </Link>
          <Link to="/living-space" className="hover:text-foreground transition-colors">
            Расчёт площади
          </Link>
        </nav>
      </div>
    </footer>
  );
}
