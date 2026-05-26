import { expect, test, vi } from 'vitest';
import { throttle } from '../src/utils/throttle';

test('calls function immediately on first invocation', () => {
  const fn = vi.fn();
  const throttled = throttle(fn, 100);

  throttled();

  expect(fn).toHaveBeenCalledTimes(1);
});

test('allows another call after delay has passed', () => {
  vi.useFakeTimers();
  const fn = vi.fn();
  const throttled = throttle(fn, 100);

  throttled();
  vi.advanceTimersByTime(100);
  throttled();

  expect(fn).toHaveBeenCalledTimes(2);
  vi.useRealTimers();
});

test('suppresses calls within the delay window', () => {
  vi.useFakeTimers();
  const fn = vi.fn();
  const throttled = throttle(fn, 100);

  throttled();
  throttled();
  throttled();

  expect(fn).toHaveBeenCalledTimes(1);
  vi.useRealTimers();
});

test('passes arguments to the wrapped function', () => {
  const fn = vi.fn();
  const throttled = throttle(fn, 100);

  throttled('a', 42);

  expect(fn).toHaveBeenCalledWith('a', 42);
});

test('calls every invocation when ms is 0', () => {
  const fn = vi.fn();
  const throttled = throttle(fn, 0);

  throttled();
  throttled();
  throttled();

  expect(fn).toHaveBeenCalledTimes(3);
});
