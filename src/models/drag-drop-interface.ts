namespace App {
  //drag and drop
  export interface Draggable {
    dragStartHendler(event: DragEvent): void;
    dragEndHendler(event: DragEvent): void;
  }

  export interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
  }
}
