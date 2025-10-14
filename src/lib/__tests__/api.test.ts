import {describe, it, expect} from 'vitest';
import {buildProductsQuery} from '../../lib/api';

describe('buildProductsQuery', () => {
  it('omits empty params', () => {
    const qs = buildProductsQuery({q: '', min: undefined, max: null as any});
    expect(qs).toBe('');
  });
  it('serializes basic filters', () => {
    const qs = buildProductsQuery({q:'kulaklık', min:100, max:500, sort:'price_asc', page:2, perPage:24});
    const parts = new URLSearchParams(qs);
    expect(parts.get('q')).toBe('kulaklık');
    expect(parts.get('min')).toBe('100');
    expect(parts.get('max')).toBe('500');
    expect(parts.get('sort')).toBe('price_asc');
    expect(parts.get('page')).toBe('2');
    expect(parts.get('perPage')).toBe('24');
  });
});
