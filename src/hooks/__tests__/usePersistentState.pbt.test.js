import { describe, expect, beforeEach } from 'vitest';
import { test, fc } from '@fast-check/vitest';
import { STORAGE_KEY } from '../usePersistentState';

// Feature: payslip-generator-overhaul, Property 6: State serialization roundtrip consistency
// **Validates: Requirements 5.2, 5.6, 5.7**
//
// For any valid application state object, JSON.parse(JSON.stringify(state))
// SHALL produce an object deeply equal to the original state.
//
// The usePersistentState hook serializes state via JSON.stringify before writing
// to localStorage, and deserializes via JSON.parse when restoring. This property
// ensures that no data is lost or corrupted during the serialization roundtrip.
//
// Additionally, the state must survive a full localStorage roundtrip:
// localStorage.setItem(key, JSON.stringify(state)) followed by
// JSON.parse(localStorage.getItem(key)) must produce an equivalent object.

// --- Custom Arbitraries matching the application state shape from initialState.js ---

// Generates a JSON-safe finite number (no NaN, no Infinity, no -0).
// JSON.stringify(-0) produces "0", so -0 does not survive roundtrip.
// Real application state values (currency amounts, rates, etc.) never use -0,
// so we filter it out to stay within the valid input domain.
const safeNumber = fc.double({ noNaN: true, noDefaultInfinity: true, min: -1e9, max: 1e9 })
  .filter(n => !Object.is(n, -0));

// Generates a non-negative integer for id fields
const idArb = fc.integer({ min: 1, max: 100000 });

// Company object arbitrary
const companyArb = fc.record({
  name: fc.string(),
  address: fc.string(),
  phone: fc.string(),
  email: fc.string(),
  website: fc.string(),
  logo: fc.string(),
  district: fc.string(),
  county: fc.string(),
});

// Bank object arbitrary
const bankArb = fc.record({
  bankName: fc.string(),
  accountNumber: fc.string(),
  routingNumber: fc.string(),
});

// Employee object arbitrary
const employeeArb = fc.record({
  name: fc.string(),
  address: fc.string(),
  cityStateZip: fc.string(),
  position: fc.string(),
  employeeId: fc.string(),
  taxCode: fc.string(),
  payRate: safeNumber,
  department: fc.string(),
  hireDate: fc.string(),
});

// Meta object arbitrary (all date-like strings)
const metaArb = fc.record({
  payDate: fc.string(),
  payPeriodStart: fc.string(),
  payPeriodEnd: fc.string(),
  payLocation: fc.string(),
  payCycle: fc.string(),
  adviceNumber: fc.string(),
  accrualDate: fc.string(),
});

// Earnings entry arbitrary
const earningsEntryArb = fc.record({
  id: idArb,
  description: fc.string(),
  quantity: safeNumber,
  rate: safeNumber,
  amount: safeNumber,
  ytd: safeNumber,
});

// Tax/deduction entry arbitrary (shared shape for taxes, preTaxReductions, deductions, employerContributions)
const deductionEntryArb = fc.record({
  id: idArb,
  description: fc.string(),
  amount: safeNumber,
  ytd: safeNumber,
});

// Taxable wage pair arbitrary
const wagePairArb = fc.record({
  current: safeNumber,
  ytd: safeNumber,
});

// Taxable wages arbitrary
const taxableWagesArb = fc.record({
  federal: wagePairArb,
  state: wagePairArb,
  medicare: wagePairArb,
});

// Check info arbitrary
const checkInfoArb = fc.record({
  netPay: safeNumber,
  netPayWords: fc.string(),
  maxValidAmount: safeNumber,
});

// Teacher card arbitrary (universityId is number | null)
const teacherCardArb = fc.record({
  universityId: fc.option(fc.integer({ min: 0, max: 50 }), { nil: null }),
  department: fc.string(),
  emergencyPhone: fc.string(),
  officeRoom: fc.string(),
  yearsOfService: fc.string(),
  validUntil: fc.string(),
});

// Full application state arbitrary matching initialState.js shape
const appStateArb = fc.record({
  company: companyArb,
  bank: bankArb,
  employee: employeeArb,
  meta: metaArb,
  earnings: fc.array(earningsEntryArb, { minLength: 0, maxLength: 10 }),
  taxes: fc.array(deductionEntryArb, { minLength: 0, maxLength: 10 }),
  preTaxReductions: fc.array(deductionEntryArb, { minLength: 0, maxLength: 10 }),
  deductions: fc.array(deductionEntryArb, { minLength: 0, maxLength: 10 }),
  employerContributions: fc.array(deductionEntryArb, { minLength: 0, maxLength: 10 }),
  taxableWages: taxableWagesArb,
  checkInfo: checkInfoArb,
  teacherCard: teacherCardArb,
});

describe('Property 6: State serialization roundtrip consistency', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Core property: JSON.parse(JSON.stringify(state)) deep-equals original state
  test.prop(
    [appStateArb],
    { numRuns: 100 }
  )(
    'JSON.parse(JSON.stringify(state)) produces an object deeply equal to the original state',
    (state) => {
      const serialized = JSON.stringify(state);
      const deserialized = JSON.parse(serialized);

      expect(deserialized).toEqual(state);
    }
  );

  // localStorage roundtrip: setItem + getItem + parse deep-equals original state
  test.prop(
    [appStateArb],
    { numRuns: 100 }
  )(
    'state survives a full localStorage roundtrip (setItem + getItem + parse)',
    (state) => {
      const serialized = JSON.stringify(state);
      localStorage.setItem(STORAGE_KEY, serialized);

      const retrieved = localStorage.getItem(STORAGE_KEY);
      const deserialized = JSON.parse(retrieved);

      expect(deserialized).toEqual(state);
    }
  );

  // Verify serialization preserves all top-level keys
  test.prop(
    [appStateArb],
    { numRuns: 100 }
  )(
    'serialization roundtrip preserves all top-level state keys',
    (state) => {
      const deserialized = JSON.parse(JSON.stringify(state));
      const originalKeys = Object.keys(state).sort();
      const deserializedKeys = Object.keys(deserialized).sort();

      expect(deserializedKeys).toEqual(originalKeys);
    }
  );

  // Verify array lengths are preserved through serialization
  test.prop(
    [appStateArb],
    { numRuns: 100 }
  )(
    'serialization roundtrip preserves array lengths for all collection fields',
    (state) => {
      const deserialized = JSON.parse(JSON.stringify(state));

      expect(deserialized.earnings.length).toBe(state.earnings.length);
      expect(deserialized.taxes.length).toBe(state.taxes.length);
      expect(deserialized.preTaxReductions.length).toBe(state.preTaxReductions.length);
      expect(deserialized.deductions.length).toBe(state.deductions.length);
      expect(deserialized.employerContributions.length).toBe(state.employerContributions.length);
    }
  );

  // Verify that null values (like teacherCard.universityId) survive roundtrip
  test.prop(
    [appStateArb],
    { numRuns: 100 }
  )(
    'serialization roundtrip preserves null values correctly',
    (state) => {
      const deserialized = JSON.parse(JSON.stringify(state));

      // If universityId was null, it must remain null after roundtrip
      if (state.teacherCard.universityId === null) {
        expect(deserialized.teacherCard.universityId).toBeNull();
      } else {
        expect(deserialized.teacherCard.universityId).toBe(state.teacherCard.universityId);
      }
    }
  );
});
