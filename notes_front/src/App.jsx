import './App.css'

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T17:30:31.098Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  }
]

function App() {

  return (
    <div>
      {
        notes.map((notes)=> {
          return notes.id
        })
      }
    </div>
  )
}

export default App
