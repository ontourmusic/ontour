import React from 'react'
import { supabase } from './supabaseClient';

const AddNewVenue = ({setOpenVenue,getVenueNames}) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let formDataObject = Object.fromEntries(formData.entries());
        if(formDataObject.name == "" ) {
            alert("Please Enter Venue Name")
            return
        }
        let name = formDataObject.name.charAt(0).toUpperCase() + formDataObject.name.slice(1);
        try {
            const { error } = await supabase
            .from("venues")
            .insert({ name : name, published : formDataObject.published == "on"? true : false });
            if(!error) {
                alert("Venue Added Successfully")
                setOpenVenue(false)
                getVenueNames()
            }
        } catch (error) {
            console.log(error)
        }
       
    }
  return (
    <div>
        <form onSubmit={handleSubmit} className='form-control  d-flex' >
           <input name="name" className='form-control' type="text" placeholder='Enter Venue Name' />
           <input class="form-check-input" type="checkbox" role="switch" name="published"  id="flexSwitchCheckDefault"/>
           <label class="form-check-label" for="flexSwitchCheckDefault">Published</label>
           <button className='btn btn-info' type='submit'>Submit</button>
           <button className='btn btn-danger' onClick={()=>setOpenVenue(false)} type='button'>Close</button>
        </form>
    </div>
  )
}

export default AddNewVenue
