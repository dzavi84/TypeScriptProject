"use strict";
class ProjectInput {
    constructor() {
        // const templateEl=document.getElementById('project-input');
        // if(templateEl){
        //     this.templateElement=templateEl
        // If we not sure that we get some element
        // but we are sure and we can use ! mark
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleInputElement = this.element.querySelector('#title');
        this.attach();
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
const prjInput = new ProjectInput();
