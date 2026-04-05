import { useAnimatedNumber } from '@/hooks/use-animated-number';

interface AnimatedFractionProps {
  fraction: string;
  className?: string;
}

export default function AnimatedFraction({ fraction, className }: AnimatedFractionProps) {
  const parts = fraction.split('/');
  const numerator = Number(parts[0]) || 0;
  const denominator = Number(parts[1]) || 1;

  const animNumerator = useAnimatedNumber(numerator);
  const animDenominator = useAnimatedNumber(denominator);

  return (
    <span className={className}>
      {Math.round(animNumerator)}/{Math.round(animDenominator)}
    </span>
  );
}
