import './App.css'
import { RickMortyTable } from './components/ricky-morty-table'
import { CharacterProvider } from './hooks/character-context'

function App() {

  return (
    <div>
      <CharacterProvider>
          <RickMortyTable />
      </CharacterProvider>
    </div>
  )
}
export default App
