import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор

const compare = createComparison(defaultRules); 

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями

    Object.keys(indexes)
        .forEach((elementName) => {
            elements[elementName].append(
                ...Object.values(indexes[elementName])
                .map(name => {
                    const newElement = document.createElement('option');
                    newElement.value = name;
                    newElement.textContent = name;
                    return newElement;
                })
            )
        });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля

        if (!action) return;
        else if (action === 'clear') {
            const parent = action.parentElement;
            const target = parent.querySelector('input');
            target.value = '';
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state)); 
    }
}