import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); onNavigate("home"); }}
        aria-current={current === "home" ? "page" : undefined}
      >
        Ana Sayfa
      </a>{" "}
      |{" "}
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); onNavigate("events"); }}
        aria-current={current === "events" ? "page" : undefined}
      >
        Etkinlikler
      </a>{" "}
      |{" "}
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); onNavigate("add"); }}
        aria-current={current === "add" ? "page" : undefined}
      >
        Ekle
      </a>
    </nav>
  );
}

export default Navigation;