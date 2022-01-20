import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getApi = async (url, data, token) => {
  console.log("url", url)
  try {
    let response = await axios.get(data ? url + data : url, {
      headers: {
        "Accept": "application/json",
        'Authorization': `Bearer ${token}`, 
      },
     
    })
    if (response.status == 200) {
      return Promise.resolve({
        status: 'success',
        data: response.data
      })
    }
  } catch (e) {
    console.log("url getApi error", e)
    return Promise.reject(e)
  }
}

export const postApi = async (url, data, auth) => {
  console.log("postApi", url, data, token)

  try {
    let response = await axios.post(url, data, {
      headers: {
       'Content-Type': 'application/json',
        "Accept": "application/json",
        'Authorization': `Bearer ${auth}`, 
      }
    })
    if (response.status == 200) {
      // console.log(response,"hghgg")
      return Promise.resolve({
        status: 'success',
        data: response.data
      })

    }
  } catch (e) {
    console.log("postApi",e)
    return Promise.reject(e)
  }
}


export const saveApi = async (url, data, auth) => {
  try {
    let response = await axios.post(url, data, {
      headers: {
       'Content-Type': 'multipart/form-data',
        "Accept": "application/json",
        'Authorization': `Bearer ${auth}`, 
      }
    })
    if (response.status == 200) {
      return Promise.resolve({
        status: 'success',
        data: response.data
      })
    }
  } catch (e) {
    return Promise.reject(e)
  }
}

// fetch("http://soplush.ingicweb.com/soplush/auth/signup.php?action=signup_customer", {
//                     method: 'POST',
//                     // dataType: "json",
//                     headers: {
//                         'Accept': 'application/json',
//                         'Content-Type': 'multipart/form-data'
//                     },
//                     body: formData
//                 }).then(res => res.json())

module.exports = {
  postApi,
  getApi,
  saveApi

}