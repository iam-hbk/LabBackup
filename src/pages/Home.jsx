import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { title } from "process";
import { useState } from "react";
import "./styles.css";
import { MdCancel } from "react-icons/md";
const Home = () => {
  const [currentEdit, setCurrentEdit] = useState();
  const [edit, setEdit] = useState(false)
  const [items, setItems] = useState([]);
  const [isAdd, setAdd] = useState(false);
  const [img, setImg] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(img);
    var name = document.getElementById("eventName").value;
    var about = document.getElementById("about").value;
    var image = img;
    items.push({ name: name, about: about, image: image })

    setItems(items);
    console.log(items);
    setImg(null);
  };

  const AddItem = () => {
    return (
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          setAdd(false);
        }}
      >
        <div className="choseIma">
          <label htmlFor="image">Choose an image: </label>
          <input

            type="file"
            name="image"
            id="img"
            onChange={(e) => {
              setImg(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </div>
        <div className="img">
          <img src={img} alt="chosen file" />
        </div>
        <input
          required type="text"
          id="eventName"
          placeholder="Event name"
        />
        <textarea
          required name="about"
          id="about"
          cols="30"
          rows="10"
          placeholder="About that day..."
        ></textarea>
        <div><IonButton routerLink="/home" type="submit">
          Submit
        </IonButton>
          <IonButton onClick={() => { setAdd(false) }}>Cancel</IonButton></div>
      </form>
    );
  };


  // Update

  const handleEdit = (e,id) => {
    e.preventDefault();
    console.log(id);
    var name = document.getElementById("eventName").value;
    var about = document.getElementById("about").value;
    var image = img;

    

  }
  const Update = ({id}) => {
    return (<form
      onSubmit={(e) => {
        handleEdit(e,id);
        setAdd(false);
      }}
    >
      <div className="choseIma">
        <label htmlFor="image">Choose an image: </label>
        <input

          type="file"
          name="image"
          id="img"
          onChange={(e) => {
            setImg(URL.createObjectURL(e.target.files[0]));
          }}
        />
      </div>
      <div className="img">
        <img src={img} alt="chosen file" />
      </div>
      <input
        required type="text"
        id="eventName"
        placeholder="Event name"
      />
      <textarea
        required name="about"
        id="about"
        cols="30"
        rows="10"
        placeholder="About that day..."
      ></textarea>
      <div id="buttons"><IonButton routerLink="/home" type="submit">
        Save
      </IonButton></div>
    </form>)

  }



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Event Gallery App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {<div className="App">
          {!isAdd ? <><div className="items">
            {items.map((e) => {
              return (
                <>
                  <div key={items.indexOf(e)} className="itm">
                    <img src={e.image} alt="eventImg" />
                    {edit ? <>
                      <span>Name of the event :{e.name}</span>
                      <span>About : {e.about}</span><Update id = {items.indexOf(e)} /></> : ""}

                    <span id="cancel"><IonButton id={items.indexOf(e)} onClick={() => setEdit(!edit)}>{edit ? <MdCancel /> : "Edit/Delete"}</IonButton></span>
                  </div>


                </>
              );
            })}
          </div><IonButton onClick={() => setAdd(true)}>Add Item</IonButton></> : ""}

          {isAdd ? <AddItem /> : ""}
        </div>}

      </IonContent>
    </IonPage>
  );
};

export default Home;
