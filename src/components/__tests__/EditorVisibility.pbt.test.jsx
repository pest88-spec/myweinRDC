import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, expect, vi, afterEach } from 'vitest';
import { test, fc } from '@fast-check/vitest';
import Editor from '../Editor';
import { INITIAL_STATE } from '../../constants/initialState';

// Feature: educator-license, Property 2: 编辑器区域可见性
// **Validates: Requirements 2.2**
//
// For any docType value in the set ['payslip', 'tax', 'w2', 'employment', 'offer',
// 'faculty', 'teacherCard'] (all types except 'educatorLicense'), rendering the
// Editor with that docType SHALL NOT display the Educator License form section.
//
// The Editor component conditionally renders the educator license editing section
// only when docType === 'educatorLicense'. This property verifies that for every
// other document type, the educator license section headings and form fields are
// absent from the rendered output.

// All non-educatorLicense document types supported by the application
const NON_EDUCATOR_LICENSE_DOC_TYPES = [
    'payslip',
    'tax',
    'w2',
    'employment',
    'offer',
    'faculty',
    'teacherCard',
];

// Arbitrary that randomly selects one non-educatorLicense docType
const nonEducatorLicenseDocType = fc.constantFrom(...NON_EDUCATOR_LICENSE_DOC_TYPES);

describe('Property 2: Editor area visibility for non-educatorLicense docTypes', () => {
    afterEach(() => {
        cleanup();
    });

    test.prop(
        [nonEducatorLicenseDocType],
        { numRuns: 100 }
    )(
        'Educator License form section is NOT displayed for any non-educatorLicense docType',
        (docType) => {
            // Render the Editor with the randomly selected non-educatorLicense docType
            const { unmount } = render(
                <Editor
                    state={INITIAL_STATE}
                    onChange={vi.fn()}
                    onArrayChange={vi.fn()}
                    onAdd={vi.fn()}
                    onRemove={vi.fn()}
                    companyLogo={null}
                    onLogoUpload={vi.fn()}
                    logoInputRef={{ current: null }}
                    docType={docType}
                    photoBase64={null}
                    onPhotoChange={vi.fn()}
                    onFetchRandom={vi.fn()}
                />
            );

            // The "License Information" heading is unique to the educator license section.
            // It must NOT be present when docType is not 'educatorLicense'.
            expect(screen.queryByText('License Information')).toBeNull();

            // The "Teaching Areas & Endorsements" heading is part of the educator license editor section.
            // It must NOT be present when docType is not 'educatorLicense'.
            expect(screen.queryByText('Teaching Areas & Endorsements')).toBeNull();

            // The "Signatories" heading is part of the educator license editor section.
            // It must NOT be present when docType is not 'educatorLicense'.
            expect(screen.queryByText('Signatories')).toBeNull();

            unmount();
        }
    );
});
