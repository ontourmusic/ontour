import React from 'react'
import { supabase } from './supabaseClient';

const AddNewArtist = ({setOpenArtist,getArtistNames}) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let formDataObject = Object.fromEntries(formData.entries());
        if(formDataObject.name == "" ) {
            alert("Please Enter Artist Name")
            return
        }
        let name = formDataObject.name.charAt(0).toUpperCase() + formDataObject.name.slice(1);
        try {
            const { error } = await supabase
            .from("artists")
            .insert({ name : name, published : formDataObject.published == "on"? true : false });
            if(!error) {
                alert("Artist Added Successfully")
                setOpenArtist(false)
               getArtistNames()
            }
        } catch (error) {
            console.log(error)
        }
       
    }
  return (
    <div>
        <form onSubmit={handleSubmit} className='form-control  d-flex' >
           <input name="name" className='form-control' type="text" placeholder='Enter Artist Name' />
           <input class="form-check-input" type="checkbox" role="switch" name="published"  id="flexSwitchCheckDefault"/>
           <label class="form-check-label" for="flexSwitchCheckDefault">Published</label>
           <button className='btn btn-info' type='submit'>Submit</button>
           <button className='btn btn-danger' onClick={()=>setOpenArtist(false)} type='button'>Close</button>
        </form>
    </div>
  )
}

export default AddNewArtist
