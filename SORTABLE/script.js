const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
];

const listItems = [];

let dragStartIndex;

createList();

function createList() {
  [...richestPeople]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');

      //listItem.classList.add('wrong');

      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
    <p class="person-name">${person}</p>
    <i class="fas fa-grip-lines"></i>
    </div>
    `;

      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  //console.log('Event:', 'dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}
function dragEnter() {
  //console.log('Event:', 'dragenter');

  this.classList.add('over');
}
function dragLeave() {
  //console.log('Event:', 'dragleave');
  this.classList.remove('over');
}
function dragOver(e) {
  // console.log('Event:', 'dragover');

  e.preventDefault();
}
function dragDrop() {
  // console.log('Event:', 'drop');

  const dragEndIndex = this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
  });
  dragListItems.forEach(item => {
    item.addEventListener('drop', dragDrop);
  });
  dragListItems.forEach(item => {
    item.addEventListener('dragenter', dragEnter);
  });
  dragListItems.forEach(item => {
    item.addEventListener('dragleave', dragLeave);
  });
}

//바꾸고나서 그때마다 버튼을 눌러줘야하는데 바로바로 되는 방법은 없나?

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

check.addEventListener('click', checkOrder);
