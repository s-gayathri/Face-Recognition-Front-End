import React from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

//taken from particles.js demo website
const particlesOptions = {
  particles: {
    number: { value: 130, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 }
    },
    opacity: {
      value: 1,
      random: false,
      anim: { enable: false, speed: 10, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 1,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    }
  }
}

const initialState = {
  input: "",
  imageUrl: "",
  box: {}, //values we receive from bounding_box
  route: 'signin', //keeps track of where we are on the page
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {}, //values we receive from bounding_box
      route: 'signin', //keeps track of where we are on the page
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ""
      }
    }
  }

  // componentDidMount() {
  //   fetch('http://localhost:3001/')
  //     .then(response => response.json())
  //       .then(console.log);
  // }

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }
    });
  }

  //refer clarifai docs 
  calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return (
        {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
        }
      );

    }

  displayBoundingBox = (box) => {
    this.setState( {box: box} );
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    fetch("http://localhost:3001/imageURL", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: this.state.input })
    })
      .then(response => response.json())
      .then( (response) => {
        if(response)
        {
          fetch("http://localhost:3001/image", {
            method: "put",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ id: this.state.user.id})
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count })) 
            })
            .catch(console.log);
        }
        this.displayBoundingBox(this.calculateFaceLocation(response))
       } )
      .catch( (error) => console.log(error) );
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState);
    } else if(route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }

  render() {
    const { imageUrl, box, route, isSignedIn } = this.state;
    return (
      <div className="App">
        <Particles
          params={particlesOptions}
          className="particles" 
          style= {{width: '100%'}}
          />
        <Navigation onRouteChange={this.onRouteChange} 
          isSignedIn={isSignedIn}/>
        <Logo />
        { route === 'home' ?
            <div>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>  
            : (
            route === 'signin' ?
              <Signin onRouteChange={this.onRouteChange} 
                  loadUser={this.loadUser} />
            : <Register onRouteChange={this.onRouteChange} 
                  loadUser={this.loadUser} />    
            )
        }
      </div>
    );
  }
}

export default App;

//sample1-https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500
//sample2-https://www.byrdie.com/thmb/wGCDTP34_YLdTjZ8mWUbSyTfLic=/500x350/filters:no_upscale():max_bytes(150000):strip_icc()/cdn.cliqueinc.com__cache__posts__274058__face-masks-for-pores-274058-1543791152268-main.700x0c-270964ab60624c5ca853057c0c151091-d3174bb99f944fc492f874393002bab7.jpg