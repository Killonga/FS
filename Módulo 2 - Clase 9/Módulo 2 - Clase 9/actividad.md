# 🧩 Actividad: Creación de una página de encuesta responsiva con Flexbox y Media Queries

## 🎯 Objetivo de la actividad
Crear una **página web responsiva** que simule una **encuesta de mercado** sobre un producto específico.  
El objetivo es aplicar **Flexbox**, **Media Queries** y la técnica **Mobile First** para lograr un diseño adaptable a diferentes tamaños de pantalla.

---

## 📘 Descripción de la actividad
En esta práctica, los estudiantes desarrollarán una **página tipo Google Form**, donde se aplicará la organización y distribución de los elementos utilizando **Flexbox**,  
y se ajustará el diseño mediante **Media Queries** para móviles, tablets y computadoras de escritorio.

---

## 🧱 Requisitos técnicos

El proyecto debe incluir:

1. **Encabezado:**
   - Nombre del producto.  
   - Breve descripción del objetivo de la encuesta.

2. **Formulario de encuesta:**
   - `input type="text"` → Nombre del encuestado.  
   - `input type="email"` → Correo de contacto.  
   - `select` → Rango de edad.  
   - `input type="radio"` → Nivel de satisfacción con el producto.  
   - `textarea` → Comentarios o sugerencias.  
   - `input type="submit"` → Botón de envío.

3. **Diseño responsivo:**
   - Estructura organizada con **Flexbox**.  
   - Uso de `flex-direction: column` en vista móvil.  
   - Cambios a `row` o distribución tipo grid en pantallas más grandes.  
   - Colores, márgenes y tipografía coherentes y legibles.

---

## 🖥️ Puntos de quiebre sugeridos

Implementar los siguientes *breakpoints* para adaptar el diseño:

```css
@media (min-width: 576px) { ... }   /* móviles grandes */
@media (min-width: 768px) { ... }   /* tablets */
@media (min-width: 992px) { ... }   /* laptops */
@media (min-width: 1200px) { ... }  /* escritorios grandes */
