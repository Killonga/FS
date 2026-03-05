# Design Document: Kanban Public Folder Cleanup

## Overview

This design addresses the cleanup of obsolete files in the `public` folder from a previous "Libro de visitas" (guestbook) exercise. The Kanban application currently serves its UI through Handlebars templates (layout.hbs and dashboard.hbs) but has a leftover `public/index.html` file that is not used and should be removed.

The cleanup operation is straightforward: delete the obsolete HTML file while preserving the functional JavaScript and CSS assets. The application architecture uses Express to serve static files from the `public` directory, with the main UI rendered server-side through Handlebars templates.

### Goals

- Remove obsolete `public/index.html` from the previous guestbook exercise
- Preserve functional assets: `public/js/app.js` and `public/css/styles.css`
- Verify application integrity post-cleanup
- Document the final public folder structure

### Non-Goals

- Refactoring the JavaScript or CSS code
- Changing the application architecture
- Modifying the Handlebars templates
- Adding new features to the Kanban application

## Architecture

### Current Application Structure

The Kanban application follows a traditional server-side rendering architecture:

```
Backend: Express + Handlebars
Frontend: Bootstrap + Bootstrap Icons + Vanilla JavaScript
Storage: data.json (filesystem)
Static Files: Served via express.static("public")
```

### Static Asset Serving

Express serves static files through the middleware configuration:
```javascript
app.use(express.static("public"))
```

This makes files in the `public` directory accessible at the root URL path:
- `public/css/styles.css` → `/css/styles.css`
- `public/js/app.js` → `/js/app.js`
- `public/index.html` → `/index.html` (obsolete, not referenced)

### Template Rendering Flow

1. User requests the root route `/`
2. Express routes to the dashboard controller
3. Handlebars renders `layout.hbs` with `dashboard.hbs` as body
4. `layout.hbs` includes references to:
   - `/css/styles.css` (custom styles)
   - `/js/app.js` (Kanban event handlers)
   - Bootstrap CSS and Icons (from separate static directories)

The `public/index.html` file is never referenced in this flow and represents dead code from the previous exercise.

## Components and Interfaces

### Files to Delete

**public/index.html**
- Purpose: Obsolete HTML file from "Libro de visitas" exercise
- Status: Not referenced by any part of the Kanban application
- Action: Delete
- Risk: None - file is completely unused

### Files to Preserve

**public/js/app.js**
- Purpose: Client-side event handlers for Kanban functionality
- Functionality:
  - Task creation form display/cancellation
  - List creation form display/cancellation
  - Dynamic form injection into the DOM
  - Event delegation for all interactive elements
- Dependencies: None (vanilla JavaScript)
- Referenced by: `views/layout.hbs` via `<script src="/js/app.js"></script>`

**public/css/styles.css**
- Purpose: Custom CSS styles for Kanban UI
- Content: `.hover-dark` class for interactive element hover effects
- Dependencies: None
- Referenced by: `views/layout.hbs` via `<link rel="stylesheet" href="/css/styles.css" />`

### Verification Points

After cleanup, the following must function correctly:

1. **Dashboard Rendering**: The main Kanban view loads without errors
2. **Task Form**: Clicking "add new task" displays the task creation form
3. **List Form**: Clicking "add new list" displays the list creation form
4. **Task Creation**: Submitting a task form creates a new task
5. **List Creation**: Submitting a list form creates a new list
6. **Hover Effects**: Interactive elements show hover styling via `.hover-dark` class

## Data Models

This cleanup operation does not involve data model changes. The application continues to use:

- **data.json**: Filesystem-based storage for lists and tasks
- **Express session data**: User session management (if applicable)
- **Form data**: POST requests with `listId`, `titulo`, and `listName` fields

No changes to data structures, schemas, or persistence mechanisms are required.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing the acceptance criteria, I identified that most requirements are specific examples rather than universal properties. This is appropriate for a cleanup task that has a concrete, well-defined end state. However, two properties emerged that apply universally:

**Property candidates identified:**
- 1.2: All files in public folder are used (universal across any file set)
- 3.2: All CSS classes are used (universal across any CSS class set)
- 5.4: No HTML files exist (universal across any file set)

**Redundancy analysis:**
- Property 1.2 (all files used) and Property 5.4 (no HTML files) overlap: if all files are used and HTML files aren't used, then no HTML files should exist. Property 1.2 is more comprehensive.
- Property 3.2 (all CSS classes used) is independent and provides unique validation value.

**Final properties:**
- Property 1: All files in public folder are referenced by the application
- Property 2: All CSS classes in styles.css are used in the rendered HTML

The remaining acceptance criteria are best validated through example-based unit tests that verify the specific end state of the cleanup operation.

### Property 1: All static assets are referenced

*For any* file in the public folder, that file must be referenced either in the Handlebars templates or by other static assets in the application.

**Validates: Requirements 1.2, 5.4**

### Property 2: All CSS classes are utilized

*For any* CSS class defined in public/css/styles.css, that class must appear in the rendered HTML of at least one application view.

**Validates: Requirements 3.2**

### Example-Based Tests

The following specific behaviors should be verified through unit tests:

**File Structure Tests:**
- public/index.html does not exist (Requirement 1.1)
- public/js/app.js exists (Requirement 2.1)
- public/css/styles.css exists (Requirement 3.1)
- public folder contains exactly 2 files in 2 subdirectories (Requirement 5.1, 5.2, 5.3, 5.5)

**Functionality Tests:**
- Dashboard renders without errors (Requirement 4.1)
- app.js is served and accessible (Requirement 2.3)
- styles.css is served and accessible (Requirement 3.3)
- app.js contains event handlers for task/list creation and cancellation (Requirement 2.2, 2.4)
- styles.css contains the hover-dark class (Requirement 3.4)
- Clicking "add new task" displays task form (Requirement 4.2)
- Clicking "add new list" displays list form (Requirement 4.3)
- Submitting task form creates a task (Requirement 4.4)
- Submitting list form creates a list (Requirement 4.5)
- Hover effects work on interactive elements (Requirement 4.6)

## Error Handling

This cleanup operation has minimal error handling requirements since it's a one-time file deletion task. However, the following considerations apply:

### Pre-Cleanup Validation

Before deleting files, verify:
1. **Backup exists**: Ensure version control (git) has committed the current state
2. **Target file exists**: Confirm public/index.html exists before attempting deletion
3. **Preserved files exist**: Verify app.js and styles.css are present

### Deletion Errors

If file deletion fails:
- **Permission errors**: Ensure write permissions on the public directory
- **File in use**: Close any processes that might have the file open
- **File not found**: Log a warning but continue (file already deleted)

### Post-Cleanup Validation

After deletion, verify:
1. **Application starts**: Express server starts without errors
2. **Dashboard loads**: HTTP GET to `/` returns 200 status
3. **Static assets load**: Both app.js and styles.css return 200 status
4. **No 404 errors**: Browser console shows no failed resource loads

### Rollback Strategy

If post-cleanup validation fails:
1. Use git to restore the deleted file: `git checkout public/index.html`
2. Investigate why the file was needed (unexpected dependency)
3. Document the dependency before attempting cleanup again

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests to ensure comprehensive coverage:

- **Unit tests**: Verify specific file structure, existence checks, and concrete functionality examples
- **Property tests**: Verify universal rules about file usage and CSS class utilization

Together, these approaches provide confidence that the cleanup is complete and the application remains functional.

### Unit Testing

Unit tests will focus on specific examples and the concrete end state of the cleanup:

**File Structure Tests** (using Node.js fs module):
```javascript
// Verify obsolete file is deleted
test('public/index.html should not exist', () => {
  expect(fs.existsSync('public/index.html')).toBe(false);
});

// Verify required files are preserved
test('public/js/app.js should exist', () => {
  expect(fs.existsSync('public/js/app.js')).toBe(true);
});

test('public/css/styles.css should exist', () => {
  expect(fs.existsSync('public/css/styles.css')).toBe(true);
});

// Verify exact structure
test('public folder should contain exactly 2 subdirectories', () => {
  const dirs = fs.readdirSync('public', { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());
  expect(dirs).toHaveLength(2);
  expect(dirs.map(d => d.name).sort()).toEqual(['css', 'js']);
});

test('public/css should contain exactly 1 file', () => {
  const files = fs.readdirSync('public/css');
  expect(files).toHaveLength(1);
  expect(files[0]).toBe('styles.css');
});

test('public/js should contain exactly 1 file', () => {
  const files = fs.readdirSync('public/js');
  expect(files).toHaveLength(1);
  expect(files[0]).toBe('app.js');
});
```

**Content Verification Tests**:
```javascript
test('app.js should contain task creation handler', () => {
  const content = fs.readFileSync('public/js/app.js', 'utf-8');
  expect(content).toContain('.add-new-task');
  expect(content).toContain('.cancel-task');
});

test('app.js should contain list creation handler', () => {
  const content = fs.readFileSync('public/js/app.js', 'utf-8');
  expect(content).toContain('.add-new-list');
  expect(content).toContain('.cancel-list');
});

test('styles.css should contain hover-dark class', () => {
  const content = fs.readFileSync('public/css/styles.css', 'utf-8');
  expect(content).toContain('.hover-dark');
});
```

**Integration Tests** (using supertest or similar):
```javascript
test('dashboard should render without errors', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(200);
});

test('app.js should be served', async () => {
  const response = await request(app).get('/js/app.js');
  expect(response.status).toBe(200);
  expect(response.headers['content-type']).toContain('javascript');
});

test('styles.css should be served', async () => {
  const response = await request(app).get('/css/styles.css');
  expect(response.status).toBe(200);
  expect(response.headers['content-type']).toContain('css');
});
```

**Functional Tests** (using a headless browser like Puppeteer or Playwright):
```javascript
test('clicking add new task should display form', async () => {
  await page.goto('http://localhost:3000');
  await page.click('.add-new-task');
  const form = await page.$('.task-form');
  expect(form).not.toBeNull();
});

test('clicking add new list should display form', async () => {
  await page.goto('http://localhost:3000');
  await page.click('.add-new-list');
  const form = await page.$('form[action="/nueva-lista"]');
  expect(form).not.toBeNull();
});

test('hover effects should be applied', async () => {
  await page.goto('http://localhost:3000');
  const element = await page.$('.hover-dark');
  expect(element).not.toBeNull();
});
```

### Property-Based Testing

Property-based tests will verify universal rules using a testing library like **fast-check** (for JavaScript/Node.js).

**Configuration**: Each property test should run a minimum of 100 iterations to ensure comprehensive coverage through randomization.

**Property Test 1: All static assets are referenced**

```javascript
// Feature: kanban-public-folder-cleanup, Property 1: For any file in the public folder, that file must be referenced either in the Handlebars templates or by other static assets in the application.

test('all files in public folder are referenced', () => {
  fc.assert(
    fc.property(fc.constantFrom(...getAllPublicFiles()), (filePath) => {
      // Check if file is referenced in templates
      const templates = getAllHandlebarsTemplates();
      const isReferencedInTemplate = templates.some(template => {
        const content = fs.readFileSync(template, 'utf-8');
        const relativePath = filePath.replace('public/', '/');
        return content.includes(relativePath);
      });

      // Check if file is referenced by other static assets
      const staticAssets = getAllPublicFiles().filter(f => f !== filePath);
      const isReferencedInAsset = staticAssets.some(asset => {
        const content = fs.readFileSync(asset, 'utf-8');
        const relativePath = filePath.replace('public/', '/');
        return content.includes(relativePath);
      });

      return isReferencedInTemplate || isReferencedInAsset;
    }),
    { numRuns: 100 }
  );
});

function getAllPublicFiles() {
  const files = [];
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else {
        files.push(fullPath);
      }
    }
  }
  walk('public');
  return files;
}

function getAllHandlebarsTemplates() {
  const files = [];
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.hbs')) {
        files.push(fullPath);
      }
    }
  }
  walk('views');
  return files;
}
```

**Property Test 2: All CSS classes are utilized**

```javascript
// Feature: kanban-public-folder-cleanup, Property 2: For any CSS class defined in public/css/styles.css, that class must appear in the rendered HTML of at least one application view.

test('all CSS classes in styles.css are used', async () => {
  const cssContent = fs.readFileSync('public/css/styles.css', 'utf-8');
  const classNames = extractCSSClasses(cssContent);

  fc.assert(
    fc.property(fc.constantFrom(...classNames), async (className) => {
      // Render all views and check if class appears
      const views = getAllHandlebarsTemplates();
      
      for (const view of views) {
        const rendered = await renderView(view);
        if (rendered.includes(`class="${className}"`) || 
            rendered.includes(`class='${className}'`) ||
            rendered.includes(` ${className} `) ||
            rendered.includes(` ${className}"`)) {
          return true;
        }
      }
      
      return false;
    }),
    { numRuns: 100 }
  );
});

function extractCSSClasses(cssContent) {
  const classRegex = /\.([a-zA-Z0-9_-]+)/g;
  const classes = [];
  let match;
  while ((match = classRegex.exec(cssContent)) !== null) {
    classes.push(match[1]);
  }
  return [...new Set(classes)]; // Remove duplicates
}

async function renderView(viewPath) {
  // This would use the actual Handlebars rendering engine
  // with appropriate test data to render the view
  const hbs = require('handlebars');
  const template = fs.readFileSync(viewPath, 'utf-8');
  const compiled = hbs.compile(template);
  return compiled(getTestData());
}

function getTestData() {
  // Return test data structure that matches what the views expect
  return {
    lists: [
      { id: 1, name: 'Test List', tasks: [{ id: 1, title: 'Test Task' }] }
    ]
  };
}
```

### Test Execution

**Manual Verification Steps**:
1. Delete public/index.html
2. Start the Express server
3. Navigate to http://localhost:3000
4. Verify dashboard loads without console errors
5. Click "add new task" and verify form appears
6. Click "add new list" and verify form appears
7. Submit a task and verify it's created
8. Submit a list and verify it's created
9. Hover over interactive elements and verify hover effects

**Automated Test Execution**:
```bash
# Run all tests
npm test

# Run only unit tests
npm test -- --testPathPattern=unit

# Run only property tests
npm test -- --testPathPattern=property

# Run integration tests
npm test -- --testPathPattern=integration
```

### Success Criteria

All tests must pass, including:
- All unit tests for file structure and content
- All property-based tests (100+ iterations each)
- All integration tests for HTTP endpoints
- All functional tests for UI interactions
- Manual verification checklist completed

If any test fails, the cleanup should be rolled back and the issue investigated before proceeding.
