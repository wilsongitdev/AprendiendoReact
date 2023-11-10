import './App.css'
import WithTailwind from './components/withtailwind'
import WithCss from './components/withcss'
import logotest from './assets/logo.svg'
function App() {

  return (
    <>
      <WithTailwind logotest={logotest}/>  
      <WithCss logotest={logotest}/>
      <div className='p-6 max-w-sm rounded-sm bg-white items-center space-x-3'>
        <div className='text-black hover:bg-red-700 text-center'>
            hola q
        </div>
        
      </div>
    </>
  )
}

export default App
