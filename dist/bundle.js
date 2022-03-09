/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/base-component.ts":
/*!******************************************!*\
  !*** ./src/components/base-component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Component),
/* harmony export */   "something": () => (/* binding */ something)
/* harmony export */ });
const something = '...';
class Component {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
    }
}


/***/ }),

/***/ "./src/components/project-input.ts":
/*!*****************************************!*\
  !*** ./src/components/project-input.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectInput": () => (/* binding */ ProjectInput)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _util_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/validation */ "./src/util/validation.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class ProjectInput extends _base_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() { }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        const peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5,
        };
        if (!_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate(titleValidatable) ||
            !_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate(descriptionValidatable) ||
            !_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate(peopleValidatable)) {
            alert('Invalid input, please try again!');
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectInput.prototype, "submitHandler", null);


/***/ }),

/***/ "./src/components/project-item.ts":
/*!****************************************!*\
  !*** ./src/components/project-item.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectItem": () => (/* binding */ ProjectItem)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class ProjectItem extends _base_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(hostId, project) {
        super('single-project', hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    get persons() {
        if (this.project.people === 1) {
            return '1 person';
        }
        else {
            return `${this.project.people} persons`;
        }
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
    }
    dragEndHandler(_) {
        console.log('DragEnd');
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = this.persons + ' assigned';
        this.element.querySelector('p').textContent = this.project.description;
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__.autobind
], ProjectItem.prototype, "dragStartHandler", null);


/***/ }),

/***/ "./src/components/project-list.ts":
/*!****************************************!*\
  !*** ./src/components/project-list.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectList": () => (/* binding */ ProjectList)
/* harmony export */ });
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project */ "./src/models/project.ts");
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
/* harmony import */ var _project_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project-item */ "./src/components/project-item.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





class ProjectList extends _base_component__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul');
            listEl.classList.add('droppable');
        }
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData('text/plain');
        _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.moveProject(prjId, this.type === 'active' ? _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active : _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Finished);
    }
    dragLeaveHandler(_) {
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.addListener((projects) => {
            const relevantProjects = projects.filter((prj) => {
                if (this.type === 'active') {
                    return prj.status === _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active;
                }
                return prj.status === _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + ' PROJECTS';
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = '';
        for (const prjItem of this.assignedProjects) {
            new _project_item__WEBPACK_IMPORTED_MODULE_4__.ProjectItem(this.element.querySelector('ul').id, prjItem);
        }
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectList.prototype, "dragLeaveHandler", null);


/***/ }),

/***/ "./src/decorators/autobind.ts":
/*!************************************!*\
  !*** ./src/decorators/autobind.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "autobind": () => (/* binding */ autobind)
/* harmony export */ });
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}


/***/ }),

/***/ "./src/models/project.ts":
/*!*******************************!*\
  !*** ./src/models/project.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => (/* binding */ Project),
/* harmony export */   "ProjectStatus": () => (/* binding */ ProjectStatus)
/* harmony export */ });
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}


/***/ }),

/***/ "./src/state/project-state.ts":
/*!************************************!*\
  !*** ./src/state/project-state.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectState": () => (/* binding */ ProjectState),
/* harmony export */   "projectState": () => (/* binding */ projectState)
/* harmony export */ });
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project */ "./src/models/project.ts");

class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new _models_project__WEBPACK_IMPORTED_MODULE_0__.Project(Math.random().toString(), title, description, numOfPeople, _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find((prj) => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();


/***/ }),

/***/ "./src/util/validation.ts":
/*!********************************!*\
  !*** ./src/util/validation.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validate": () => (/* binding */ validate)
/* harmony export */ });
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_project_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/project-input */ "./src/components/project-input.ts");
/* harmony import */ var _components_project_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/project-list */ "./src/components/project-list.ts");


new _components_project_input__WEBPACK_IMPORTED_MODULE_0__.ProjectInput();
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList('active');
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList('finished');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFnQixDQUFDLEtBQUssSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUM7S0FDckU7SUFDRCxJQUNFLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxJQUFJO1FBQzVCLE9BQU8sZ0JBQWdCLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFDMUM7UUFDQSxPQUFPLEdBQUcsT0FBTyxJQUFJLGdCQUFnQixDQUFDLEtBQUssSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUM7S0FDckU7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDOzs7Ozs7O1VDMUNEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjBEO0FBQ0Y7QUFFeEQsSUFBSSxtRUFBWSxFQUFFLENBQUM7QUFDbkIsSUFBSSxpRUFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLElBQUksaUVBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3VuZGVyc3RhbmRpbmctdHlwZXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL2Jhc2UtY29tcG9uZW50LnRzIiwid2VicGFjazovL3VuZGVyc3RhbmRpbmctdHlwZXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtaW5wdXQudHMiLCJ3ZWJwYWNrOi8vdW5kZXJzdGFuZGluZy10eXBlc2NyaXB0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1pdGVtLnRzIiwid2VicGFjazovL3VuZGVyc3RhbmRpbmctdHlwZXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtbGlzdC50cyIsIndlYnBhY2s6Ly91bmRlcnN0YW5kaW5nLXR5cGVzY3JpcHQvLi9zcmMvZGVjb3JhdG9ycy9hdXRvYmluZC50cyIsIndlYnBhY2s6Ly91bmRlcnN0YW5kaW5nLXR5cGVzY3JpcHQvLi9zcmMvbW9kZWxzL3Byb2plY3QudHMiLCJ3ZWJwYWNrOi8vdW5kZXJzdGFuZGluZy10eXBlc2NyaXB0Ly4vc3JjL3N0YXRlL3Byb2plY3Qtc3RhdGUudHMiLCJ3ZWJwYWNrOi8vdW5kZXJzdGFuZGluZy10eXBlc2NyaXB0Ly4vc3JjL3V0aWwvdmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly91bmRlcnN0YW5kaW5nLXR5cGVzY3JpcHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdW5kZXJzdGFuZGluZy10eXBlc2NyaXB0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly91bmRlcnN0YW5kaW5nLXR5cGVzY3JpcHQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly91bmRlcnN0YW5kaW5nLXR5cGVzY3JpcHQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly91bmRlcnN0YW5kaW5nLXR5cGVzY3JpcHQvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvbXBvbmVudCBCYXNlIENsYXNzXHJcblxyXG5leHBvcnQgY29uc3Qgc29tZXRoaW5nID0gJy4uLic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnQ8XHJcbiAgVCBleHRlbmRzIEhUTUxFbGVtZW50LFxyXG4gIFUgZXh0ZW5kcyBIVE1MRWxlbWVudCxcclxuPiB7XHJcbiAgdGVtcGxhdGVFbGVtZW50OiBIVE1MVGVtcGxhdGVFbGVtZW50O1xyXG4gIGhvc3RFbGVtZW50OiBUO1xyXG4gIGVsZW1lbnQ6IFU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgdGVtcGxhdGVJZDogc3RyaW5nLFxyXG4gICAgaG9zdEVsZW1lbnRJZDogc3RyaW5nLFxyXG4gICAgaW5zZXJ0QXRTdGFydDogYm9vbGVhbixcclxuICAgIG5ld0VsZW1lbnRJZD86IHN0cmluZyxcclxuICApIHtcclxuICAgIHRoaXMudGVtcGxhdGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICAgIHRlbXBsYXRlSWQsXHJcbiAgICApISBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xyXG4gICAgdGhpcy5ob3N0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhvc3RFbGVtZW50SWQpISBhcyBUO1xyXG5cclxuICAgIGNvbnN0IGltcG9ydGVkTm9kZSA9IGRvY3VtZW50LmltcG9ydE5vZGUoXHJcbiAgICAgIHRoaXMudGVtcGxhdGVFbGVtZW50LmNvbnRlbnQsXHJcbiAgICAgIHRydWUsXHJcbiAgICApO1xyXG4gICAgdGhpcy5lbGVtZW50ID0gaW1wb3J0ZWROb2RlLmZpcnN0RWxlbWVudENoaWxkIGFzIFU7XHJcbiAgICBpZiAobmV3RWxlbWVudElkKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5pZCA9IG5ld0VsZW1lbnRJZDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmF0dGFjaChpbnNlcnRBdFN0YXJ0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXR0YWNoKGluc2VydEF0QmVnaW5uaW5nOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmhvc3RFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcclxuICAgICAgaW5zZXJ0QXRCZWdpbm5pbmcgPyAnYWZ0ZXJiZWdpbicgOiAnYmVmb3JlZW5kJyxcclxuICAgICAgdGhpcy5lbGVtZW50LFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGFic3RyYWN0IGNvbmZpZ3VyZSgpOiB2b2lkO1xyXG4gIGFic3RyYWN0IHJlbmRlckNvbnRlbnQoKTogdm9pZDtcclxufVxyXG4iLCJpbXBvcnQgQ21wIGZyb20gJy4vYmFzZS1jb21wb25lbnQnO1xyXG5pbXBvcnQgKiBhcyBWYWxpZGF0aW9uIGZyb20gJy4uL3V0aWwvdmFsaWRhdGlvbic7XHJcbmltcG9ydCB7IGF1dG9iaW5kIGFzIEF1dG9iaW5kIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9hdXRvYmluZCc7XHJcbmltcG9ydCB7IHByb2plY3RTdGF0ZSB9IGZyb20gJy4uL3N0YXRlL3Byb2plY3Qtc3RhdGUnO1xyXG5cclxuLy8gUHJvamVjdElucHV0IENsYXNzXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0SW5wdXQgZXh0ZW5kcyBDbXA8SFRNTERpdkVsZW1lbnQsIEhUTUxGb3JtRWxlbWVudD4ge1xyXG4gIHRpdGxlSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIGRlc2NyaXB0aW9uSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHBlb3BsZUlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigncHJvamVjdC1pbnB1dCcsICdhcHAnLCB0cnVlLCAndXNlci1pbnB1dCcpO1xyXG4gICAgdGhpcy50aXRsZUlucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAnI3RpdGxlJyxcclxuICAgICkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgJyNkZXNjcmlwdGlvbicsXHJcbiAgICApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLnBlb3BsZUlucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAnI3Blb3BsZScsXHJcbiAgICApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gIH1cclxuXHJcbiAgY29uZmlndXJlKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0SGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICByZW5kZXJDb250ZW50KCkge31cclxuXHJcbiAgcHJpdmF0ZSBnYXRoZXJVc2VySW5wdXQoKTogW3N0cmluZywgc3RyaW5nLCBudW1iZXJdIHwgdm9pZCB7XHJcbiAgICBjb25zdCBlbnRlcmVkVGl0bGUgPSB0aGlzLnRpdGxlSW5wdXRFbGVtZW50LnZhbHVlO1xyXG4gICAgY29uc3QgZW50ZXJlZERlc2NyaXB0aW9uID0gdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZTtcclxuICAgIGNvbnN0IGVudGVyZWRQZW9wbGUgPSB0aGlzLnBlb3BsZUlucHV0RWxlbWVudC52YWx1ZTtcclxuXHJcbiAgICBjb25zdCB0aXRsZVZhbGlkYXRhYmxlOiBWYWxpZGF0aW9uLlZhbGlkYXRhYmxlID0ge1xyXG4gICAgICB2YWx1ZTogZW50ZXJlZFRpdGxlLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvblZhbGlkYXRhYmxlOiBWYWxpZGF0aW9uLlZhbGlkYXRhYmxlID0ge1xyXG4gICAgICB2YWx1ZTogZW50ZXJlZERlc2NyaXB0aW9uLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgbWluTGVuZ3RoOiA1LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHBlb3BsZVZhbGlkYXRhYmxlOiBWYWxpZGF0aW9uLlZhbGlkYXRhYmxlID0ge1xyXG4gICAgICB2YWx1ZTogK2VudGVyZWRQZW9wbGUsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICBtaW46IDEsXHJcbiAgICAgIG1heDogNSxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAhVmFsaWRhdGlvbi52YWxpZGF0ZSh0aXRsZVZhbGlkYXRhYmxlKSB8fFxyXG4gICAgICAhVmFsaWRhdGlvbi52YWxpZGF0ZShkZXNjcmlwdGlvblZhbGlkYXRhYmxlKSB8fFxyXG4gICAgICAhVmFsaWRhdGlvbi52YWxpZGF0ZShwZW9wbGVWYWxpZGF0YWJsZSlcclxuICAgICkge1xyXG4gICAgICBhbGVydCgnSW52YWxpZCBpbnB1dCwgcGxlYXNlIHRyeSBhZ2FpbiEnKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFtlbnRlcmVkVGl0bGUsIGVudGVyZWREZXNjcmlwdGlvbiwgK2VudGVyZWRQZW9wbGVdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbGVhcklucHV0cygpIHtcclxuICAgIHRoaXMudGl0bGVJbnB1dEVsZW1lbnQudmFsdWUgPSAnJztcclxuICAgIHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQudmFsdWUgPSAnJztcclxuICAgIHRoaXMucGVvcGxlSW5wdXRFbGVtZW50LnZhbHVlID0gJyc7XHJcbiAgfVxyXG5cclxuICBAQXV0b2JpbmRcclxuICBwcml2YXRlIHN1Ym1pdEhhbmRsZXIoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgdXNlcklucHV0ID0gdGhpcy5nYXRoZXJVc2VySW5wdXQoKTtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHVzZXJJbnB1dCkpIHtcclxuICAgICAgY29uc3QgW3RpdGxlLCBkZXNjLCBwZW9wbGVdID0gdXNlcklucHV0O1xyXG4gICAgICBwcm9qZWN0U3RhdGUuYWRkUHJvamVjdCh0aXRsZSwgZGVzYywgcGVvcGxlKTtcclxuICAgICAgdGhpcy5jbGVhcklucHV0cygpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEcmFnZ2FibGUgfSBmcm9tICcuLi9tb2RlbHMvZHJhZy1kcm9wJztcclxuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uL21vZGVscy9wcm9qZWN0JztcclxuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL2Jhc2UtY29tcG9uZW50JztcclxuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tICcuLi9kZWNvcmF0b3JzL2F1dG9iaW5kJztcclxuXHJcbi8vIFByb2plY3RJdGVtIENsYXNzXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0SXRlbVxyXG4gIGV4dGVuZHMgQ29tcG9uZW50PEhUTUxVTGlzdEVsZW1lbnQsIEhUTUxMSUVsZW1lbnQ+XHJcbiAgaW1wbGVtZW50cyBEcmFnZ2FibGVcclxue1xyXG4gIHByaXZhdGUgcHJvamVjdDogUHJvamVjdDtcclxuXHJcbiAgZ2V0IHBlcnNvbnMoKSB7XHJcbiAgICBpZiAodGhpcy5wcm9qZWN0LnBlb3BsZSA9PT0gMSkge1xyXG4gICAgICByZXR1cm4gJzEgcGVyc29uJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBgJHt0aGlzLnByb2plY3QucGVvcGxlfSBwZXJzb25zYDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKGhvc3RJZDogc3RyaW5nLCBwcm9qZWN0OiBQcm9qZWN0KSB7XHJcbiAgICBzdXBlcignc2luZ2xlLXByb2plY3QnLCBob3N0SWQsIGZhbHNlLCBwcm9qZWN0LmlkKTtcclxuICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XHJcblxyXG4gICAgdGhpcy5jb25maWd1cmUoKTtcclxuICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xyXG4gIH1cclxuXHJcbiAgQGF1dG9iaW5kXHJcbiAgZHJhZ1N0YXJ0SGFuZGxlcihldmVudDogRHJhZ0V2ZW50KSB7XHJcbiAgICBldmVudC5kYXRhVHJhbnNmZXIhLnNldERhdGEoJ3RleHQvcGxhaW4nLCB0aGlzLnByb2plY3QuaWQpO1xyXG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyIS5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xyXG4gIH1cclxuXHJcbiAgZHJhZ0VuZEhhbmRsZXIoXzogRHJhZ0V2ZW50KSB7XHJcbiAgICBjb25zb2xlLmxvZygnRHJhZ0VuZCcpO1xyXG4gIH1cclxuXHJcbiAgY29uZmlndXJlKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXMuZHJhZ1N0YXJ0SGFuZGxlcik7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXMuZHJhZ0VuZEhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyQ29udGVudCgpIHtcclxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdoMicpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC50aXRsZTtcclxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdoMycpIS50ZXh0Q29udGVudCA9IHRoaXMucGVyc29ucyArICcgYXNzaWduZWQnO1xyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AnKSEudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QuZGVzY3JpcHRpb247XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IERyYWdUYXJnZXQgfSBmcm9tICcuLi9tb2RlbHMvZHJhZy1kcm9wJztcclxuaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdFN0YXR1cyB9IGZyb20gJy4uL21vZGVscy9wcm9qZWN0JztcclxuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL2Jhc2UtY29tcG9uZW50JztcclxuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tICcuLi9kZWNvcmF0b3JzL2F1dG9iaW5kJztcclxuaW1wb3J0IHsgcHJvamVjdFN0YXRlIH0gZnJvbSAnLi4vc3RhdGUvcHJvamVjdC1zdGF0ZSc7XHJcbmltcG9ydCB7IFByb2plY3RJdGVtIH0gZnJvbSAnLi9wcm9qZWN0LWl0ZW0nO1xyXG5cclxuLy8gUHJvamVjdExpc3QgQ2xhc3NcclxuZXhwb3J0IGNsYXNzIFByb2plY3RMaXN0XHJcbiAgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERpdkVsZW1lbnQsIEhUTUxFbGVtZW50PlxyXG4gIGltcGxlbWVudHMgRHJhZ1RhcmdldFxyXG57XHJcbiAgYXNzaWduZWRQcm9qZWN0czogUHJvamVjdFtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHR5cGU6ICdhY3RpdmUnIHwgJ2ZpbmlzaGVkJykge1xyXG4gICAgc3VwZXIoJ3Byb2plY3QtbGlzdCcsICdhcHAnLCBmYWxzZSwgYCR7dHlwZX0tcHJvamVjdHNgKTtcclxuICAgIHRoaXMuYXNzaWduZWRQcm9qZWN0cyA9IFtdO1xyXG5cclxuICAgIHRoaXMuY29uZmlndXJlKCk7XHJcbiAgICB0aGlzLnJlbmRlckNvbnRlbnQoKTtcclxuICB9XHJcblxyXG4gIEBhdXRvYmluZFxyXG4gIGRyYWdPdmVySGFuZGxlcihldmVudDogRHJhZ0V2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyICYmIGV2ZW50LmRhdGFUcmFuc2Zlci50eXBlc1swXSA9PT0gJ3RleHQvcGxhaW4nKSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnN0IGxpc3RFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpITtcclxuICAgICAgbGlzdEVsLmNsYXNzTGlzdC5hZGQoJ2Ryb3BwYWJsZScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQGF1dG9iaW5kXHJcbiAgZHJvcEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCkge1xyXG4gICAgY29uc3QgcHJqSWQgPSBldmVudC5kYXRhVHJhbnNmZXIhLmdldERhdGEoJ3RleHQvcGxhaW4nKTtcclxuICAgIHByb2plY3RTdGF0ZS5tb3ZlUHJvamVjdChcclxuICAgICAgcHJqSWQsXHJcbiAgICAgIHRoaXMudHlwZSA9PT0gJ2FjdGl2ZScgPyBQcm9qZWN0U3RhdHVzLkFjdGl2ZSA6IFByb2plY3RTdGF0dXMuRmluaXNoZWQsXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgQGF1dG9iaW5kXHJcbiAgZHJhZ0xlYXZlSGFuZGxlcihfOiBEcmFnRXZlbnQpIHtcclxuICAgIGNvbnN0IGxpc3RFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpITtcclxuICAgIGxpc3RFbC5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wcGFibGUnKTtcclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZSgpIHtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuZHJhZ092ZXJIYW5kbGVyKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCB0aGlzLmRyYWdMZWF2ZUhhbmRsZXIpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCB0aGlzLmRyb3BIYW5kbGVyKTtcclxuXHJcbiAgICBwcm9qZWN0U3RhdGUuYWRkTGlzdGVuZXIoKHByb2plY3RzOiBQcm9qZWN0W10pID0+IHtcclxuICAgICAgY29uc3QgcmVsZXZhbnRQcm9qZWN0cyA9IHByb2plY3RzLmZpbHRlcigocHJqKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ2FjdGl2ZScpIHtcclxuICAgICAgICAgIHJldHVybiBwcmouc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkFjdGl2ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByai5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuRmluaXNoZWQ7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmFzc2lnbmVkUHJvamVjdHMgPSByZWxldmFudFByb2plY3RzO1xyXG4gICAgICB0aGlzLnJlbmRlclByb2plY3RzKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbmRlckNvbnRlbnQoKSB7XHJcbiAgICBjb25zdCBsaXN0SWQgPSBgJHt0aGlzLnR5cGV9LXByb2plY3RzLWxpc3RgO1xyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhLmlkID0gbGlzdElkO1xyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJykhLnRleHRDb250ZW50ID1cclxuICAgICAgdGhpcy50eXBlLnRvVXBwZXJDYXNlKCkgKyAnIFBST0pFQ1RTJztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVuZGVyUHJvamVjdHMoKSB7XHJcbiAgICBjb25zdCBsaXN0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgICAgYCR7dGhpcy50eXBlfS1wcm9qZWN0cy1saXN0YCxcclxuICAgICkhIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XHJcbiAgICBsaXN0RWwuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBmb3IgKGNvbnN0IHByakl0ZW0gb2YgdGhpcy5hc3NpZ25lZFByb2plY3RzKSB7XHJcbiAgICAgIG5ldyBQcm9qZWN0SXRlbSh0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSEuaWQsIHByakl0ZW0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIvLyBhdXRvYmluZCBkZWNvcmF0b3JcclxuZXhwb3J0IGZ1bmN0aW9uIGF1dG9iaW5kKF86IGFueSwgXzI6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XHJcbiAgY29uc3Qgb3JpZ2luYWxNZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlO1xyXG4gIGNvbnN0IGFkakRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvciA9IHtcclxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgIGdldCgpIHtcclxuICAgICAgY29uc3QgYm91bmRGbiA9IG9yaWdpbmFsTWV0aG9kLmJpbmQodGhpcyk7XHJcbiAgICAgIHJldHVybiBib3VuZEZuO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgcmV0dXJuIGFkakRlc2NyaXB0b3I7XHJcbn1cclxuIiwiZXhwb3J0IGVudW0gUHJvamVjdFN0YXR1cyB7XHJcbiAgQWN0aXZlLFxyXG4gIEZpbmlzaGVkXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBpZDogc3RyaW5nLFxyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgIHB1YmxpYyBwZW9wbGU6IG51bWJlcixcclxuICAgIHB1YmxpYyBzdGF0dXM6IFByb2plY3RTdGF0dXNcclxuICApIHt9XHJcbn1cclxuIiwiaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdFN0YXR1cyB9IGZyb20gJy4uL21vZGVscy9wcm9qZWN0JztcclxuXHJcbi8vIFByb2plY3QgU3RhdGUgTWFuYWdlbWVudFxyXG50eXBlIExpc3RlbmVyPFQ+ID0gKGl0ZW1zOiBUW10pID0+IHZvaWQ7XHJcblxyXG5jbGFzcyBTdGF0ZTxUPiB7XHJcbiAgcHJvdGVjdGVkIGxpc3RlbmVyczogTGlzdGVuZXI8VD5bXSA9IFtdO1xyXG5cclxuICBhZGRMaXN0ZW5lcihsaXN0ZW5lckZuOiBMaXN0ZW5lcjxUPikge1xyXG4gICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lckZuKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0U3RhdGUgZXh0ZW5kcyBTdGF0ZTxQcm9qZWN0PiB7XHJcbiAgcHJpdmF0ZSBwcm9qZWN0czogUHJvamVjdFtdID0gW107XHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFByb2plY3RTdGF0ZTtcclxuXHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XHJcbiAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgUHJvamVjdFN0YXRlKCk7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIGFkZFByb2plY3QodGl0bGU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgbnVtT2ZQZW9wbGU6IG51bWJlcikge1xyXG4gICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KFxyXG4gICAgICBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCksXHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgbnVtT2ZQZW9wbGUsXHJcbiAgICAgIFByb2plY3RTdGF0dXMuQWN0aXZlLFxyXG4gICAgKTtcclxuICAgIHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcclxuICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICBtb3ZlUHJvamVjdChwcm9qZWN0SWQ6IHN0cmluZywgbmV3U3RhdHVzOiBQcm9qZWN0U3RhdHVzKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0ID0gdGhpcy5wcm9qZWN0cy5maW5kKChwcmopID0+IHByai5pZCA9PT0gcHJvamVjdElkKTtcclxuICAgIGlmIChwcm9qZWN0ICYmIHByb2plY3Quc3RhdHVzICE9PSBuZXdTdGF0dXMpIHtcclxuICAgICAgcHJvamVjdC5zdGF0dXMgPSBuZXdTdGF0dXM7XHJcbiAgICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZUxpc3RlbmVycygpIHtcclxuICAgIGZvciAoY29uc3QgbGlzdGVuZXJGbiBvZiB0aGlzLmxpc3RlbmVycykge1xyXG4gICAgICBsaXN0ZW5lckZuKHRoaXMucHJvamVjdHMuc2xpY2UoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcHJvamVjdFN0YXRlID0gUHJvamVjdFN0YXRlLmdldEluc3RhbmNlKCk7XHJcbiIsIi8vIFZhbGlkYXRpb25cclxuZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0YWJsZSB7XHJcbiAgdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcclxuICByZXF1aXJlZD86IGJvb2xlYW47XHJcbiAgbWluTGVuZ3RoPzogbnVtYmVyO1xyXG4gIG1heExlbmd0aD86IG51bWJlcjtcclxuICBtaW4/OiBudW1iZXI7XHJcbiAgbWF4PzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGUodmFsaWRhdGFibGVJbnB1dDogVmFsaWRhdGFibGUpIHtcclxuICBsZXQgaXNWYWxpZCA9IHRydWU7XHJcbiAgaWYgKHZhbGlkYXRhYmxlSW5wdXQucmVxdWlyZWQpIHtcclxuICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoICE9PSAwO1xyXG4gIH1cclxuICBpZiAoXHJcbiAgICB2YWxpZGF0YWJsZUlucHV0Lm1pbkxlbmd0aCAhPSBudWxsICYmXHJcbiAgICB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gJ3N0cmluZydcclxuICApIHtcclxuICAgIGlzVmFsaWQgPVxyXG4gICAgICBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUubGVuZ3RoID49IHZhbGlkYXRhYmxlSW5wdXQubWluTGVuZ3RoO1xyXG4gIH1cclxuICBpZiAoXHJcbiAgICB2YWxpZGF0YWJsZUlucHV0Lm1heExlbmd0aCAhPSBudWxsICYmXHJcbiAgICB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gJ3N0cmluZydcclxuICApIHtcclxuICAgIGlzVmFsaWQgPVxyXG4gICAgICBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUubGVuZ3RoIDw9IHZhbGlkYXRhYmxlSW5wdXQubWF4TGVuZ3RoO1xyXG4gIH1cclxuICBpZiAoXHJcbiAgICB2YWxpZGF0YWJsZUlucHV0Lm1pbiAhPSBudWxsICYmXHJcbiAgICB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gJ251bWJlcidcclxuICApIHtcclxuICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPj0gdmFsaWRhdGFibGVJbnB1dC5taW47XHJcbiAgfVxyXG4gIGlmIChcclxuICAgIHZhbGlkYXRhYmxlSW5wdXQubWF4ICE9IG51bGwgJiZcclxuICAgIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSAnbnVtYmVyJ1xyXG4gICkge1xyXG4gICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA8PSB2YWxpZGF0YWJsZUlucHV0Lm1heDtcclxuICB9XHJcbiAgcmV0dXJuIGlzVmFsaWQ7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBQcm9qZWN0SW5wdXQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJvamVjdC1pbnB1dCc7XHJcbmltcG9ydCB7IFByb2plY3RMaXN0IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2plY3QtbGlzdCc7XHJcblxyXG5uZXcgUHJvamVjdElucHV0KCk7XHJcbm5ldyBQcm9qZWN0TGlzdCgnYWN0aXZlJyk7XHJcbm5ldyBQcm9qZWN0TGlzdCgnZmluaXNoZWQnKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9