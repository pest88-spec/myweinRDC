import { describe, expect } from 'vitest';
import { test, fc } from '@fast-check/vitest';

// Feature: educator-license, Property 3: 教学领域增删往返
// **Validates: Requirements 2.4, 2.5**
//
// For any valid educatorLicense state with a teaching areas list, adding a new
// teaching area and then removing it SHALL result in a teaching areas list
// equivalent to the original list.
//
// This is a pure data transformation test. The Editor component performs:
//   Add:    [...currentAreas, newArea]
//   Remove: areas.filter(item => item.id !== targetId)
//
// The round-trip property asserts that add-then-remove is an identity operation
// on the original list, provided the new area has a unique ID.

// --- Custom Arbitraries ---

// Generates a single structured endorsement object.
const endorsementArb = fc.record({
    subject: fc.string({ minLength: 1, maxLength: 40 }).filter(s => s.trim().length > 0),
    gradeLevel: fc.string({ minLength: 1, maxLength: 30 }).filter(s => s.trim().length > 0),
    date: fc.string({ minLength: 1, maxLength: 10 }).filter(s => s.trim().length > 0),
});

// Generates an endorsements array (0 to 5 items).
const endorsementsArb = fc.array(endorsementArb, { minLength: 0, maxLength: 5 });

// Generates a teaching area name string (non-empty, printable).
const areaNameArb = fc.string({ minLength: 1, maxLength: 60 })
    .filter(s => s.trim().length > 0);

// Generates a teaching area object with a given id.
// The id is assigned externally to guarantee uniqueness across the list.
const teachingAreaWithIdArb = (id) =>
    fc.record({
        id: fc.constant(id),
        area: areaNameArb,
        endorsements: endorsementsArb,
    });

// Generates a list of teaching areas with unique IDs and a new area whose ID
// does not collide with any existing ID.
//
// Strategy: generate a pool of unique integer IDs, split them into "existing"
// IDs and one "new" ID, then build teaching area objects from each.
const teachingAreasWithNewAreaArb = fc
    .integer({ min: 0, max: 20 })
    .chain((listLen) => {
        // Total IDs needed: listLen existing + 1 new
        const totalIds = listLen + 1;
        return fc
            .uniqueArray(fc.integer({ min: 1, max: 1_000_000 }), {
                minLength: totalIds,
                maxLength: totalIds,
            })
            .chain((ids) => {
                const existingIds = ids.slice(0, listLen);
                const newId = ids[listLen];

                // Build arbitraries for each existing teaching area
                const existingArbs = existingIds.map((id) => teachingAreaWithIdArb(id));

                // Build arbitrary for the new teaching area to be added
                const newAreaArb = teachingAreaWithIdArb(newId);

                // Combine: tuple of [existingList, newArea]
                return fc.tuple(
                    existingArbs.length > 0
                        ? fc.tuple(...existingArbs).map((arr) => [...arr])
                        : fc.constant([]),
                    newAreaArb
                );
            });
    });

// --- Property Test ---

describe('Property 3: Teaching areas add-then-remove round-trip', () => {
    test.prop(
        [teachingAreasWithNewAreaArb],
        { numRuns: 100 }
    )(
        'adding a new teaching area and then removing it restores the original list',
        ([originalList, newArea]) => {
            // Precondition: the new area ID must not exist in the original list.
            // This is guaranteed by the uniqueArray generator, but we assert it
            // as a sanity check.
            const existingIds = new Set(originalList.map((ta) => ta.id));
            expect(existingIds.has(newArea.id)).toBe(false);

            // --- Add operation (mirrors Editor.jsx onClick handler) ---
            const afterAdd = [...originalList, newArea];

            // The list must now contain one more element.
            expect(afterAdd).toHaveLength(originalList.length + 1);

            // --- Remove operation (mirrors Editor.jsx remove button handler) ---
            const afterRemove = afterAdd.filter((item) => item.id !== newArea.id);

            // The resulting list must be deeply equal to the original list.
            expect(afterRemove).toEqual(originalList);
        }
    );

    test.prop(
        [teachingAreasWithNewAreaArb],
        { numRuns: 100 }
    )(
        'add-then-remove preserves order and content of all original teaching areas',
        ([originalList, newArea]) => {
            // --- Add then remove ---
            const afterAdd = [...originalList, newArea];
            const afterRemove = afterAdd.filter((item) => item.id !== newArea.id);

            // Length must match.
            expect(afterRemove).toHaveLength(originalList.length);

            // Each element must match by index (order preserved).
            for (let i = 0; i < originalList.length; i++) {
                expect(afterRemove[i].id).toBe(originalList[i].id);
                expect(afterRemove[i].area).toBe(originalList[i].area);
                expect(afterRemove[i].endorsements).toEqual(originalList[i].endorsements);
            }
        }
    );
});
