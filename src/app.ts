// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMetod = descriptor.value;
  const adjDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMetod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

// project input class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    // const templateEl=document.getElementById('project-input');
    // if(templateEl){
    //     this.templateElement=templateEl
    // If we not sure that we get some element
    // but we are sure and we can use ! mark
    this.templateElement = document.getElementById(
      'project-input',
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true,
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';
    this.titleInputElement = this.element.querySelector(
      '#title',
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description',
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people',
    ) as HTMLInputElement;

    this.configure();

    this.attach();
  }
  private clearForm() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  private gatherInputMethod(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;
    if (
      enteredDescription.trim().length === 0 ||
      enteredTitle.trim().length === 0 ||
      enteredPeople.trim().length === 0
    ) {
      alert('Invalid input,please try again!');
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
    const userInput = this.gatherInputMethod();
    this.clearForm();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title, desc, people);
    }
  }
  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }
  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
