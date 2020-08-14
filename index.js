'use strict';
const store = {
  items: [
    { id: cuid(), name: 'apples', checked: false, rename: false },
    { id: cuid(), name: 'oranges', checked: false, rename: false },
    { id: cuid(), name: 'milk', checked: true, rename: false },
    { id: cuid(), name: 'bread', checked: false, rename: false }
  ],
  hideCheckedItems: false,
};



const generateItemElement = function (item, inputId) {
  let itemTitle = `<span class='shopping-item shopping-item__checked'>${item.name}</span>`;
  if (!item.checked) {
    itemTitle = `
     <span class='shopping-item'>${item.name}</span>
    `;
  }

  return `
    <li class='js-item-element' data-item-id='${item.id}'>
       <label class = 'title' for= 'rename'>${itemTitle}</label>
       <input id= 'rename${inputId}' type= 'text' 
       placeholder= 'Enter new item name'/>
       <button class = 'rename${inputId}'>Rename</button>
      <div class='shopping-item-controls'>
        <button class='shopping-item-toggle js-item-toggle'>
          <span class='button-label'>check</span>
        </button>
        <button class='shopping-item-delete js-item-delete'>
          <span class='button-label'>delete</span>
        </button>
        
      </div>
    </li>`;
};





// function renameItem(){
//   $('main').on('click', 'button.rename' function (event){



//   });
//   //render();
// }





const generateShoppingItemsString = function (shoppingList) {
  //const items = shoppingList.map((index, item) => generateItemElement(item, index));
  let items = [];
  console.log(store.items.length)
  console.log(store.items[0])
  for (let i = 0; i < store.items.length; i++){
    items.push(generateItemElement(store.items[i], i + 1));
  }
  
  return items.join('');
};

/**
 * Render the shopping list in the DOM
 */
const render = function (items) {
  // Set up a copy of the store's items in a local 
  // variable 'items' that we will reassign to a new
  // version if any filtering of the list occurs.
  //let items = [...store.items];
  // If the `hideCheckedItems` property is true, 
  // then we want to reassign filteredItems to a 
  // version where ONLY items with a "checked" 
  // property of false are included.
  console.log(items)
  if (store.hideCheckedItems) {
    items = items.filter(item => !item.checked);
  }


  /**
   * At this point, all filtering work has been 
   * done (or not done, if that's the current settings), 
   * so we send our 'items' into our HTML generation function
   */
  const shoppingListItemsString = generateShoppingItemsString(items);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
};

const addItemToShoppingList = function (itemName) {
  store.items.push({ id: cuid(), name: itemName, checked: false, rename: false });
};

const handleNewItemSubmit = function () {
  $('#js-shopping-list-form').submit(function (event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    render(store.items);
  });
};

const toggleCheckedForListItem = function (id) {
  const foundItem = store.items.find(item => item.id === id);
  foundItem.checked = !foundItem.checked;
};

const handleItemCheckClicked = function () {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    const id = getItemIdFromElement(event.currentTarget);
    toggleCheckedForListItem(id);
    render(store.items);
  });
};

const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.js-item-element')
    .data('item-id');
};

// function rename() {
//   let val = $('li.js-item-element').find('input#rename').val();
// }

function handleRename() {
  $('.rename1, .rename2').on('click', 'button.rename', function (event) {
    let val = $("#rename2").val();
    console.log(val);
    const id = getItemIdFromElement(event.currentTarget)
    console.log(id);
    store.items.forEach( item => {
      if (item.id === id){
        item.name = val;
      }
    });
    //const id = getItemIdFromElement(event.currentTarget);
    //store.items.find(function (key) {
    //  return key.id = val;
   // });
    //console.log(this.closest('li').find(label.title));
    //console.log(store.items)
    render(store.items);
  });
}



/**
 * Responsible for deleting a list item.
 * @param {string} id 
 */
const deleteListItem = function (id) {
  // As with 'addItemToShoppingLIst', this 
  // function also has the side effect of
  // mutating the global store value.
  //
  // First we find the index of the item with 
  // the specified id using the native
  // Array.prototype.findIndex() method. 
  const index = store.items.findIndex(item => item.id === id);
  // Then we call `.splice` at the index of 
  // the list item we want to remove, with 
  // a removeCount of 1.
  store.items.splice(index, 1);
};

const handleDeleteItemClicked = function () {
  // Like in `handleItemCheckClicked`, 
  // we use event delegation.
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    // Get the index of the item in store.items.
    const id = getItemIdFromElement(event.currentTarget);
    // Delete the item.
    deleteListItem(id);
    // Render the updated shopping list.
    console.log(val)
    render(store.items);
  });
};

/**
 * Toggles the store.hideCheckedItems property
 */
const toggleCheckedItemsFilter = function () {
  store.hideCheckedItems = !store.hideCheckedItems;
};

/**
 * Places an event listener on the checkbox 
 * for hiding completed items.
 */
const handleToggleFilterClick = function () {
  $('.js-filter-checked').click(() => {
    toggleCheckedItemsFilter();
    render(store.items);
  });
};

/**
 * This function will be our callback when the
 * page loads. It is responsible for initially 
 * rendering the shopping list, then calling 
 * our individual functions that handle new 
 * item submission and user clicks on the 
 * "check" and "delete" buttons for individual 
 * shopping list items.
 */
const handleShoppingList = function () {
  render(store.items);
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleToggleFilterClick();
  handleRename();
};

// when the page loads, call `handleShoppingList`
$(handleShoppingList);