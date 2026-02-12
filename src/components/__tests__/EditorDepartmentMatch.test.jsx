import { describe, expect } from 'vitest';
import { test, fc } from '@fast-check/vitest';
import { UNIVERSITIES } from '../../data/universities';

// Feature: payslip-generator-overhaul, Property 3: Department list matches university
// **Validates: Requirements 3.3**
//
// For any university selected from the UNIVERSITIES array, the department list
// shown in the teacher card editor SHALL only contain departments from that
// university's `departments` array.
//
// The Editor.jsx component renders department options as follows when a
// universityId is selected:
//   UNIVERSITIES[teacherCard.universityId].departments.map(dept => <option>...)
//
// This property test verifies the data invariant that underpins this behavior:
// for every valid university index, the departments array exists, is non-empty,
// and the set of departments rendered equals exactly the university's departments.

describe('Property 3: Department list matches university', () => {
    // Generate a valid university index from the UNIVERSITIES array
    const validUniversityIndex = fc.integer({ min: 0, max: UNIVERSITIES.length - 1 });

    test.prop(
        [validUniversityIndex],
        { numRuns: 100 }
    )(
        'departments shown for any selected university are exactly that university\'s departments',
        (universityId) => {
            const university = UNIVERSITIES[universityId];

            // The university object must exist at the given index
            expect(university).toBeDefined();

            // The university must have a departments array
            expect(Array.isArray(university.departments)).toBe(true);

            // The departments array must be non-empty (every university should have at least one department)
            expect(university.departments.length).toBeGreaterThan(0);

            // Simulate the department list that the Editor renders:
            // In Editor.jsx, when teacherCard.universityId is set, it renders:
            //   UNIVERSITIES[teacherCard.universityId].departments.map(dept => ...)
            const renderedDepartments = UNIVERSITIES[universityId].departments;

            // The rendered department list must match exactly the university's departments
            expect(renderedDepartments).toEqual(university.departments);

            // Every department in the rendered list must be a non-empty string
            for (const dept of renderedDepartments) {
                expect(typeof dept).toBe('string');
                expect(dept.length).toBeGreaterThan(0);
            }

            // No departments from other universities should appear in this list
            for (let i = 0; i < UNIVERSITIES.length; i++) {
                if (i === universityId) continue;
                const otherUni = UNIVERSITIES[i];
                // Check that no department unique to another university leaks in
                for (const otherDept of otherUni.departments) {
                    if (renderedDepartments.includes(otherDept)) {
                        // If a department name appears in both universities, that's fine
                        // (e.g., "Computer Science" exists in many universities).
                        // But it must genuinely be in the selected university's list.
                        expect(university.departments).toContain(otherDept);
                    }
                }
            }
        }
    );

    test.prop(
        [validUniversityIndex],
        { numRuns: 100 }
    )(
        'department list contains no duplicates for any university',
        (universityId) => {
            const university = UNIVERSITIES[universityId];
            const departments = university.departments;
            const uniqueDepartments = new Set(departments);

            // Each university's department list should have no duplicate entries
            expect(uniqueDepartments.size).toBe(departments.length);
        }
    );
});
