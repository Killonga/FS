# Requirements Document

## Introduction

La aplicación Kanban funcional actualmente tiene archivos obsoletos en la carpeta `public` de un ejercicio anterior ("Libro de visitas"). Este documento define los requisitos para limpiar y organizar la carpeta `public`, eliminando archivos que no pertenecen a la aplicación Kanban y manteniendo únicamente los recursos necesarios para su funcionamiento.

## Glossary

- **Public_Folder**: Directorio que contiene archivos estáticos servidos por Express (CSS, JavaScript, HTML)
- **Kanban_App**: Aplicación web de gestión de tareas tipo Kanban construida con Express y Handlebars
- **Obsolete_File**: Archivo del ejercicio anterior "Libro de visitas" que no se utiliza en la aplicación Kanban
- **Static_Asset**: Archivo estático (CSS, JavaScript) utilizado por la aplicación Kanban
- **Dashboard**: Vista principal de la aplicación Kanban renderizada por Handlebars (dashboard.hbs)

## Requirements

### Requirement 1: Eliminar archivo HTML obsoleto

**User Story:** Como desarrollador, quiero eliminar el archivo index.html obsoleto del ejercicio "Libro de visitas", para que la carpeta public solo contenga archivos relevantes a la aplicación Kanban

#### Acceptance Criteria

1. THE Kanban_App SHALL NOT include public/index.html in the Public_Folder
2. WHEN the Public_Folder is inspected, THE Kanban_App SHALL contain only files used by the Dashboard
3. THE Kanban_App SHALL continue serving the Dashboard through Handlebars templates without using public/index.html

### Requirement 2: Mantener archivos JavaScript funcionales

**User Story:** Como desarrollador, quiero mantener el archivo app.js que contiene la lógica del Kanban, para que la funcionalidad de la aplicación no se vea afectada

#### Acceptance Criteria

1. THE Kanban_App SHALL preserve public/js/app.js in the Public_Folder
2. THE Static_Asset public/js/app.js SHALL contain event handlers for task creation, list creation, and form cancellation
3. WHEN the Dashboard is loaded, THE Kanban_App SHALL serve public/js/app.js to the browser
4. THE Static_Asset public/js/app.js SHALL handle click events for adding tasks, adding lists, and canceling forms

### Requirement 3: Organizar estilos CSS

**User Story:** Como desarrollador, quiero mantener únicamente los estilos CSS utilizados por la aplicación Kanban, para que la carpeta public esté limpia y organizada

#### Acceptance Criteria

1. THE Kanban_App SHALL preserve public/css/styles.css in the Public_Folder
2. THE Static_Asset public/css/styles.css SHALL contain only CSS classes used by the Dashboard
3. WHEN the Dashboard is rendered, THE Kanban_App SHALL apply styles from public/css/styles.css
4. THE Static_Asset public/css/styles.css SHALL include the hover-dark class for interactive elements

### Requirement 4: Verificar integridad de la aplicación

**User Story:** Como desarrollador, quiero verificar que la aplicación Kanban funcione correctamente después de la limpieza, para asegurar que no se eliminaron archivos necesarios

#### Acceptance Criteria

1. WHEN the cleanup is complete, THE Kanban_App SHALL render the Dashboard without errors
2. WHEN a user clicks "add new task", THE Kanban_App SHALL display the task creation form
3. WHEN a user clicks "add new list", THE Kanban_App SHALL display the list creation form
4. WHEN a user submits a new task form, THE Kanban_App SHALL create the task and update the Dashboard
5. WHEN a user submits a new list form, THE Kanban_App SHALL create the list and update the Dashboard
6. THE Kanban_App SHALL apply hover effects to interactive elements using the hover-dark CSS class

### Requirement 5: Documentar estructura de carpeta public

**User Story:** Como desarrollador, quiero documentar la estructura final de la carpeta public, para que sea claro qué archivos contiene y su propósito

#### Acceptance Criteria

1. THE Kanban_App SHALL maintain a Public_Folder structure with subdirectories: css/ and js/
2. THE Public_Folder SHALL contain exactly one CSS file: public/css/styles.css
3. THE Public_Folder SHALL contain exactly one JavaScript file: public/js/app.js
4. THE Public_Folder SHALL NOT contain any HTML files
5. WHEN the Public_Folder is inspected, THE structure SHALL be: public/css/styles.css and public/js/app.js
