import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import SEO from '@/components/seo';

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <SEO
        title="Главная"
        description="Калькулятор расчёта долей и площади жилого помещения — инструмент для расчётов при оформлении собственности"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-primary/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col items-center text-center gap-6">
            <img
              src="/logo.png"
              alt="Логотип Росреестр"
              className="h-28 md:h-36 w-auto object-contain mix-blend-multiply dark:mix-blend-normal dark:bg-white dark:rounded-xl dark:p-2"
            />
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                Калькулятор
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Верный помощник, позволяющий сэкономить время и произвести необходимые
                подсчёты при оформлении собственности
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <Link to="/residential-share" className="group no-underline">
            <Card className="h-full border-2 border-transparent transition-all duration-200 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                  %
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    Расчёт размера доли
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Расчёт доли в жилом помещении, приобретённом за счёт средств
                    материнского (семейного) капитала
                  </p>
                </div>
                <span className={buttonVariants({ variant: 'secondary', size: 'sm', className: 'group-hover:bg-primary group-hover:text-primary-foreground transition-colors' })}>
                  Перейти к расчёту
                </span>
              </CardContent>
            </Card>
          </Link>

          <Link to="/living-space" className="group no-underline">
            <Card className="h-full border-2 border-transparent transition-all duration-200 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                  m&#178;
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    Расчёт площади помещения
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Расчёт площади жилого помещения, пропорциональной размеру доли
                    собственника в общей собственности
                  </p>
                </div>
                <span className={buttonVariants({ variant: 'secondary', size: 'sm', className: 'group-hover:bg-primary group-hover:text-primary-foreground transition-colors' })}>
                  Перейти к расчёту
                </span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}
