class Utils {
    constructor() {

    }

  /**
   * Returns a Promise which resolves when the user has reached the bottom of the page while
   * scrolling.
   * If an `offset` is specified the promise will resolve before reaching the bottom of
   * the page by the given amount offset in pixels.
   */
    onEndScroll(offset = 0) {

        const promise = new Promise((resolve, reject) => {
          const mdlLayoutElement = document.querySelector('#content'); 
  
          mdlLayoutElement.onscroll = () => {

                if (mdlLayoutElement.scrollTop + window.innerHeight + offset >=
                    mdlLayoutElement.scrollHeight) {

                    
                    console.log('Scroll End Reached!');
                  
                    resolve();
                }
       
          }
       
        }).then(() => {

            console.log('Now watching for Scroll End.');
        }) 

    return promise; 
    }
 }

 export default new Utils();