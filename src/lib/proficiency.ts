export type Cell = { on: boolean; label: string };

export function proficiencyCells(level: number, style: 'hex' | 'blocks' = 'hex'): Cell[] {
  return Array.from({ length: 10 }, (_, i) => {
    const on = i < level;
    if (style === 'blocks') return { on, label: on ? '█' : '░' };
    return { on, label: on ? 'FF' : '00' };
  });
}
