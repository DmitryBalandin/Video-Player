import { expect, test } from 'vitest';
import { formatTime } from '../src/utils/formatTime';

test('formatTime converts seconds to m:ss', () => {
  expect(formatTime(0)).toBe('0:00');
  expect(formatTime(5)).toBe('0:05');
  expect(formatTime(65)).toBe('1:05');
  expect(formatTime(3661)).toBe('61:01');
});

test('formatTime handles non-finite values', () => {
  expect(formatTime(Infinity)).toBe('0:00');
  expect(formatTime(NaN)).toBe('0:00');
});

test('formatTime handles negative values', () => {
  expect(formatTime(-0)).toBe('0:00');
  expect(formatTime(-5)).toBe('-1:-5');
});

test('formatTime handles large values', () => {
  expect(formatTime(999999)).toBe('16666:39');
});
