# Implementation Plan: Kanban Public Folder Cleanup

## Overview

This plan implements the cleanup of obsolete files from the public folder, removing the unused index.html from the "Libro de visitas" exercise while preserving functional Kanban assets (app.js and styles.css). The implementation includes comprehensive testing with both unit tests and property-based tests to ensure application integrity.

## Tasks

- [x] 1. Set up testing infrastructure
  - Install testing dependencies: Jest, fast-check, supertest
  - Create test directory structure (unit, property, integration)
  - Configure Jest for Node.js environment
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [ ] 2. Implement pre-cleanup validation tests
  - [x] 2.1 Create unit tests for current file structure
    - Write tests to verify public/index.html exists (baseline)
    - Write tests to verify public/js/app.js exists
    - Write tests to verify public/css/styles.css exists
    - _Requirements: 1.1, 2.1, 3.1_
  
  - [x] 2.2 Create content verification tests
    - Test that app.js contains task creation handlers (.add-new-task, .cancel-task)
    - Test that app.js contains list creation handlers (.add-new-list, .cancel-list)
    - Test that styles.css contains .hover-dark class
    - _Requirements: 2.2, 2.4, 3.4_

- [x] 3. Perform file cleanup operation
  - [x] 3.1 Delete obsolete index.html file
    - Remove public/index.html from filesystem
    - Verify deletion was successful
    - _Requirements: 1.1, 1.2_
  
  - [x] 3.2 Verify preserved files remain intact
    - Confirm public/js/app.js still exists
    - Confirm public/css/styles.css still exists
    - _Requirements: 2.1, 3.1_

- [x] 4. Implement post-cleanup validation tests
  - [x] 4.1 Create unit tests for final file structure
    - Test that public/index.html does not exist
    - Test that public folder contains exactly 2 subdirectories (css, js)
    - Test that public/css contains exactly 1 file (styles.css)
    - Test that public/js contains exactly 1 file (app.js)
    - _Requirements: 1.1, 5.1, 5.2, 5.3, 5.4, 5.5_
  
  - [ ] 4.2 Create integration tests for HTTP endpoints
    - Test that GET / returns 200 status (dashboard renders)
    - Test that GET /js/app.js returns 200 with correct content-type
    - Test that GET /css/styles.css returns 200 with correct content-type
    - _Requirements: 1.3, 2.3, 3.3, 4.1_

- [x] 5. Checkpoint - Ensure basic tests pass
  - Run unit and integration tests, verify all pass. Ask the user if questions arise.

- [ ] 6. Implement property-based tests
  - [-] 6.1 Write property test for static asset references
    - **Property 1: All static assets are referenced**
    - **Validates: Requirements 1.2, 5.4**
    - Implement getAllPublicFiles() helper function
    - Implement getAllHandlebarsTemplates() helper function
    - Use fast-check to verify each file in public is referenced in templates or other assets
    - Run with minimum 100 iterations
  
  - [ ] 6.2 Write property test for CSS class utilization
    - **Property 2: All CSS classes are utilized**
    - **Validates: Requirements 3.2**
    - Implement extractCSSClasses() helper function
    - Implement renderView() helper function for Handlebars rendering
    - Use fast-check to verify each CSS class appears in rendered HTML
    - Run with minimum 100 iterations

- [ ]* 7. Implement functional UI tests
  - [ ]* 7.1 Set up headless browser testing
    - Install Puppeteer or Playwright
    - Configure browser test environment
    - Create helper functions for page navigation
    - _Requirements: 4.2, 4.3, 4.4, 4.5, 4.6_
  
  - [ ]* 7.2 Write UI interaction tests
    - Test clicking "add new task" displays task form
    - Test clicking "add new list" displays list form
    - Test submitting task form creates a task
    - Test submitting list form creates a list
    - Test hover effects are applied to interactive elements
    - _Requirements: 4.2, 4.3, 4.4, 4.5, 4.6_

- [ ] 8. Document final public folder structure
  - [x] 8.1 Create documentation of final structure
    - Document that public/css/styles.css contains hover-dark class
    - Document that public/js/app.js contains event handlers
    - Document the two-subdirectory structure (css/, js/)
    - List the purpose of each preserved file
    - _Requirements: 5.1, 5.2, 5.3, 5.5_

- [x] 9. Final checkpoint - Verify application integrity
  - Run all tests (unit, integration, property, functional). Ensure all pass. Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster completion
- The core cleanup operation is in task 3 - all other tasks are validation and testing
- Property-based tests provide strong guarantees about file usage and CSS utilization
- Integration tests verify HTTP endpoints work correctly after cleanup
- Functional tests validate end-to-end user interactions
- Each task references specific requirements for traceability
