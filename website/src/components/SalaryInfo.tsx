type SalaryProps = {
  maxPay?: {
    amount: number;
    periodId: number;
  };
  minPay?: {
    amount: number;
    periodId: number;
  };
  salaryDescription?: string;
  className: string;
};

const periods: {
  [key: number]: string;
} = {
  1: 'Hora',
  2: 'Mes',
  3: 'Año',
};

export function Salary(SalaryProps: SalaryProps) {
  const maxPayValue =
    SalaryProps.maxPay?.amount ||
    SalaryProps.salaryDescription
      ?.split(' - ')[1]
      ?.split('€')[0]
      ?.replace('.', '');

  const minPayValue =
    SalaryProps.minPay?.amount ||
    SalaryProps.salaryDescription
      ?.split(' - ')[0]
      ?.split('€')[0]
      ?.replace('.', '');

  const period =
    SalaryProps.maxPay?.periodId || SalaryProps.minPay?.periodId || 2;

  return (
    <div className={SalaryProps.className}>
      <p>
        {fmtNumber(minPayValue as string)} - {fmtNumber(maxPayValue as string)}
        <span className='text-gray-500 text-sm'> / {periods[period]}</span>
      </p>
    </div>
  );
}

function fmtNumber(n: string | number): string {
  const salary = typeof n === 'string' ? parseInt(n) : n;
  if (salary < 1000) return salary.toString() + '€';
  return Math.round(salary / 1000).toString() + 'k ' + '€';
}
