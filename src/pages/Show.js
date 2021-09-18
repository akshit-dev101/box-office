import React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom'
import { apiGet } from '../misc/config';

const Show = () => {


const {id} = useParams();
const [show, setShow] = useState(null);
const [isLoading,setIsLoading]=useState(true);
const [error, setError] = useState(null);
    
useEffect(() => {

    let isMounted= true;
    
    apiGet(`/shows/${id}?embeded[]=seasons&embed[]=cast`).then(results=>{
     
            if(isMounted){
            setShow(results);
setIsLoading(false);
console.log(results);}
            
       


    }).catch(err=>{
        if(isMounted){
        setError(err.message);
        setIsLoading(false);
        console.log(show);
        }
    });


return ()=>{

    isMounted=false;
}


}, [id])

if(isLoading){
    return <div>The Data is Loading</div>
}
if(error){
    return <div>Error occured </div>
}

    return (
        <div>
            this is show page
        </div>
    )
}

export default Show
