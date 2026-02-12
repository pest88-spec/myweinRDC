import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, expect, vi, afterEach } from 'vitest';
import { test, fc } from '@fast-check/vitest';
import InputGroup from '../InputGroup';

// Feature: payslip-generator-overhaul
// Property-based tests for form validation (Task 8.3)
// **Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5**

// --- Custom Arbitraries ---

// Generates finite numeric values suitable for number input fields.
// Excludes NaN, Infinity, and -0 (which does not survive string conversion roundtrip).
const finiteNumber = fc.double({
  noNaN: true,
  noDefaultInfinity: true,
  min: -1e12,
  max: 1e12,
}).filter(n => !Object.is(n, -0));

// Generates non-numeric strings that are not empty and not a lone minus sign.
// These are strings where Number(s) returns NaN.
const nonNumericString = fc.string({ minLength: 1 })
  .filter(s => {
    // Must not be empty, not a lone minus, and must be truly non-numeric
    if (s === '' || s === '-') return false;
    return isNaN(Number(s));
  });

// Generates strictly negative numbers (< 0) for negative amount warning tests.
const negativeNumber = fc.oneof(
  fc.double({ noNaN: true, noDefaultInfinity: true, min: -1e12, max: -0.01 }),
  fc.integer({ min: -1000000, max: -1 })
);

// Generates whitespace-only strings (including empty string) for required field tests.
// Uses array of whitespace chars joined into a string since fc.stringOf is not available in v4.
const whitespaceOnlyString = fc.array(
  fc.constantFrom(' ', '\t', '\n'),
  { minLength: 0, maxLength: 20 }
).map(arr => arr.join(''));

// --- Property 7: Numeric input conversion ---
// **Validates: Requirements 6.1**
//
// For any valid numeric string (like "123", "45.67", "-89"), the number type
// input field's onChange handler SHALL convert it to the corresponding Number
// type value.
describe('Property 7: Numeric input conversion', () => {
  test.prop(
    [finiteNumber],
    { numRuns: 100 }
  )(
    'onChange receives Number type value for any valid numeric input',
    (num) => {
      const strValue = String(num);
      // Verify the string is actually a valid number (sanity check)
      const parsed = Number(strValue);
      if (isNaN(parsed)) return; // Skip if string conversion produces NaN

      const onChange = vi.fn();
      // Use empty string as initial value to ensure JSDOM always detects a value
      // change and fires the event (avoids no-op when value is already the same).
      const { unmount } = render(
        <InputGroup label="Amount" value="" onChange={onChange} type="number" />
      );
      const input = screen.getByLabelText('Amount');

      fireEvent.change(input, { target: { value: strValue } });

      // onChange must have been called
      expect(onChange).toHaveBeenCalled();
      const receivedValue = onChange.mock.calls[0][0];

      // The received value must be of type 'number'
      expect(typeof receivedValue).toBe('number');

      // The received value must equal the original number
      expect(receivedValue).toBe(parsed);

      unmount();
    }
  );

  test.prop(
    [fc.integer({ min: -100000, max: 100000 })],
    { numRuns: 100 }
  )(
    'onChange receives exact integer value for any integer input string',
    (intVal) => {
      const strValue = String(intVal);
      const onChange = vi.fn();
      // Use a sentinel initial value that differs from any generated integer
      // to ensure JSDOM always detects a value change and fires the event.
      const { unmount } = render(
        <InputGroup label="Count" value="" onChange={onChange} type="number" />
      );
      const input = screen.getByLabelText('Count');

      fireEvent.change(input, { target: { value: strValue } });

      expect(onChange).toHaveBeenCalledWith(intVal);
      expect(typeof onChange.mock.calls[0][0]).toBe('number');

      unmount();
    }
  );
});

// --- Property 8: Non-numeric input rejection ---
// **Validates: Requirements 6.2**
//
// For any non-numeric string (like "abc", "12.34.56", "$100"), the number type
// input field SHALL block the input, keeping the field value unchanged.
//
// Note: In JSDOM, type="number" inputs sanitize invalid values to empty string.
// The component's isNaN guard handles the case where a non-numeric string reaches
// the handler. We verify that onChange is NEVER called with a non-numeric string
// value — it is either not called at all, or called with '' (JSDOM sanitization),
// '-' (lone minus), or a valid number.
describe('Property 8: Non-numeric input rejection', () => {
  test.prop(
    [nonNumericString],
    { numRuns: 100 }
  )(
    'onChange is never called with a non-numeric string value for number type input',
    (invalidStr) => {
      const onChange = vi.fn();
      const { unmount } = render(
        <InputGroup label="Amount" value={42} onChange={onChange} type="number" />
      );
      const input = screen.getByLabelText('Amount');

      fireEvent.change(input, { target: { value: invalidStr } });

      // onChange should either not be called, or if called (due to JSDOM sanitization
      // converting invalid values to ''), the value must NOT be the non-numeric string.
      // Acceptable values: not called, '' (empty/clear), '-' (lone minus), or a number.
      if (onChange.mock.calls.length > 0) {
        const receivedValue = onChange.mock.calls[0][0];
        // The received value must never be the original non-numeric string
        expect(receivedValue).not.toBe(invalidStr);
        // It must be one of: empty string, lone minus, or a number
        const isAcceptable =
          receivedValue === '' ||
          receivedValue === '-' ||
          typeof receivedValue === 'number';
        expect(isAcceptable).toBe(true);
      }
      // If onChange was not called at all, the input was correctly blocked

      unmount();
    }
  );

  test.prop(
    [nonNumericString],
    { numRuns: 100 }
  )(
    'non-numeric input never produces a non-numeric string in onChange callback',
    (invalidStr) => {
      const onChange = vi.fn();
      const { unmount } = render(
        <InputGroup label="Price" value={0} onChange={onChange} type="number" />
      );
      const input = screen.getByLabelText('Price');

      fireEvent.change(input, { target: { value: invalidStr } });

      // Verify: if onChange was called, the value type is never a non-numeric string
      for (const call of onChange.mock.calls) {
        const val = call[0];
        if (typeof val === 'string') {
          // Only '' and '-' are acceptable string values from number handler
          expect(val === '' || val === '-').toBe(true);
        }
      }

      unmount();
    }
  );
});

// --- Property 9: Negative number warning ---
// **Validates: Requirements 6.3**
//
// For any negative number input to an amount field, the Form_Validator SHALL
// produce a warning state (error is non-empty).
describe('Property 9: Negative number warning', () => {
  test.prop(
    [negativeNumber],
    { numRuns: 100 }
  )(
    'negative number input produces a warning state with non-empty error',
    (negNum) => {
      const strValue = String(negNum);
      // Verify the string is a valid negative number
      const parsed = Number(strValue);
      if (isNaN(parsed) || parsed >= 0) return;

      const onChange = vi.fn();
      const { unmount } = render(
        <InputGroup label="Amount" value={0} onChange={onChange} type="number" />
      );
      const input = screen.getByLabelText('Amount');

      fireEvent.change(input, { target: { value: strValue } });

      // A warning alert must be present
      const alert = screen.getByRole('alert');
      expect(alert).toBeDefined();
      expect(alert.textContent).toBe('Value is negative');

      // The input must have the error class
      expect(input.className).toContain('input-error');

      // aria-invalid must be set to true
      expect(input.getAttribute('aria-invalid')).toBe('true');

      unmount();
    }
  );

  test.prop(
    [fc.integer({ min: -1000000, max: -1 })],
    { numRuns: 100 }
  )(
    'negative integer input always triggers warning state',
    (negInt) => {
      const onChange = vi.fn();
      const { unmount } = render(
        <InputGroup label="Salary" value={0} onChange={onChange} type="number" />
      );
      const input = screen.getByLabelText('Salary');

      fireEvent.change(input, { target: { value: String(negInt) } });

      // Warning must be displayed
      expect(screen.getByRole('alert')).toBeDefined();
      expect(screen.getByText('Value is negative')).toBeDefined();

      unmount();
    }
  );
});

// --- Property 10: Required field whitespace validation ---
// **Validates: Requirements 6.4, 6.5**
//
// For any whitespace-only string (empty or containing only spaces/tabs),
// when input to a required field, the Form_Validator SHALL produce a
// validation error state.
describe('Property 10: Required field whitespace validation', () => {
  test.prop(
    [whitespaceOnlyString],
    { numRuns: 100 }
  )(
    'whitespace-only input to required field produces validation error',
    (wsStr) => {
      const onChange = vi.fn();
      const { unmount } = render(
        <InputGroup
          label="Employee Name"
          value="John"
          onChange={onChange}
          type="text"
          required={true}
        />
      );
      const input = screen.getByLabelText('Employee Name');

      fireEvent.change(input, { target: { value: wsStr } });

      // Validation error must be present
      const alert = screen.getByRole('alert');
      expect(alert).toBeDefined();
      expect(alert.textContent).toBe('This field is required');

      // The input must have the error class
      expect(input.className).toContain('input-error');

      // aria-invalid must be set to true
      expect(input.getAttribute('aria-invalid')).toBe('true');

      unmount();
    }
  );

  test.prop(
    [whitespaceOnlyString],
    { numRuns: 100 }
  )(
    'whitespace-only input to required field always calls onChange and sets error state',
    (wsStr) => {
      cleanup();
      const onChange = vi.fn();
      const { unmount } = render(
        <InputGroup
          label="Company Name"
          value="Acme Corp"
          onChange={onChange}
          type="text"
          required={true}
        />
      );
      const input = screen.getByLabelText('Company Name');

      fireEvent.change(input, { target: { value: wsStr } });

      // onChange must be called (value passes through, but error state is set).
      // Note: JSDOM normalizes newlines in input values, so the actual value
      // received by onChange may differ from wsStr (e.g., "\n" becomes "").
      // The key property is that onChange IS called and the value is still
      // whitespace-only (or empty after normalization).
      expect(onChange).toHaveBeenCalled();
      const receivedValue = onChange.mock.calls[0][0];
      // The received value must be whitespace-only or empty (after DOM normalization)
      expect(receivedValue.trim()).toBe('');

      // Error state must be present
      expect(screen.getByRole('alert')).toBeDefined();

      unmount();
    }
  );
});
