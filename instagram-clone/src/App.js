import './App.css';
import { useState, useEffect } from 'react';
import Post from './components/Post'
import ImageUpload from './components/ImageUpload'
import { db, auth } from './firebase';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import { Button, Input } from '@material-ui/core';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InstagramEmbed from 'react-instagram-embed';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in
        console.log(authUser)
        setUser(authUser);
      } else {
        // user has logged out...
        setUser(null);
      }
    })

    return () => {
      // perform some cleanup actions
      unsubscribe();
    }
  }, [user, username])

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })
      ));
    })
  }, [])
  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))

    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }
  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <form className='app__signUp'>
            <center>
              <img className='app__headerImage'
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
            </center>

            <Input type="text"
              placeholder='username'
              value={username} onChange={(e) => setUsername(e.target.value)} />

            <Input type="text" placeholder='email' value={email}
              onChange={(e) => setEmail(e.target.value)} />

            <Input type="password" placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <Button type='submit' onClick={signUp}>Sign up</Button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <Box sx={style}>
          <form className='app__signUp'>
            <center>
              <img className='app__headerImage'
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
            </center>

            <Input type="text" placeholder='email' value={email}
              onChange={(e) => setEmail(e.target.value)} />

            <Input type="password" placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <Button type='submit' onClick={signIn}>Sign In</Button>
          </form>
        </Box>
      </Modal>

      <div className='app__header'>
        <img className='app__headerImage'
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />

        {user ? (
          <div>
            <Button onClick={() => auth.signOut()}>Logout</Button>
          </div>

        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>

      <div className="app__posts">
        <div className="app__postLeft">

          {
            posts.map(({ id, post }) => {
              return (
                <Post key={id} postId={id} username={post.username} user={user} caption={post.caption} imageUrl={post.imageUrl} />)
            })
          }
        </div>
        <div className="app__postsRight">

          <InstagramEmbed
            url='https://instagram.fhyd1-4.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p750x750/250807748_476934923850060_2313378595850213701_n.jpg?_nc_ht=instagram.fhyd1-4.fna.fbcdn.net&_nc_cat=1&_nc_ohc=IrPgbCK7DX8AX-E9uKo&edm=AIQHJ4wBAAAA&ccb=7-4&oh=81f03efc8914cfeb3bfefb106c30cbf5&oe=6187A3E5&_nc_sid=7b02f1&ig_cache_key=MjY5NzI3OTg5Mzk4MDgyMjYxNg%3D%3D.2-ccb7-4'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => { }}
            onSuccess={() => { }}
            onAfterRender={() => { }}
            onFailure={() => { }}
          />

        </div>
      </div>


      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to login to Upload</h3>
      )}
    </div>
  );
}

export default App;
