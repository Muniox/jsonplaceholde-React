import {useState, useEffect} from 'react';
import './App.css';

const getData = async (url = '') => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data[0])
    return data
  }
  catch (error) {
    console.log(error)
  }
}

const PostComponent = (props) => {
  

  return(
   <div className='post'>
      <div className='post__id'>
        User: {props.postItem.userId}
      </div>
      <div className='post__title'>
        {props.postItem.title}
      </div>
    </div> 
  )}

const App = () => {
  const [post, setPost] = useState([]);
  const [timer, setTimer] = useState(10);
  

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(async () => {
      setTimer((seconds) => {
        return seconds - 1;
      });
    }, 1000)
    return () => clearInterval(interval);
    } else {
      setTimer(10);
    }

  }, [timer]
  );

  useEffect(() => {
    const interval = setInterval(async () => {
      setPost(await getData('https://jsonplaceholder.typicode.com/posts'));
    }, 10000)
    return () => clearInterval(interval);
  },[]
  );

  const postHandler = async () => {
    setPost(await getData('https://jsonplaceholder.typicode.com/posts'));
    
  }

  return (
    <div>
      <div className='title-container'>
        <h1>Pobrane Posty:</h1>
        <h3>Odświeżenie za: {timer}</h3>
        <button onClick={postHandler}>
          Get posts  
        </button>
      </div>

      
        {post.map(postItem => {
          return <PostComponent postItem={postItem} key={postItem.id} />
        })} 
    </div>
  );
}

export default App;
