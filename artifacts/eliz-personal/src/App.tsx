import { type ReactNode, useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Dumbbell,
  Instagram,
  Menu,
  MessageCircle,
  Music2,
  Plus,
  Sparkles,
  Utensils,
  X,
} from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Route, Switch, useLocation, Router as WouterRouter } from "wouter";
import logoPath from "@assets/Sem_título-2_1787703051617.png";
import trainerPhotoPath from "@assets/image_1787704344454.png";

const queryClient = new QueryClient();
const WHATSAPP_URL =
  "https://client.mfitpersonal.com.br/out/signup-link/NDcxODM=";

const testimonials = [
  {
    quote:
      "Segunda cheguei cansada e pensei, acho que não vou hoje, tem casa pra arrumar e estou cansada, mas aí penso que o treino é de 30 minutos e me ajuda a não deixar de ir, pois é rápido.",
    name: "Ana C.",
    detail: "Aluna de consultoria online",
    initials: "AC",
  },
  {
    quote: ".",
    name: "Mariana S.",
    detail: "Consultoria online · 5 meses",
    initials: "MS",
  },
  {
    quote:
      "A Eliz enxerga a pessoa inteira, não apenas o peso na barra. Isso mudou tudo para mim.",
    name: "Luiza P.",
    detail: "Treino personalizado · 1 ano",
    initials: "LP",
  },
];

const faqs = [
  {
    question: "Preciso estar em forma para começar?",
    answer:
      "De jeito nenhum. As primeiras sessões são pensadas para o seu nível atual, seu histórico e o que é possível neste momento. Começamos de onde você está e evoluímos a partir daí.",
  },
  {
    question: "O que inclui?",
    answer:
      "Avaliação física, acompanhamento através do aplicativo Mfitpersonal, treino personalizado, pensando nas suas necessidades e orientação via WhatsApp",
  },
  {
    question: "Quando podemos começar?",
    answer:
      "Agora mesmo! Envie uma mensagem pelo WhatsApp contando um pouco sobre seu objetivo. Vamos conversar e juntas encontraremos a melhor estatégia para alcançar o seu objetivo.",
  },
];

function useScrollAnimations() {
  useEffect(() => {
    // Pequeno atraso para garantir que o React montou o DOM totalmente
    const timer = setTimeout(() => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(".reveal-on-scroll"),
      );

      if (elements.length === 0) return;

      if (!("IntersectionObserver" in window)) {
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
      }

      const observer = new IntersectionObserver(
        (entries, currentObserver) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              currentObserver.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: "0px 0px -50px 0px",
          threshold: 0.1,
        },
      );

      elements.forEach((element) => observer.observe(element));
    }, 100);

    return () => clearTimeout(timer);
  }, []);
}

function AnchorLink({
  href,
  children,
  className = "",
  onClick,
  ...props
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: unknown;
}) {
  return (
    <a href={href} className={className} onClick={onClick} {...props}>
      {children}
    </a>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <AnchorLink
          href="#top"
          onClick={closeMenu}
          aria-label="Página inicial Eliz Personal"
          data-testid="link-logo"
        >
          <img src={logoPath} alt="Eliz Personal" className="brand-logo" />
        </AnchorLink>
        <nav className="desktop-nav" aria-label="Main navigation">
          <AnchorLink
            href="#about"
            className="nav-link"
            data-testid="link-nav-about"
          >
            Sobre mim
          </AnchorLink>
          <AnchorLink
            href="#services"
            className="nav-link"
            data-testid="link-nav-services"
          >
            Programas
          </AnchorLink>
          <AnchorLink
            href="#stories"
            className="nav-link"
            data-testid="link-nav-stories"
          >
            Resultados
          </AnchorLink>
          <AnchorLink
            href="#faq"
            className="nav-link"
            data-testid="link-nav-faq"
          >
            FAQ
          </AnchorLink>
        </nav>
        <div className="flex items-center gap-2">
          <AnchorLink
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="header-cta hidden sm:inline-flex"
            data-testid="link-header-cta"
          >
            Comece hoje <ArrowUpRight size={15} />
          </AnchorLink>
          <button
            type="button"
            className="mobile-menu-btn"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="shell mobile-panel" aria-label="Mobile navigation">
          <AnchorLink
            href="#about"
            className="nav-link"
            onClick={closeMenu}
            data-testid="link-mobile-about"
          >
            Sobre mim
          </AnchorLink>
          <AnchorLink
            href="#services"
            className="nav-link"
            onClick={closeMenu}
            data-testid="link-mobile-services"
          >
            Programas
          </AnchorLink>
          <AnchorLink
            href="#stories"
            className="nav-link"
            onClick={closeMenu}
            data-testid="link-mobile-stories"
          >
            Resultados
          </AnchorLink>
          <AnchorLink
            href="#faq"
            className="nav-link"
            onClick={closeMenu}
            data-testid="link-mobile-faq"
          >
            FAQ
          </AnchorLink>
          <AnchorLink
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="header-cta w-fit"
            onClick={closeMenu}
            data-testid="link-mobile-cta"
          >
            Comece sua transformação <ArrowUpRight size={15} />
          </AnchorLink>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" data-testid="section-hero">
      <div className="shell hero-grid">
        <div className="hero-copy reveal">
          <p className="eyebrow">Treino personalizado · online e presencial</p>
          <h1 className="display">
            Transforme seu corpo. <em>Desbloqueie seu potencial.</em>
          </h1>
          <p className="hero-lede">
            Treinos que respeitam o seu momento e acompanham a vida que você
            realmente leva. Construa um corpo onde você se sinta linda,
            confiante e forte.
          </p>
          <div className="hero-actions">
            <AnchorLink
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary"
              data-testid="link-hero-cta"
            >
              Comece sua transformação <ArrowUpRight size={17} />
            </AnchorLink>
            <AnchorLink
              href="#services"
              className="button-outline"
              data-testid="link-hero-services"
            >
              Veja como funciona
            </AnchorLink>
          </div>
          <p className="hero-note">
            <Check size={15} strokeWidth={3} /> Com treinos adpatados para você.
          </p>
        </div>
      </div>
      <AnchorLink
        href="#about"
        className="hero-scroll shell"
        data-testid="link-scroll-about"
      >
        <span /> Conheça sua treinadora
      </AnchorLink>
    </section>
  );
}

function ProofStrip() {
  return (
    <section
      className="proof-strip"
      aria-label="Destaques Eliz Personal"
      data-testid="section-proof"
    >
      <div className="shell proof-grid">
        <div className="proof-item">
          <span className="proof-number" data-testid="text-transformed-lives">
            300+
          </span>
          <span className="proof-label">Vidas transformadas</span>
        </div>
        <div className="proof-item">
          <span className="proof-number">8+</span>
          <span className="proof-label">Anos de experiência</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      className="about section-pad"
      id="about"
      data-testid="section-about"
    >
      <div className="shell about-grid">
        <div className="portrait-wrap">
          <img
            className="portrait reveal-on-scroll animate-zoom-in"
            src={trainerPhotoPath}
            alt="Eliz sorrindo em seu estúdio de treinamento"
            data-testid="img-eliz-portrait"
          />
          <div className="portrait-label reveal-on-scroll animate-fade-in-up">
            Seu resultado começa com uma decisão.
          </div>
        </div>
        <div className="about-copy">
          <p className="eyebrow">A pessoa por trás do plano</p>
          <h2 className="display reveal-on-scroll animate-fade-in-up">
            Oi, eu sou a Eliz.
          </h2>
          <p className="reveal-on-scroll animate-fade-in-up">
            Acredito que treinar e mais que somente cargas e séries. É um
            momento de conexão entre corpo e mente que transformam sua vida!
          </p>
          <p className="mt-4 reveal-on-scroll animate-fade-in-up">
            Meu trabalho é tornar o treino claro, progressivo e verdadeiramente
            seu — com desafio suficiente para transformar e flexibilidade
            suficiente para durar.
          </p>
          <p className="signature reveal-on-scroll animate-fade-in-up">
            vamos fazer de cada treino um momento único!
          </p>
        </div>
      </div>
    </section>
  );
}

function Offerings() {
  const offerings = [
    {
      icon: <Dumbbell size={21} />,
      title: "Treino personalizado presencial",
      text: "Sessões focadas na técnica, com energia e acompanhamento para manter você em movimento.",
    },
    {
      icon: <Sparkles size={21} />,
      title: "Consultoria online",
      text: "Um plano vivo construído para sua rotina, seus equipamentos e seu próximo nível.",
    },
  ];
  return (
    <section
      className="offerings section-pad"
      id="services"
      data-testid="section-services"
    >
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow">Escolha seu caminho</p>
          <h2 className="display reveal-on-scroll animate-fade-in-up">
            Suporte que cabe na sua vida.
          </h2>
          <p className="offerings-intro reveal-on-scroll animate-fade-in-up">
            Nenhum corpo, objetivo ou semana é igual. Sua jornada nunca deve
            parecer saída de um modelo pronto.
          </p>
        </div>
        <div className="offer-grid">
          {offerings.map((offering, index) => (
            <article
              className={`offer-card reveal-on-scroll animate-fade-in-up ${
                index === 0 ? "delay-100" : "delay-200"
              }`}
              key={offering.title}
              data-testid={`card-offering-${index}`}
            >
              <div className="offer-icon">{offering.icon}</div>
              <ArrowUpRight className="offer-arrow" size={20} />
              <h3>{offering.title}</h3>
              <p>{offering.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Method() {
  const steps = [
    [
      "01",
      "Conte onde você quer chegar",
      "Começamos com uma conversa sobre seus objetivos, experiência, rotina e o que não funcionou antes.",
    ],
    [
      "02",
      "Criamos um plano que se encaixa",
      "Seu treino, hábitos e marcadores de progresso são moldados para sua semana real — não para uma semana imaginária.",
    ],
    [
      "03",
      "Você constrói resultados, semana a semana",
      "Ajustamos, celebramos as conquistas e mantemos o desafio na medida certa para gerar uma mudança verdadeira.",
    ],
  ];
  return (
    <section
      className="method section-pad bg-[#f2b8b5]"
      data-testid="section-method"
    >
      <div className="shell method-grid">
        <div>
          <p className="eyebrow">O método Eliz</p>
          <h2 className="display reveal-on-scroll animate-fade-in-up">
            Pequenas mudanças.
            <br />
            Transformação de verdade.
          </h2>
          <p className="method-copy reveal-on-scroll animate-fade-in-up">
            O progresso não precisa ser extremo para mudar sua vida. Precisa ser
            específico, consistente e acompanhado.
          </p>
        </div>
        <div className="steps">
          {steps.map(([number, title, text]) => (
            <div
              className={`step reveal-on-scroll animate-fade-in-up ${
                number === "01"
                  ? "delay-100"
                  : number === "02"
                    ? "delay-200"
                    : "delay-300"
              }`}
              key={number}
            >
              <span className="step-no">{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stories() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];
  const move = (direction: number) =>
    setActive((active + direction + testimonials.length) % testimonials.length);
  return (
    <section
      className="stories section-pad"
      id="stories"
      data-testid="section-stories"
    >
      <div className="shell">
        <div className="stories-top">
          <div>
            <p className="eyebrow">Pessoas reais, progresso real</p>
            <h2 className="display reveal-on-scroll animate-fade-in-up">
              Seu futuro já está torcendo por você.
            </h2>
          </div>
          <div
            className="story-controls"
            aria-label="Controles dos depoimentos"
          >
            <button
              type="button"
              className="control-btn"
              onClick={() => move(-1)}
              aria-label="Depoimento anterior"
              data-testid="button-testimonial-previous"
            >
              <ChevronLeft size={19} />
            </button>
            <button
              type="button"
              className="control-btn"
              onClick={() => move(1)}
              aria-label="Próximo depoimento"
              data-testid="button-testimonial-next"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>
        <article
          className="story-card reveal-on-scroll animate-fade-in-up"
          aria-live="polite"
          data-testid={`card-testimonial-${active}`}
        >
          <div className="story-quote">&ldquo;</div>
          <div>
            <p className="story-text">{current.quote}</p>
            <div className="story-meta mt-7">
              <div className="avatar" aria-hidden="true">
                {current.initials}
              </div>
              <div>
                <p className="story-name">{current.name}</p>
                <p className="story-detail">{current.detail}</p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-end justify-end">
            <Clock3 size={18} style={{ color: "hsl(var(--primary))" }} />
            <span className="sr-only">Acompanhamento contínuo</span>
          </div>
        </article>
        <div
          className="story-dots reveal-on-scroll animate-fade-in-up"
          aria-label="Escolha um depoimento"
        >
          {testimonials.map((testimonial, index) => (
            <button
              type="button"
              key={testimonial.name}
              className={`story-dot ${index === active ? "active" : ""}`}
              aria-label={`Mostrar depoimento ${index + 1}`}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
              data-testid={`button-testimonial-dot-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="faq section-pad" id="faq" data-testid="section-faq">
      <div className="shell faq-grid">
        <div className="faq-intro">
          <p className="eyebrow">Boas perguntas são bem-vindas</p>
          <h2 className="display reveal-on-scroll animate-fade-in-up">
            Antes de começar.
          </h2>
          <p className="reveal-on-scroll animate-fade-in-up">
            Ainda pensando se este é o caminho para você? Não existe pressão nem
            ponto de partida perfeito. Envie uma mensagem e vamos descobrir
            juntas o próximo passo.
          </p>
          <AnchorLink
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="button-outline mt-6 reveal-on-scroll animate-fade-in-up delay-100"
            data-testid="link-faq-cta"
          >
            Fale comigo <MessageCircle size={16} />
          </AnchorLink>
        </div>
        <div className="faq-list reveal-on-scroll animate-fade-in-up delay-200">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div className="faq-item" key={faq.question}>
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                  data-testid={`button-faq-${index}`}
                >
                  <span>{faq.question}</span>
                  <Plus size={19} />
                </button>
                {isOpen && (
                  <p
                    className="faq-answer"
                    id={`faq-answer-${index}`}
                    data-testid={`text-faq-answer-${index}`}
                  >
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact" data-testid="section-contact">
      <div className="shell contact-inner">
        <p className="eyebrow" style={{ color: "rgba(255,255,255,.78)" }}>
          Sua vez
        </p>
        <h2 className="display reveal-on-scroll animate-fade-in-up">
          Pronta para descobrir do que você é capaz?
        </h2>
        <p className="reveal-on-scroll animate-fade-in-up">
          Conte o que você quer conquistar. Vamos transformar essa primeira
          mensagem em um plano em que você acredita.
        </p>
        <AnchorLink
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="button-primary reveal-on-scroll animate-fade-in-up delay-100"
          data-testid="link-contact-cta"
        >
          Fale com a Eliz no WhatsApp <ArrowUpRight size={17} />
        </AnchorLink>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <AnchorLink
              href="#top"
              aria-label="Voltar ao topo"
              data-testid="link-footer-logo"
            >
              <img src={logoPath} alt="Eliz Personal" className="footer-logo" />
            </AnchorLink>
            <p className="footer-tag">
              Treinamento para quem você é, se tornar quem você quer ser!
            </p>
          </div>
          <div className="social-links" aria-label="Social links">
            <AnchorLink
              href="https://www.instagram.com/eliz_personal/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Eliz Personal no Instagram"
              data-testid="link-instagram"
            >
              <Instagram size={17} />
            </AnchorLink>
            <AnchorLink
              href="https://www.tiktok.com/@elizpersonal"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Eliz Personal no TikTok"
              data-testid="link-tiktok"
            >
              <Music2 size={17} />
            </AnchorLink>
          </div>
        </div>
        <div className="footer-bottom">
          <span data-testid="text-copyright">
            © 2026 Eliz Personal. Todos os direitos reservados.
          </span>
          <AnchorLink href="#top" data-testid="link-back-top">
            Voltar ao topo ↑
          </AnchorLink>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  useScrollAnimations();

  return (
    <div className="eliz-page" data-testid="page-home">
      <Header />
      <main>
        <Hero />
        <ProofStrip />
        <About />
        <Offerings />
        <Method />
        <Stories />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
