import axios from "axios"
import { notifyError } from "./ToastifyMessages"

const baseURL = "https://carbon-aware-api.azurewebsites.net"

export const getCurrentIntensity = async ()=>{
    try{
    const response = await axios.get(baseURL+'/emissions/bylocation',
    {
        params : 
        {
            location: 'eastus',
        }
    })
    return response.data[0].rating
    
    }catch(e){
        notifyError("Failed to get current intensity")
        return 0
    }
}


export const getAverageIntensity = async ()=>{
    const endTime = new Date()
    const startTime =  new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
    try{
    const response = await axios.get(baseURL+'/emissions/average-carbon-intensity',
    {
        params : 
        {
            location: 'eastus',
            startTime: startTime.toISOString() ,
            endTime: endTime.toISOString(), 
        }
    })
    return response.data.carbonIntensity
    
    }catch(e){
        notifyError("Failed to get current intensity")
        return 0
    }
}

