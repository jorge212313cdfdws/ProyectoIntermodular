import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../components/Card/Card';

describe('Componente Card', () => {
  it('muestra título y contenido pasados como props', () => {
    render(<Card title="Cliente">Contenido de prueba</Card>);
    expect(screen.getByText('Cliente')).toBeInTheDocument();
    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument();
  });
});