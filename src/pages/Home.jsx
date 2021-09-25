import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { title } from "process";
import { useState, useEffect } from "react";
import "./styles.css";
import { MdCancel } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

const Home = () => {
  var [currentEdit, setCurrentEdit] = useState();
  const [edit, setEdit] = useState(false);
  const [items, setItems] = useState([]);
  const [isAdd, setAdd] = useState(false);
  const [img, setImg] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    var name = document.getElementById("eventName").value;
    var about = document.getElementById("about").value;
    var image = img;

    items.push({ name: name, about: about, image: image });
    setItems(items);
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
          <label id="selectImg" htmlFor="img">
            select an image
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            name="image"
            id="img"
            onChange={(e) => {
              setImg(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </div>
        {img ? (
          <div className="img">
            <img src={img} alt="chosen file" />
          </div>
        ) : (
          ""
        )}
        <input
          required
          type="text"
          className="input-field"
          id="eventName"
          placeholder="Event name"
        />
        <textarea
          required
          name="about"
          id="about"
          cols="30"
          rows="10"
          placeholder="About that day..."
        ></textarea>
        <div>
          <IonButton routerLink="/home" type="submit">
            Submit
          </IonButton>
          <IonButton
            onClick={() => {
              setAdd(false);
              setImg(null);
            }}
          >
            Cancel
          </IonButton>
        </div>
      </form>
    );
  };

  // Update
  const handleEdit = (e, id) => {
    e.preventDefault();
    console.log(id);
    var name = document.getElementById("eventName").value;
    var about = document.getElementById("about").value;
    var image = img;
    items.splice(id, 1, { name: name, about: about, image: image });
    setItems(items);
    setImg(null);
    setEdit(false);
  };
  const Update = ({ id }) => {
    return (
      <form
        onSubmit={(e) => {
          handleEdit(e, id);
          setAdd(false);
        }}
      >
        <div>
          <label className="selectImg-prev" htmlFor="img">
            select an image
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            name="image"
            id="img"
            onChange={(e) => {
              setImg(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </div>
        {img ? (
          <div className="img-preview">
            <img src={img} />
          </div>
        ) : (
          ""
        )}
        <input
          required
          type="text"
          className="input-field"
          id="eventName"
          placeholder="Event name"
        />
        <textarea
          required
          name="about"
          id="about"
          cols="30"
          rows="10"
          placeholder="About that day..."
        ></textarea>
        <div id="buttons">
          <IonButton routerLink="/home" type="submit">
            Save
          </IonButton>
        </div>
      </form>
    );
  };

  const handleDelete = () => {
    console.log(currentEdit);
    items.splice(currentEdit, 1);
    setItems(items);
    setImg(null);
    setEdit(false);
  };
  useEffect(() => {
    console.log(currentEdit);
  }, [currentEdit]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Event Gallery App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {
          <div className="App">
            {!isAdd ? (
              <>
                <div className="items">
                  {items.map((e) => {
                    return (
                      <div key={Math.random() * 100000} className="itm">
                        <img src={e.image} alt="No image selected for this event :/" />
                        {edit && currentEdit == items.indexOf(e) ? (
                          <>
                            <span>Name of the event :{e.name}</span>
                            <span>About : {e.about}</span>
                            <Update id={items.indexOf(e)} />
                          </>
                        ) : (
                          ""
                        )}

                        <span id="edit">
                          <IonButton
                            id={items.indexOf(e)}
                            onClick={(e) => {
                              setEdit(!edit);
                              setCurrentEdit(e.target.id);
                              console.log(e.target.id);
                              setImg(null);
                            }}
                          >
                            {edit && currentEdit == items.indexOf(e) ? (
                              <MdCancel />
                            ) : (
                              "Edit"
                            )}
                          </IonButton>
                          {edit && currentEdit == items.indexOf(e) ? (
                            <button
                              id="deleteEvent"
                              onClick={() => handleDelete()}
                            >
                              <AiFillDelete size="26px" />
                            </button>
                          ) : (
                            ""
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <IonButton onClick={() => setAdd(true)}>Add Item</IonButton>
              </>
            ) : (
              ""
            )}

            {isAdd ? <AddItem /> : ""}
          </div>
        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
