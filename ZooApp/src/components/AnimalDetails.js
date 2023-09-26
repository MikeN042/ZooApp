import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../hooks/useFetch";
import FeedingList from "./FeedingList"


const AnimalDetails = ({animalData}) => {
    const {id} = useParams();
    const {data: animal,isLoading,error} = useFetch(`http://localhost:8080/animal/${id}`);
    const {refresh} = animalData;
    const history = useHistory();

    const handleDelete = () => {
        fetch(`http://localhost:8080/animal/delete/${id}`,{
            method:"DELETE"
        }).then(()=>{
            refresh();
            history.push('/');
        })
    }
    
    return (
        <div className='animal-details'>
            {error &&  <div>{error}</div>}
            {isLoading && <div>Loading...</div>}
            {animal && (
                <div className="container text-center">
                    <h1>{animal.name}</h1>
                <div className="row row-cols-3">
                    <div className="col">
                        <span >Enclosure</span> 
                        <p>{animal.enclosure}</p>
                    </div>
                    <div className="col">
                    <span > Temperament</span>
                        <p className={animal.temperamentWarning === 1 ?"animal-warning":""}>{animal.temperament}</p>
                    </div>
                    <div className="col">
                    <span >Species</span>
                        <p>{animal.species}</p>
                    </div>
                    <div className="col">
                    <span >Age</span>
                        <p>{animal.age}</p>
                    </div>
                    <div className="col">
                    <span >Keeper</span>
                        <p>{animal.keeperFirstName}</p>
                    </div>
                </div>
                <button onClick={handleDelete}>Delete Animal</button>
                <FeedingList id={animal.id} keeperID={animal.keeperID} animalData={animalData}/>
                </div>

            )}
        </div>
    )
 }
 export default AnimalDetails;