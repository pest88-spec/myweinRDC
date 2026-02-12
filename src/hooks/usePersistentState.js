import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * localStorage key used to persist application state.
 * Exported for testing purposes.
 */
export const STORAGE_KEY = 'payslip-generator-state';

/**
 * Debounce delay in milliseconds before saving state to localStorage.
 * Exported for testing purposes.
 */
export const DEBOUNCE_MS = 500;

/**
 * Custom React hook that persists state to localStorage with debounced saving.
 *
 * On initialization, attempts to restore state from localStorage.
 * If saved data is corrupted or parsing fails, clears the corrupted data
 * and falls back to the provided initialState.
 *
 * State changes are debounced (500ms) before being written to localStorage
 * to avoid excessive writes during rapid user input.
 *
 * @param {Object} initialState - The default state to use when no saved state exists
 * @returns {[Object, Function, Function]} A tuple of [state, setState, resetState]
 */
function usePersistentState(initialState) {
  // Store initialState in a ref so resetState always uses the original value
  // without needing it in the dependency array
  const initialStateRef = useRef(initialState);

  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge initialState defaults for any top-level keys missing from
        // the persisted data. This ensures newly added sections (e.g.
        // educatorLicense) are available without requiring a manual reset.
        return { ...initialState, ...parsed };
      }
    } catch (e) {
      // Corrupted data: clear it and fall back to initialState
      localStorage.removeItem(STORAGE_KEY);
    }
    return initialState;
  });

  // Debounced save to localStorage whenever state changes
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        console.error('Failed to save state:', e);
      }
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [state]);

  /**
   * Resets state to the original initialState and clears localStorage.
   */
  const resetState = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(initialStateRef.current);
  }, []);

  return [state, setState, resetState];
}

export default usePersistentState;
