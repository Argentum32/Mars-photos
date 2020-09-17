import React, {useState} from 'react';
import './App.scss';
import error from './emptyError.jpg'

const API_KEY = '7EPauFHRlnq3efbN0Zdjp2UEPzxD7oqfPiGZR7uc'
const hello = <div className="greeting">
              <p>Hello from Mars, dear User.</p>
              <p>On this site you can view photos taken on Mars by three rovers from different cameras on any day of their expedition.</p>
              <p>To do this, you need to select the rover, camera and day (Martian sol). 
                  Then, you need to press the button <code>'Just show it!'</code></p> 
              </div>
  const photoInPage = 12


function App() {

  const [photosPull, setPull] = useState([hello])
  const [rover, setRover] = useState('curiosity')
  const [camera, setCamera] = useState('fhaz')
  const [sol, setSol] = useState(2882)
  const [shownPic, setShownPic] = useState(photoInPage)

  const curiosityCameras = 
    <select className="filter" onChange={(e) => {setCamera(e.target.value)}}>
      <option value="fhaz">Front Hazard Avoidance Camera</option>
      <option value="rhaz">Rear Hazard Avoidance Camera</option>
      <option value="mast">Mast Camera</option>
      <option value="chemcam">Chemistry and Camera Complex</option>
      <option value="mahli">Mars Hand Lens Imager</option>
      <option value="mardi">Mars Descent Imager</option>
      <option value="navcam">Navigation Camera</option>
    </select>
  const opportunityAndSpiritCameras = 
    <select className="filter" onChange={(e) => {setCamera(e.target.value)}}>
      <option value="fhaz">Front Hazard Avoidance Camera</option>
      <option value="rhaz">Rear Hazard Avoidance Camera</option>
      <option value="navcam">Navigation Camera</option>
      <option value="pancam">Panoramic Camera</option>
      <option value="minites">Miniature Thermal Emission Spectrometer</option>
    </select>
  let roverCameras = rover === 'curiosity' ? curiosityCameras : opportunityAndSpiritCameras

  const gettingPhotos = async (e) => {
    e.preventDefault();
    const api_url = await
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${API_KEY}`);
    const data = await api_url.json();
    setPull(() => {return data.photos.map(photo => <img className='photo' src={photo.img_src}/>)})
    setShownPic(photoInPage)
  }

  const renderedPhotos = []

  const renderPhotos = () => {
    if(photosPull.length >= 1){
      for(var i=0; i<shownPic; i++){
      renderedPhotos.push(photosPull[i])
    }} 
    else renderedPhotos.push(<img className='error' src={error}/>);
    if(photosPull.length > 12) renderedPhotos.push(<button className="load-more-btn" onClick={() => setShownPic(shownPic+12)}>Load more</button>)
  }
  renderPhotos()

  return (
    
    <div className="App">
      <form className="form" onSubmit={(e) => {gettingPhotos(e)}}>
        <label>
          Name of the Rover
          <select className="filter" onChange={(e) => {setRover(e.target.value)}}>
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
          </select>
        </label>
        <label>
          Cameras of the Rover
          {roverCameras}   
        </label>
        <label>
          Martian sol
          <input className="filter" type="number" placeholder="Change the Sol" value={sol} min="0" max="2882" onChange={(e) => setSol(e.target.value)} />
        </label>
        <button className="submit-btn">Just show it!</button>
      </form>
      <div>
        <div className="photos">
          {renderedPhotos}
        </div>
        
      </div>
    </div>
  );
}

export default App;
