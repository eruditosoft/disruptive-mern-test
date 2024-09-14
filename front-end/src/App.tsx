import st from './styles/app.module.css';
import GridContainer from './components/Container/GridContainer';
import BasicModal from './components/Modal/CustomModal';
interface Word {
  adjective: string;
  noun: string;
  verb: string;
}

const words: Word[] = [
  { adjective: "Feliz", noun: "gato", verb: "juega" },
  { adjective: "Azul", noun: "cielo", verb: "brilla" },
  // Agrega más palabras aquí
];

function generateRandomSentence( words: Word[] ): string {
  const randomWord = words[ Math.floor( Math.random() * words.length ) ];
  return `${ randomWord.adjective } ${ randomWord.noun } ${ randomWord.verb }.`;
}

function generateRandomSentences( words: Word[], count: number ): string[] {
  const sentences: string[] = [];
  for ( let i = 0; i < count; i++ ) {
    sentences.push( generateRandomSentence( words ) );
  }
  return sentences;
}
function App() {
  const nombres = generateRandomSentences( words, 59 );
  if ( nombres ) {
    return (
      <div className={ st.container }>
        <header><BasicModal /></header>
        <main>
          <GridContainer>
            { nombres.map( ( it ) => <div style={ { width: "200px", height: "200px", border: "1px solid red" } } key={ it }>
              <h3>
                { it }
              </h3>
            </div>
            ) }
          </GridContainer>
        </main>
        <footer> EruditosSoft 2024</footer>
      </div> );
  }

}

export default App;
