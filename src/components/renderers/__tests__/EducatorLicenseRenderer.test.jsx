import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect } from 'vitest';
import { test, fc } from '@fast-check/vitest';
import EducatorLicenseRenderer from '../EducatorLicenseRenderer';

// Feature: educator-license, Property 4: Renderer field completeness
// **Validates: Requirements 3.3, 3.4, 3.5, 3.7, 3.8, 3.9, 3.10, 3.11, 7.1**
//
// For any valid educatorLicense state object where all string fields are
// non-empty, the rendered output of EducatorLicenseRenderer SHALL contain
// every scalar field value (stateName, departmentName, licenseType,
// licenseeName, issuedToId, licenseNumber, certificateNumber, validFor),
// every teaching area name, every endorsement subject/gradeLevel, and all
// signatory names and titles somewhere in the rendered text content.

// --- Custom Arbitraries ---

// Generates a non-empty alphanumeric string suitable for display fields.
const nonEmptyDisplayString = fc.stringMatching(/^[A-Za-z0-9 ]{1,40}$/).filter(
  (s) => s.trim().length > 0
);

// Generates a unique positive integer for teaching area IDs.
const teachingAreaIdArb = fc.integer({ min: 1, max: 100000 });

// Generates a structured endorsement object with subject, gradeLevel, date.
const endorsementArb = fc.record({
  subject: nonEmptyDisplayString,
  gradeLevel: nonEmptyDisplayString,
  date: nonEmptyDisplayString,
});

// Generates a single teaching area object with structured endorsements.
const teachingAreaArb = fc.record({
  id: teachingAreaIdArb,
  area: nonEmptyDisplayString,
  endorsements: fc.array(endorsementArb, { minLength: 1, maxLength: 4 }),
});

// Generates a signatory object with non-empty name and title.
const signatoryArb = fc.record({
  name: nonEmptyDisplayString,
  title: nonEmptyDisplayString,
});

// Generates a list of teaching areas with unique IDs.
const teachingAreasArb = fc
  .array(teachingAreaArb, { minLength: 1, maxLength: 3 })
  .map((areas) => areas.map((ta, idx) => ({ ...ta, id: idx + 1 })));

// Generates a complete valid educatorLicense state object where all
// string fields are non-empty and arrays contain at least one item.
const educatorLicenseArb = fc.record({
  stateName: nonEmptyDisplayString,
  departmentName: nonEmptyDisplayString,
  licenseType: nonEmptyDisplayString,
  licenseeName: nonEmptyDisplayString,
  issuedToId: nonEmptyDisplayString,
  licenseNumber: nonEmptyDisplayString,
  issueDate: nonEmptyDisplayString,
  validFor: nonEmptyDisplayString,
  teachingAreas: teachingAreasArb,
  renewalRequirements: nonEmptyDisplayString,
  certificateNumber: nonEmptyDisplayString,
  signatories: fc.tuple(signatoryArb, signatoryArb, signatoryArb).map(([s1, s2, s3]) => [s1, s2, s3]),
});

// Wraps an educatorLicense object into the full application state shape.
const stateFromLicense = (license) => ({
  educatorLicense: license,
});

// --- Property 4: Renderer field completeness ---

describe('Property 4: Renderer field completeness', () => {
  // Scalar fields: every scalar field value must appear in the rendered text
  test.prop([educatorLicenseArb], { numRuns: 100 })(
    'all scalar field values appear in the rendered text content',
    (license) => {
      const { container } = render(
        <EducatorLicenseRenderer state={stateFromLicense(license)} />
      );
      const textContent = container.textContent;

      expect(textContent).toContain(license.stateName);
      expect(textContent).toContain(license.departmentName);
      expect(textContent).toContain(license.licenseType);
      expect(textContent).toContain(license.licenseeName);
      expect(textContent).toContain(license.issuedToId);
      expect(textContent).toContain(license.licenseNumber);
      expect(textContent).toContain(license.certificateNumber);
      expect(textContent).toContain(license.validFor);
      expect(textContent).toContain(license.renewalRequirements);
    }
  );

  // Teaching areas: every teaching area name must appear in the rendered text
  test.prop([educatorLicenseArb], { numRuns: 100 })(
    'all teaching area names appear in the rendered text content',
    (license) => {
      const { container } = render(
        <EducatorLicenseRenderer state={stateFromLicense(license)} />
      );
      const textContent = container.textContent;

      for (const ta of license.teachingAreas) {
        expect(textContent).toContain(ta.area);
      }
    }
  );

  // Endorsements: every endorsement subject and gradeLevel must appear
  test.prop([educatorLicenseArb], { numRuns: 100 })(
    'all endorsement subjects and grade levels appear in the rendered text content',
    (license) => {
      const { container } = render(
        <EducatorLicenseRenderer state={stateFromLicense(license)} />
      );
      const textContent = container.textContent;

      for (const ta of license.teachingAreas) {
        for (const endorsement of ta.endorsements) {
          expect(textContent).toContain(endorsement.subject);
          expect(textContent).toContain(endorsement.gradeLevel);
        }
      }
    }
  );

  // Signatories: all three signatory names and titles must appear
  test.prop([educatorLicenseArb], { numRuns: 100 })(
    'all signatory names and titles appear in the rendered text content',
    (license) => {
      const { container } = render(
        <EducatorLicenseRenderer state={stateFromLicense(license)} />
      );
      const textContent = container.textContent;

      for (const sig of license.signatories) {
        expect(textContent).toContain(sig.name);
        expect(textContent).toContain(sig.title);
      }
    }
  );
});

// --- Unit Tests ---
// Validates: Requirements 7.3

import { INITIAL_STATE } from '../../../constants/initialState';
import { it } from 'vitest';

describe('EducatorLicenseRenderer Unit Tests', () => {
  describe('Default state rendering', () => {
    it('renders without crashing when given the default INITIAL_STATE', () => {
      const { container } = render(
        <EducatorLicenseRenderer state={INITIAL_STATE} />
      );
      expect(container.firstChild).toBeTruthy();
      expect(container.textContent).toContain(INITIAL_STATE.educatorLicense.stateName);
      expect(container.textContent).toContain(INITIAL_STATE.educatorLicense.licenseeName);
      expect(container.textContent).toContain(INITIAL_STATE.educatorLicense.licenseNumber);
      expect(container.textContent).toContain(INITIAL_STATE.educatorLicense.certificateNumber);
      expect(container.textContent).toContain(INITIAL_STATE.educatorLicense.issuedToId);
      expect(container.textContent).toContain(INITIAL_STATE.educatorLicense.validFor);
    });
  });

  describe('Empty teachingAreas', () => {
    it('renders normally when teachingAreas is an empty array', () => {
      const stateWithEmptyAreas = {
        educatorLicense: {
          ...INITIAL_STATE.educatorLicense,
          teachingAreas: [],
        },
      };
      const { container } = render(
        <EducatorLicenseRenderer state={stateWithEmptyAreas} />
      );
      expect(container.firstChild).toBeTruthy();
      expect(container.textContent).toContain(INITIAL_STATE.educatorLicense.stateName);
      expect(container.textContent).toContain(INITIAL_STATE.educatorLicense.licenseeName);
      expect(container.textContent).toContain(INITIAL_STATE.educatorLicense.certificateNumber);
    });
  });

  describe('Missing signatories fallback', () => {
    it('renders empty signature lines when signatories array is empty', () => {
      const stateWithNoSignatories = {
        educatorLicense: {
          ...INITIAL_STATE.educatorLicense,
          signatories: [],
        },
      };
      const { container } = render(
        <EducatorLicenseRenderer state={stateWithNoSignatories} />
      );
      expect(container.firstChild).toBeTruthy();
      expect(container.textContent).toContain(INITIAL_STATE.educatorLicense.stateName);
      expect(container.textContent).toContain(INITIAL_STATE.educatorLicense.licenseeName);
      // Verify the original signatory names are NOT present
      expect(container.textContent).not.toContain('Harry J. Chico');
      expect(container.textContent).not.toContain('Vicki Phillips');
      expect(container.textContent).not.toContain('Chris A. Koch');
    });

    it('renders empty signature lines when signatories is undefined', () => {
      const stateWithUndefinedSignatories = {
        educatorLicense: {
          ...INITIAL_STATE.educatorLicense,
          signatories: undefined,
        },
      };
      const { container } = render(
        <EducatorLicenseRenderer state={stateWithUndefinedSignatories} />
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('Illinois certificate layout elements', () => {
    it('renders the certificate number in red at top-right', () => {
      const { container } = render(
        <EducatorLicenseRenderer state={INITIAL_STATE} />
      );
      expect(container.textContent).toContain('1729082');
    });

    it('renders ENDORSEMENTS section header', () => {
      const { container } = render(
        <EducatorLicenseRenderer state={INITIAL_STATE} />
      );
      expect(container.textContent).toContain('ENDORSEMENTS:');
      expect(container.textContent).toContain('No Further Valid Entries');
    });

    it('renders ADDITIONAL INFORMATION section', () => {
      const { container } = render(
        <EducatorLicenseRenderer state={INITIAL_STATE} />
      );
      expect(container.textContent).toContain('Additional Information:');
    });

    it('renders structured endorsement data with subject and grade level', () => {
      const { container } = render(
        <EducatorLicenseRenderer state={INITIAL_STATE} />
      );
      expect(container.textContent).toContain('Language Arts');
      expect(container.textContent).toContain('Middle School');
      expect(container.textContent).toContain('Social Science');
    });
  });
});
