import React, { useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Card } from 'antd';
import './App.css';
import { Input,Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';


function App() {
  const [name,setName]=useState('');
  const [username,setUsername]=useState('');
  const [followers,setFollowers]=useState('');
  const [following,setFollowing]=useState('');
  const [repos,setRepos]=useState('');
  const [gist,setGist]=useState('');
  const [email,setEmail]=useState('');
  const [bio,setBio]=useState('');
  const [loc,setLoc]=useState('');
  const [avatar,setAvatar]=useState('');
  const [userInput,setUserInput]=useState('');
  const [error,setError]=useState(null);
   
  useEffect(() => {
    fetch('https://api.github.com/users/vabhishek-me')
    .then(res => res.json())
    .then(data => {
      setData(data)
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const setData=({
    name,
    login,
    followers,
    following,
    public_repos,
    public_gists,
    email,
    bio,
    location,
    avatar_url
  }) => { 
  setName(name);
  setUsername(login);
  setFollowers(followers);
  setFollowing(following);
  setRepos(public_repos);
  setGist(public_gists);
  setEmail(email);
  setBio(bio);
  setLoc(location);
  setAvatar(avatar_url);
  };

const handleSearch = (e) => {
  setUserInput(e.target.value)
}
const handleSubmit = () =>
{
  fetch(`https://api.github.com/users/${userInput}`)
  .then(res => res.json())
  .then(data => {
    if(data.message){
      setError(data.message)
    }
    else{
      setData(data);
    }
    
  })
}


  return (
    <div className="App">
      <div className='navbar'>Github Compare</div>
      
      
      <div className='search'>
      
      <Input size="large" placeholder="Enter username" prefix={<UserOutlined />} onChange={handleSearch} />
    
    <Button type="primary" onClick={handleSubmit}>search</Button>
    
    <hr/>

    </div>
    {error ? (<h1> {error} </h1>):(
        <div className="card">
      
      
        <Card title="Details"  style={{ width: 300 }}>
        <div className="custom-image">
          <img alt="example" width="100%" src={avatar} />
        </div>
        <div>
      <p>Name:      {name}</p>
      <p>Login as:     {username}</p>
      <p>followers: {followers}</p>
      <p>following: {following}</p>
      <p>Repos:     {repos}</p>
      <p>Gist:      {gist}</p>
      <p>Email:     {email}</p>
      <p>Bio:     {bio}</p>
      <p>location:  {loc}</p>
          
          </div>
        </Card>
        
    
            
              
           
          </div>


    )}
    

    
    
    </div>
  );
}

export default App;
