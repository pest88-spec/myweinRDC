import { describe, expect } from 'vitest';
import { test, fc } from '@fast-check/vitest';
import {
  validateImageDimensions,
  MAX_IMAGE_DIMENSION,
} from '../PhotoUploader';

// Feature: payslip-generator-overhaul, Property 5: Photo dimension validation
// **Validates: Requirements 4.5**
//
// For any image dimensions (width, height), when width ≤ 4096 AND height ≤ 4096,
// the Photo_Uploader SHALL accept the image; otherwise it SHALL reject it.
//
// The PhotoUploader component delegates dimension checking to the pure function
// `validateImageDimensions(width, height)` which returns true when both dimensions
// are within the allowed limit (MAX_IMAGE_DIMENSION = 4096) and false otherwise.

describe('Property 5: Photo dimension validation', () => {
  // Generator for valid dimensions: 1 to MAX_IMAGE_DIMENSION (4096)
  const validDimension = fc.integer({ min: 1, max: MAX_IMAGE_DIMENSION });

  // Generator for oversized dimensions: MAX_IMAGE_DIMENSION + 1 to 8192
  const oversizedDimension = fc.integer({
    min: MAX_IMAGE_DIMENSION + 1,
    max: 8192,
  });

  // Generator for any positive dimension in a wide range
  const anyDimension = fc.integer({ min: 1, max: 8192 });

  test.prop([validDimension, validDimension], { numRuns: 100 })(
    'accepts images when both width and height are within the limit',
    (width, height) => {
      expect(validateImageDimensions(width, height)).toBe(true);
    }
  );

  test.prop([oversizedDimension, anyDimension], { numRuns: 100 })(
    'rejects images when width exceeds the limit',
    (width, height) => {
      expect(validateImageDimensions(width, height)).toBe(false);
    }
  );

  test.prop([anyDimension, oversizedDimension], { numRuns: 100 })(
    'rejects images when height exceeds the limit',
    (width, height) => {
      expect(validateImageDimensions(width, height)).toBe(false);
    }
  );

  test.prop([oversizedDimension, oversizedDimension], { numRuns: 100 })(
    'rejects images when both width and height exceed the limit',
    (width, height) => {
      expect(validateImageDimensions(width, height)).toBe(false);
    }
  );

  test.prop([anyDimension, anyDimension], { numRuns: 200 })(
    'accept/reject decision matches the specification for any dimensions',
    (width, height) => {
      const result = validateImageDimensions(width, height);
      const expected =
        width <= MAX_IMAGE_DIMENSION && height <= MAX_IMAGE_DIMENSION;
      expect(result).toBe(expected);
    }
  );
});
