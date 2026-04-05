import { Link } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';
import SEO from '@/components/seo';

export default function NotFound() {
  return (
    <>
      <SEO
        title="Страница не найдена"
        description="Запрашиваемая страница не существует"
      />
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-8xl font-bold text-primary/20">404</p>
        <h1 className="mt-4 text-2xl font-bold text-foreground">
          Страница не найдена
        </h1>
        <p className="mt-2 text-muted-foreground max-w-md">
          Запрашиваемая страница не существует или была перемещена.
          Воспользуйтесь навигацией для перехода к нужному разделу.
        </p>
        <div className="mt-8 flex gap-3">
          <Link to="/" className={buttonVariants({ variant: 'default' })}>
            На главную
          </Link>
          <Link
            to="/residential-share"
            className={buttonVariants({ variant: 'outline' })}
          >
            Калькулятор долей
          </Link>
        </div>
      </div>
    </>
  );
}
