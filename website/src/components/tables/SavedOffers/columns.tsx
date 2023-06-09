'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  MoreHorizontal,
  DoorOpen,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { removeAlert } from './removeOffer';

export type SavedOffer = {
  id: string;
  alertId: string;
  title: string;
  company: string;
  location: string;
  maxSalary: number;
  minSalary: number;
  period: string;
  contractType: string;
  applications: number;
  vacancies: number;
  deleted: boolean;
};

export const columns: ColumnDef<SavedOffer>[] = [
  {
    accessorKey: 'title',
    header: 'Título',
    enableHiding: false,
  },
  {
    accessorKey: 'company',
    header: 'Empresa',
  },
  {
    accessorKey: 'location',
    header: 'Provincia',
  },
  {
    accessorKey: 'minSalary',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Salario mínimo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseInt(row.getValue('minSalary'));
      const formatted = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'maxSalary',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Salario máximo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseInt(row.getValue('maxSalary'));
      const formatted = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'period',
    header: 'Periodo',
  },
  {
    accessorKey: 'contractType',
    header: 'Tipo de contrato',
  },
  {
    accessorKey: 'applications',
    // header: 'Candidatos',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Candidatos
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const applications = row.getValue('applications') as number;
      return <div className="text-right font-medium">{applications}</div>;
    },
  },
  {
    accessorKey: 'vacancies',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Vacantes
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const vacancies = row.getValue('vacancies') as number;
      return <div className="text-right font-medium">{vacancies}</div>;
    },
  },
  {
    accessorKey: 'deleted',
    header: 'Estado',
    cell: ({ row }) => {
      const deleted: boolean = row.getValue('deleted');

      return (
        <div className="flex items-center">
          <div
            className={twMerge(
              'h-2 w-2 rounded-full',
              deleted ? 'bg-red-500' : 'bg-green-500',
              'mr-2'
            )}
          />
          {deleted ? 'Eliminada' : 'Activa'}
        </div>
      );
    },
  },
  {
    id: 'open',
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Link
          href={`/offer/${id}`}
          className="flex items-center cursor-pointer p-2 border border-gray-300 rounded-md hover:bg-gray-50/10"
        >
          <span className="sr-only">Ver oferta</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={`/offer/${payment.id}`}
                className="flex items-center cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="mr-2">Ver oferta</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                await removeAlert(payment.alertId);
                location.reload();
              }}
              className="cursor-pointer"
            >
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
