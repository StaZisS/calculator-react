export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function reduceFraction(numerator: number, denominator: number): [number, number] {
  const g = gcd(numerator, denominator);
  return [numerator / g, denominator / g];
}

export function exactCalculation(mcf: number, pp: number, nfm: number) {
  let numerator = mcf;
  let denominator = pp * nfm;
  [numerator, denominator] = reduceFraction(numerator, denominator);

  const proportionMCF = `${numerator}/${denominator}`;
  const remainingSize = `${denominator - numerator * nfm}/${denominator}`;

  return { proportionMCF, remainingSize };
}

export function approximateCalculation(mcf: number, pp: number, nfm: number) {
  const divide = mcf / pp / nfm;

  let power = 2;
  while (Math.trunc(divide * Math.pow(10, power)) === 0) {
    power++;
  }

  const tail = Math.pow(10, power);
  const resultPMCF = Math.round(divide * tail);
  const resultRS = tail - resultPMCF * nfm;

  return {
    proportionMCF: `${resultPMCF}/${tail}`,
    remainingSize: `${resultRS}/${tail}`,
  };
}

export function calculateLivingSpace(area: number, numerator: number, denominator: number): number {
  return parseFloat((area * (numerator / denominator)).toFixed(2));
}

export function formatNumber(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function parseFormattedNumber(value: string): number {
  return Number(value.replace(/\s/g, ''));
}
