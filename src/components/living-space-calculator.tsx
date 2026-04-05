import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { calculateLivingSpace } from '@/lib/calculations';
import SEO from '@/components/seo';
import { useAnimatedNumber } from '@/hooks/use-animated-number';

export default function LivingSpaceCalculator() {
  const [area, setArea] = useState(1);
  const [areaInput, setAreaInput] = useState('1');
  const [numerator, setNumerator] = useState(1);
  const [denominator, setDenominator] = useState(10);
  const [shareInput, setShareInput] = useState('1/10');

  const result = calculateLivingSpace(area, numerator, denominator);
  const animatedResult = useAnimatedNumber(result);
  const displayResult = parseFloat(animatedResult.toFixed(2));
  const isValid = result >= 6;

  const handleAreaBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let cleaned = e.target.value.replace(/[^\d,.]/g, '');
    cleaned = cleaned.replace(',', '.');
    const value = parseFloat(cleaned);
    if (!isNaN(value) && value >= 1 && value <= 100_000) {
      setArea(value);
      setAreaInput(value.toString());
    } else {
      setAreaInput(area.toString());
    }
  };

  const handleShareBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\s/g, '');
    const parts = cleaned.split('/');
    if (parts.length !== 2) {
      setShareInput(`${numerator}/${denominator}`);
      return;
    }
    const num = Number(parts[0]);
    const den = Number(parts[1]);
    if (isNaN(num) || isNaN(den) || den === 0 || num / den <= 0 || num / den >= 1) {
      setShareInput(`${numerator}/${denominator}`);
      return;
    }
    setNumerator(num);
    setDenominator(den);
    setShareInput(`${num}/${den}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <SEO
        title="Расчёт площади помещения"
        description="Калькулятор расчёта площади жилого помещения, пропорциональной размеру доли собственника"
      />

      {/* Page header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Калькулятор расчёта площади помещения
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Площадь жилого помещения, пропорциональная размеру доли собственника в общей собственности
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input section */}
        <Card className="lg:col-span-3 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-muted-foreground uppercase tracking-wide">
              Параметры
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="area" className="text-sm font-medium">
                Площадь жилого помещения
              </Label>
              <div className="relative">
                <Input
                  id="area"
                  value={areaInput}
                  onChange={(e) => setAreaInput(e.target.value)}
                  onBlur={handleAreaBlur}
                  className="pr-14"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  кв.м.
                </span>
              </div>
              <p className="text-xs text-muted-foreground">от 1 до 100 000 кв.м.</p>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label htmlFor="share" className="text-sm font-medium">
                Размер доли сособственника
              </Label>
              <Input
                id="share"
                value={shareInput}
                onChange={(e) => setShareInput(e.target.value)}
                onBlur={handleShareBlur}
                placeholder="например 1/10"
              />
              <p className="text-xs text-muted-foreground">
                Введите правильную дробь (числитель / знаменатель)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Result section */}
        <Card className="lg:col-span-2 shadow-sm border-primary/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-muted-foreground uppercase tracking-wide">
              Результат
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              className={`rounded-xl p-5 space-y-1 transition-colors ${
                isValid ? 'bg-success/10' : 'bg-destructive/10'
              }`}
            >
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Площадь по доле
              </p>
              <p
                className={`text-4xl font-bold tracking-tight tabular-nums ${
                  isValid ? 'text-success' : 'text-destructive'
                }`}
              >
                {displayResult}
              </p>
              <p className="text-sm text-muted-foreground">кв.м.</p>
            </div>

            <Separator />

            {!isValid ? (
              <Alert variant="destructive">
                <AlertDescription className="text-sm leading-relaxed">
                  Площадь менее 6 кв.м. — сделка ничтожна.
                  <br /><br />
                  <span className="font-semibold">За исключением</span> возникновения
                  права общей долевой собственности в силу закона: наследование,
                  приватизация, определение долей при использовании средств МСК.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="rounded-lg border border-success/30 bg-success/5 p-4">
                <p className="text-sm text-success font-medium">
                  Площадь соответствует требованиям (не менее 6 кв.м.)
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info section */}
      <Card className="shadow-sm bg-muted/30">
        <CardContent className="p-6 md:p-8 space-y-4">
          <h3 className="text-base font-bold text-foreground">
            Формула расчёта
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Исчисляемая площадь жилого помещения пропорциональна приобретаемому размеру
            доли в праве собственности и рассчитывается путём умножения площади жилого
            помещения на размер доли в праве собственности.
          </p>
          <Separator />
          <h3 className="text-base font-bold text-foreground">Примечание</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Площадь жилого помещения, приходящаяся на долю каждого из сособственников,{' '}
            <span className="font-semibold text-foreground">
              не должна составлять менее 6 кв.м.
            </span>{' '}
            общей площади жилого помещения на каждого сособственника.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
