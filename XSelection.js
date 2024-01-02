/**
  * @ADEMMERAL_XSELECTION
  * https://github.com/ademmeral/XModules/blob/main/XSelection.js
*/

export class XSelection{
  #isSelecting = null;
  #timeout = null;

  #handleSelectStart = () => {
    this.#isSelecting = true;
    this.element.addEventListener('mouseup', this.#handleMouseUp, {once : true});
  };

  #handleMouseUp = () => {
    this.#isSelecting = false;
    this.handleSelection();
    if (!this.selectedNode) return; 
    this.element.dispatchEvent(this.event);
    this.selectedNode = null;
  };

  #handleKeyUp = () => {
    clearTimeout(this.#timeout);
    this.element.removeEventListener('mouseup', this.#handleMouseUp);
    this.handleSelection();
    if (this.selectedNode) {
      this.#timeout = setTimeout(() => {
        this.element.dispatchEvent(this.event);
        this.selectedNode = null;
      }, 500);
    };
  };

  #handleMouseLeave = () => 
    this.element.removeEventListener('mouseup', this.#handleMouseUp);

  #forwardListener = (e) => this.listener(e,this);
  
  #layerEvents = {
    mouseup : this.#handleMouseUp,
    mouseleave : this.#handleMouseLeave,
    selectstart : this.#handleSelectStart,
    keyup : this.#handleKeyUp
  };

  constructor (element, listener){
   this.element =  element;
   this.listener = listener;
   this.selectedNode = null;
   this.eventName = 'selection';
   this.event = new Event(this.eventName);
   this.element.setAttribute('style', 'padding:1rem;');
   this.element.focus();
   this.dispatch();
  };

  static new(elem, lis){
    return new XSelection(elem, lis);
  };

  handleSelection = () => {
      const { anchorOffset: start, focusOffset: end, focusNode, isCollapsed } = document.getSelection();
      const { data } = focusNode;
      const parsed = data ? data?.slice(end, start)?.trim() || data.slice(start, end)?.trim() : null;
      if (!isCollapsed) this.selectedNode = parsed
      else this.selectedNode = null;
  };

  dispatch = () =>{
    this.element.addEventListener('selectstart', this.#handleSelectStart);
    this.element.addEventListener('keyup', this.#handleKeyUp);
    this.element.addEventListener('mouseleave', this.#handleMouseLeave);
    // the event
    this.element.addEventListener('selection', this.#forwardListener);
  }
  clearEvent = () => {
    for (const key in this.#layerEvents){
      this.element.removeEventListener(key, this.#layerEvents[key])
    }
    this.element.removeEventListener('selection', this.#forwardListener);
  }
}
  
  /***** EXAMPLE USAGE *****/ 
  
  /* // actually, it is a div whose attribute of contenteditable is true
  const div = document.querySelector('.textarea'); 
  XSelection.new(
    div,
    (e, self) => {
    //   console.log(e)       // Event {.....some things go here ...., type : 'selection'}
    //   console.log(self)                // the class
    //   console.log(self.selectedNode)  // the text you'v selected
    //   console.log(self.#timeout)      // not allowed
    //   console.log(self.#isSelecting)  // not allowed
    //   console.log(self.#layerEvents)  // not allowed
    } 
  )
  */