import { describe, expect } from 'vitest';
import { test, fc } from '@fast-check/vitest';
import { generateRandomData } from '../randomData';

// Feature: educator-license, Property 1: Random data generation validity
// **Validates: Requirements 1.3**
//
// For any invocation of generateRandomData(), the returned object's educatorLicense
// section SHALL contain all required fields (stateName, departmentName, licenseType,
// licenseeName, issuedToId, licenseNumber, issueDate, validFor, teachingAreas,
// renewalRequirements, certificateNumber, signatories) with non-empty values,
// teachingAreas as a non-empty array where each item has a non-empty area string
// and structured endorsements, and signatories as an array of exactly 3 items.

describe('Property 1: 随机数据生成有效性', () => {
  // Use fc.constant(undefined) as a dummy arbitrary to drive multiple iterations.
  // generateRandomData() uses Math.random() internally, so each call produces
  // different output without needing fast-check generators for input.

  test.prop(
    [fc.constant(undefined)],
    { numRuns: 100 }
  )(
    'educatorLicense exists and is a non-null object',
    () => {
      const data = generateRandomData();
      expect(data).toBeDefined();
      expect(data.educatorLicense).toBeDefined();
      expect(typeof data.educatorLicense).toBe('object');
      expect(data.educatorLicense).not.toBeNull();
    }
  );

  test.prop(
    [fc.constant(undefined)],
    { numRuns: 100 }
  )(
    'all required string fields are present and non-empty',
    () => {
      const { educatorLicense } = generateRandomData();

      const requiredStringFields = [
        'stateName',
        'departmentName',
        'licenseType',
        'licenseeName',
        'issuedToId',
        'licenseNumber',
        'issueDate',
        'validFor',
        'renewalRequirements',
        'certificateNumber',
      ];

      for (const field of requiredStringFields) {
        expect(educatorLicense).toHaveProperty(field);
        expect(typeof educatorLicense[field]).toBe('string');
        expect(educatorLicense[field].length).toBeGreaterThan(0);
      }
    }
  );

  test.prop(
    [fc.constant(undefined)],
    { numRuns: 100 }
  )(
    'teachingAreas is a non-empty array with valid items and structured endorsements',
    () => {
      const { educatorLicense } = generateRandomData();

      expect(Array.isArray(educatorLicense.teachingAreas)).toBe(true);
      expect(educatorLicense.teachingAreas.length).toBeGreaterThan(0);

      for (const item of educatorLicense.teachingAreas) {
        // Each teaching area must have a non-empty area string
        expect(typeof item.area).toBe('string');
        expect(item.area.length).toBeGreaterThan(0);

        // Each teaching area must have an endorsements array
        expect(Array.isArray(item.endorsements)).toBe(true);
        expect(item.endorsements.length).toBeGreaterThan(0);

        // Each endorsement must be a structured object
        for (const end of item.endorsements) {
          expect(typeof end).toBe('object');
          expect(typeof end.subject).toBe('string');
          expect(end.subject.length).toBeGreaterThan(0);
          expect(typeof end.gradeLevel).toBe('string');
          expect(end.gradeLevel.length).toBeGreaterThan(0);
          expect(typeof end.date).toBe('string');
          expect(end.date.length).toBeGreaterThan(0);
        }
      }
    }
  );

  test.prop(
    [fc.constant(undefined)],
    { numRuns: 100 }
  )(
    'signatories is an array of exactly 3 items each with non-empty name and title',
    () => {
      const { educatorLicense } = generateRandomData();

      expect(Array.isArray(educatorLicense.signatories)).toBe(true);
      expect(educatorLicense.signatories).toHaveLength(3);

      for (const signatory of educatorLicense.signatories) {
        expect(typeof signatory.name).toBe('string');
        expect(signatory.name.length).toBeGreaterThan(0);

        expect(typeof signatory.title).toBe('string');
        expect(signatory.title.length).toBeGreaterThan(0);
      }
    }
  );
});
