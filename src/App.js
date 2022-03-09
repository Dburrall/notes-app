import NotesList from './Components/NotesList';
import  { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Search from './Components/Search'
import Header from './Components/Header';

const App = () => {
    const [notes, setNotes] = useState([
    {
        id: nanoid(),
        text:"This is my first note!",
        date:"4/05/22",
    },
    {
        id: nanoid(),
        text:"This is my second note!",
        date:"4/05/22",
    },
    {
        id: nanoid(),
        text:"This is my third note!",
        date:"4/05/22",
    },

]);

const [searchText, setSearchText] = useState("");

const [darkMode, setDarkMode] = useState(false);
//retrieves local data from storage
useEffect(()=>{
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data')
    );
    if(savedNotes){
        setNotes(savedNotes);
    }
},[])

//saves to local storage
useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes)
    );
}, [notes])

    const addNote = (text) => {
        const date = new Date();
        const newNote = {
            id:nanoid(),
            text: text,
            date: date.toLocaleDateString(),
        }
        const newNotes = [...notes, newNote];
        setNotes(newNotes);
    };

    const deleteNote = (id) => {
       const newNotes = notes.filter((note) => note.id !== id);
       setNotes(newNotes);
    }

 return (
     <div className={`${darkMode && 'dark-mode'}`}>
      <div className='container'>
          <Header handleToggleDarkMode={setDarkMode} />
    <Search handleSearchNote={setSearchText}/>
     <NotesList 
        notes={notes.filter((note)=> note.text.toLowerCase().includes(searchText)
        )} 
        handleAddNote={addNote}
        handleDeleteNote={deleteNote}
      />
    </div>
 </div>
 );
};

export default App;
