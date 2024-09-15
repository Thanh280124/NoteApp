const btn = document.getElementById('btn');
const note = document.getElementById('note');
const app = document.getElementById('app');


getNode().forEach((note) =>{
  const noteElem = createNoteElement(note.id, note.content);
  app.insertBefore(noteElem,btn);
})

function createNoteElement(id,content){
  const element = document.createElement('textarea');
  element.classList.add('note');
  element.placeholder = 'Empty Note';
  element.value = content;


  element.addEventListener('dblclick', ()=>{
    const warning = confirm('Do you want to delete this note?');
   if(warning){
    deleteNote(id, element);
   }
  })

  element.addEventListener('input', ()=>{
    updateNote(id,element.value);
  })
  

return element
}


function addNote(){
  const notes = getNode();
 const noteOBj ={
    id: Math.floor(Math.random() * 10000),
    content: '',
 }
  const noteBox = createNoteElement(noteOBj.id, noteOBj.content);
  app.insertBefore(noteBox,btn);
  notes.push(noteOBj);
  saveNote(notes);
}

function getNode(){
 return JSON.parse(localStorage.getItem('note-app') || '[]')
}


function saveNote(note){
  localStorage.setItem('note-app', JSON.stringify(note));
}

function deleteNote(id, element){
  const notes = getNode().filter((node) => node.id != id);
  saveNote(notes);
  app.removeChild(element)
}


function updateNote(id, content){
  const notes = getNode();
  const target = notes.filter((note) => note.id == id)[0]
  target.content = content;
  saveNote(notes)
}

btn.addEventListener('click',addNote);

