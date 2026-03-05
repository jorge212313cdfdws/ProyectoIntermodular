import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, afterEach, vi } from 'vitest';
import Card from '../components/Card/Card';

describe('Componente Card', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('muestra título y contenido pasados como props', () => {
    // Arrange
    const title = 'Cliente';
    const content = 'Contenido de prueba';

    // Act
    render(<Card title={title}>{content}</Card>);

    // Assert
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
  });
});