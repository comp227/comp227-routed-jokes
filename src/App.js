import { useState } from 'react'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <a href='#' style={padding}>jokes</a>
      <a href='#' style={padding}>create new</a>
      <a href='#' style={padding}>about</a>
    </div>
  )
}

const JokeList = ({ jokes }) => (
  <div>
    <h2>jokes</h2>
    <ul>
      {jokes.map(joke => <li key={joke.id} >{joke.content}</li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About jokes app</h2>
    <p>We all need a good laugh here or there</p>

    <em>Software engineering can lead you to the highest of highs and the lowest of lows.  So it is good to commiserate with your programming community on the good the bad and the ugly.</em>

    <p>Software engineering is full of jokes both good and cring, so with this app you can see what's out there and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    <hr/>
    Joke app for <a href='https://comp227.djosv.com/'>COMP 227</a>.
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
  }

  return (
    <div>
      <h2>create a new joke</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

const App = () => {
  const [jokes, setJokes] = useState([
    {
      content: 'Why do most java programmers wear glasses? Because they dont see sharp',
      author: 'Powercat',
      info: 'https://dribbble.com/shots/3153009-Why-do-Java-developers-wear-glasses',
      votes: 0,
      id: 1
    },
    {
      content: 'Why did the programmer quit his job? Because he didnt get arrays',
      author: 'Microsoft',
      info: 'https://www.cnet.com/culture/microsoft-tweets-joke-about-raises/',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (joke) => {
    joke.id = Math.round(Math.random() * 10000)
    setJokes(jokes.concat(joke))
  }

  const jokeById = (id) =>
    jokes.find(j => j.id === id)

  const vote = (id) => {
    const joke = jokeById(id)

    const voted = {
      ...joke,
      votes: joke.votes + 1
    }

    setJokes(jokes.map(j => j.id === id ? voted : j))
  }

  return (
    <div>
      <h1>Software jokes</h1>
      <Menu />
      <JokeList jokes={jokes} />
      <About />
      <CreateNew addNew={addNew} />
      <Footer />
    </div>
  )
}

export default App
