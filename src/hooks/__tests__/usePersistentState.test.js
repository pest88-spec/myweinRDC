import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import usePersistentState, { STORAGE_KEY, DEBOUNCE_MS } from '../usePersistentState';

/**
 * Test suite for usePersistentState hook.
 * Validates Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6
 */

const TEST_INITIAL_STATE = {
  company: { name: 'Test Corp', address: '123 Test St' },
  employee: { name: 'Jane Doe', position: 'Engineer' },
};

describe('usePersistentState', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // --- Requirement 5.3: Use INITIAL_STATE as default when no saved state ---
  describe('initialization with no saved state', () => {
    it('should return initialState when localStorage is empty', () => {
      const { result } = renderHook(() => usePersistentState(TEST_INITIAL_STATE));
      const [state] = result.current;
      expect(state).toEqual(TEST_INITIAL_STATE);
    });

    it('should not have any data in localStorage before debounce fires', () => {
      renderHook(() => usePersistentState(TEST_INITIAL_STATE));
      // Before debounce, localStorage should still be empty from initialization
      // (the effect hasn't fired yet since we use fake timers)
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    });
  });

  // --- Requirement 5.2: Restore saved state from localStorage on startup ---
  describe('initialization with saved state', () => {
    it('should restore state from localStorage on startup', () => {
      const savedState = { company: { name: 'Saved Corp', address: '456 Saved Ave' }, employee: { name: 'Saved User', position: 'Manager' } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));

      const { result } = renderHook(() => usePersistentState(TEST_INITIAL_STATE));
      const [state] = result.current;
      expect(state).toEqual(savedState);
    });
  });

  // --- Requirement 5.4: Clear corrupted data and fall back to INITIAL_STATE ---
  describe('corrupted data handling', () => {
    it('should fall back to initialState when localStorage contains invalid JSON', () => {
      localStorage.setItem(STORAGE_KEY, '{corrupted data!!!');

      const { result } = renderHook(() => usePersistentState(TEST_INITIAL_STATE));
      const [state] = result.current;
      expect(state).toEqual(TEST_INITIAL_STATE);
    });

    it('should clear corrupted data from localStorage', () => {
      localStorage.setItem(STORAGE_KEY, 'not-valid-json');

      renderHook(() => usePersistentState(TEST_INITIAL_STATE));
      // The corrupted data should have been removed during initialization
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    });

    it('should fall back to initialState when localStorage contains empty string', () => {
      localStorage.setItem(STORAGE_KEY, '');

      const { result } = renderHook(() => usePersistentState(TEST_INITIAL_STATE));
      const [state] = result.current;
      expect(state).toEqual(TEST_INITIAL_STATE);
    });
  });

  // --- Requirement 5.1: Save state with 500ms debounce after field change ---
  // --- Requirement 5.6: JSON serialization/deserialization ---
  describe('debounced saving', () => {
    it('should export DEBOUNCE_MS as 500', () => {
      expect(DEBOUNCE_MS).toBe(500);
    });

    it('should export STORAGE_KEY as payslip-generator-state', () => {
      expect(STORAGE_KEY).toBe('payslip-generator-state');
    });

    it('should save state to localStorage after debounce delay', () => {
      const { result } = renderHook(() => usePersistentState(TEST_INITIAL_STATE));

      // Update state
      act(() => {
        const [, setState] = result.current;
        setState({ ...TEST_INITIAL_STATE, company: { name: 'Updated Corp', address: '789 New St' } });
      });

      // Before debounce: localStorage should not have the updated state yet
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();

      // Advance timers past debounce delay
      act(() => {
        vi.advanceTimersByTime(DEBOUNCE_MS + 50);
      });

      // After debounce: localStorage should have the updated state
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      expect(saved.company.name).toBe('Updated Corp');
    });

    it('should debounce multiple rapid state changes', () => {
      const { result } = renderHook(() => usePersistentState(TEST_INITIAL_STATE));

      // Rapid state changes
      act(() => {
        const [, setState] = result.current;
        setState({ ...TEST_INITIAL_STATE, company: { name: 'First', address: '1st' } });
      });

      act(() => {
        vi.advanceTimersByTime(200);
      });

      act(() => {
        const [, setState] = result.current;
        setState({ ...TEST_INITIAL_STATE, company: { name: 'Second', address: '2nd' } });
      });

      act(() => {
        vi.advanceTimersByTime(200);
      });

      act(() => {
        const [, setState] = result.current;
        setState({ ...TEST_INITIAL_STATE, company: { name: 'Third', address: '3rd' } });
      });

      // Advance past debounce for the last change
      act(() => {
        vi.advanceTimersByTime(DEBOUNCE_MS + 50);
      });

      // Only the final state should be saved
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      expect(saved.company.name).toBe('Third');
    });

    it('should use JSON serialization for persistence', () => {
      const { result } = renderHook(() => usePersistentState(TEST_INITIAL_STATE));

      act(() => {
        vi.advanceTimersByTime(DEBOUNCE_MS + 50);
      });

      const raw = localStorage.getItem(STORAGE_KEY);
      // Verify it's valid JSON
      expect(() => JSON.parse(raw)).not.toThrow();
      // Verify round-trip produces equivalent object
      expect(JSON.parse(raw)).toEqual(TEST_INITIAL_STATE);
    });
  });

  // --- Requirement 5.5: Reset to defaults function ---
  describe('resetState', () => {
    it('should reset state to initialState', () => {
      const savedState = { company: { name: 'Saved Corp', address: 'Saved' }, employee: { name: 'Saved', position: 'Saved' } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));

      const { result } = renderHook(() => usePersistentState(TEST_INITIAL_STATE));

      // Verify saved state was restored
      expect(result.current[0]).toEqual(savedState);

      // Reset
      act(() => {
        const [, , resetState] = result.current;
        resetState();
      });

      // State should be back to initialState
      expect(result.current[0]).toEqual(TEST_INITIAL_STATE);
    });

    it('should clear localStorage on reset', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ some: 'data' }));

      const { result } = renderHook(() => usePersistentState(TEST_INITIAL_STATE));

      act(() => {
        const [, , resetState] = result.current;
        resetState();
      });

      // localStorage should be cleared immediately by resetState
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    });

    it('should return a stable resetState function reference', () => {
      const { result, rerender } = renderHook(() => usePersistentState(TEST_INITIAL_STATE));

      const resetFn1 = result.current[2];
      rerender();
      const resetFn2 = result.current[2];

      expect(resetFn1).toBe(resetFn2);
    });
  });

  // --- Error handling: localStorage write failures ---
  describe('localStorage error handling', () => {
    it('should handle localStorage.setItem failure gracefully', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = vi.fn(() => {
        throw new Error('QuotaExceededError');
      });

      const { result } = renderHook(() => usePersistentState(TEST_INITIAL_STATE));

      act(() => {
        const [, setState] = result.current;
        setState({ ...TEST_INITIAL_STATE, company: { name: 'New', address: 'New' } });
      });

      act(() => {
        vi.advanceTimersByTime(DEBOUNCE_MS + 50);
      });

      // Should have logged the error, not thrown
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to save state:', expect.any(Error));

      // State should still be updated in memory
      expect(result.current[0].company.name).toBe('New');

      Storage.prototype.setItem = originalSetItem;
      consoleErrorSpy.mockRestore();
    });
  });

  // --- Return value shape ---
  describe('return value', () => {
    it('should return an array of [state, setState, resetState]', () => {
      const { result } = renderHook(() => usePersistentState(TEST_INITIAL_STATE));
      const returnValue = result.current;

      expect(Array.isArray(returnValue)).toBe(true);
      expect(returnValue).toHaveLength(3);
      expect(typeof returnValue[0]).toBe('object'); // state
      expect(typeof returnValue[1]).toBe('function'); // setState
      expect(typeof returnValue[2]).toBe('function'); // resetState
    });
  });
});
