import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';
import {
  exactCalculation,
  approximateCalculation,
  formatNumber,
  parseFormattedNumber,
} from '@/lib/calculations';
import SEO from '@/components/seo';
import AnimatedFraction from '@/components/animated-fraction';

import { Download } from 'lucide-react';

function calculateStep(value: number, min: number, max: number, minPower: number, maxPower: number) {
  const range = max - min;
  const proportion = (value - min) / range;
  const power = minPower + proportion * (maxPower - minPower);
  const step = Math.pow(10, Math.floor(power));
  return Math.min(step, max - min);
}

function snapValue(raw: number, min: number, max: number, minPower: number, maxPower: number) {
  const step = calculateStep(raw, min, max, minPower, maxPower);
  return Math.max(Math.round(raw / step) * step, min);
}

export default function ResidentialShareCalculator() {
  const [mcf, setMcf] = useState(1);
  const [pp, setPp] = useState(1);
  const [nfm, setNfm] = useState(2);
  const [isExact, setIsExact] = useState(false);

  const [mcfInput, setMcfInput] = useState('1');
  const [ppInput, setPpInput] = useState('1');
  const [nfmInput, setNfmInput] = useState('2');

  const result = isExact
    ? exactCalculation(mcf, pp, nfm)
    : approximateCalculation(mcf, pp, nfm);

  const handleMcfSlider = (value: number | readonly number[]) => {
    const raw = Array.isArray(value) ? value[0] : value;
    const snapped = snapValue(raw, 1, 1_000_000, 2, 5);
    setMcf(snapped);
    setMcfInput(formatNumber(snapped.toString()));
  };

  const handlePpSlider = (value: number | readonly number[]) => {
    const raw = Array.isArray(value) ? value[0] : value;
    const snapped = snapValue(raw, 1, 100_000_000, 2, 6);
    setPp(snapped);
    setPpInput(formatNumber(snapped.toString()));
  };

  const handleNfmSlider = (value: number | readonly number[]) => {
    const v = Array.isArray(value) ? value[0] : value;
    setNfm(v);
    setNfmInput(v.toString());
  };

  const handleMcfInput = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = parseFormattedNumber(e.target.value);
    if (value >= 1 && value <= 1_000_000) {
      setMcf(value);
      setMcfInput(formatNumber(value.toString()));
    } else {
      setMcfInput(formatNumber(mcf.toString()));
    }
  };

  const handlePpInput = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = parseFormattedNumber(e.target.value);
    if (value >= 1 && value <= 100_000_000) {
      setPp(value);
      setPpInput(formatNumber(value.toString()));
    } else {
      setPpInput(formatNumber(pp.toString()));
    }
  };

  const handleNfmInput = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 2 && value <= 20) {
      setNfm(value);
      setNfmInput(value.toString());
    } else {
      setNfmInput(nfm.toString());
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <SEO
        title="Расчёт размера доли"
        description="Калькулятор расчёта размера доли в жилом помещении, приобретённом за счёт средств материнского (семейного) капитала"
      />

      {/* Page header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Калькулятор расчёта размера доли
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Расчёт доли в жилом помещении, приобретённом за счёт средств материнского (семейного) капитала
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
              <Label htmlFor="mcf" className="text-sm font-medium">
                Размер средств МСК
              </Label>
              <div className="relative">
                <Input
                  id="mcf"
                  value={mcfInput}
                  onChange={(e) => setMcfInput(e.target.value)}
                  onBlur={handleMcfInput}
                  onFocus={(e) => setMcfInput(e.target.value.replace(/\s/g, ''))}
                  className="pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  руб.
                </span>
              </div>
              <Slider
                value={[mcf]}
                min={1}
                max={1_000_000}
                step={1}
                onValueChange={handleMcfSlider}
              />
              <p className="text-xs text-muted-foreground">от 1 до 1 000 000 руб.</p>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label htmlFor="pp" className="text-sm font-medium">
                Цена приобретённого имущества
              </Label>
              <div className="relative">
                <Input
                  id="pp"
                  value={ppInput}
                  onChange={(e) => setPpInput(e.target.value)}
                  onBlur={handlePpInput}
                  onFocus={(e) => setPpInput(e.target.value.replace(/\s/g, ''))}
                  className="pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  руб.
                </span>
              </div>
              <Slider
                value={[pp]}
                min={1}
                max={100_000_000}
                step={1}
                onValueChange={handlePpSlider}
              />
              <p className="text-xs text-muted-foreground">от 1 до 100 000 000 руб.</p>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label htmlFor="nfm" className="text-sm font-medium">
                Количество членов семьи
              </Label>
              <div className="relative">
                <Input
                  id="nfm"
                  value={nfmInput}
                  onChange={(e) => setNfmInput(e.target.value)}
                  onBlur={handleNfmInput}
                  className="pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  чел.
                </span>
              </div>
              <Slider
                value={[nfm]}
                min={2}
                max={20}
                step={1}
                onValueChange={handleNfmSlider}
              />
              <p className="text-xs text-muted-foreground">от 2 до 20 чел.</p>
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
            <div className="rounded-xl bg-primary/5 p-5 space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Доля каждого за счёт МСК
              </p>
              <AnimatedFraction
                fraction={result.proportionMCF}
                className="block text-3xl font-bold text-primary tracking-tight tabular-nums"
              />
            </div>

            <div className="rounded-xl bg-secondary p-5 space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Остаток доли титульных владельцев
              </p>
              <AnimatedFraction
                fraction={result.remainingSize}
                className="block text-3xl font-bold text-secondary-foreground tracking-tight tabular-nums"
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="accuracy" className="text-sm cursor-pointer">
                {isExact ? 'Точное вычисление' : 'Приблизительное вычисление'}
              </Label>
              <Switch
                id="accuracy"
                checked={isExact}
                onCheckedChange={setIsExact}
              />
            </div>
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
            Доли в праве общей долевой собственности определяются, исходя из равенства
            долей родителей и детей на средства МСК: денежные средства МСК делятся
            на цену приобретённого имущества (по Договору) и на количество членов семьи.
            Доли детей должны быть пропорциональны МСК.
          </p>
          <Separator />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Калькулятор разработан для удобного подсчёта размера доли при оформлении
            Соглашения о распределении долей между членами семьи получателя сертификата.
          </p>
          <a
            href="/obrazec.docx"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
          >
            <Download className="size-4 mr-1.5" />
            Скачать образец соглашения
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
