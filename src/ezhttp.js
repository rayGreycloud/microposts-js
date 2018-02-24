/** 
 * ezHTTP Library 
 * Library for making HTTP requests 
 * 
 * @version 3.0.0 
 * @author rayGreycloud 
 * @license MIT 
 *
 **/
 
class ezHTTP {
  
  // GET request 
  async get(url) {
    const response = await fetch(url);  
    const resData =  await response.json();
    
    return resData;
  }
  
  // POST request 
  async post(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    const resData = await response.json();
    
    return resData;  
  }
  
  // PUT request 
  async put(url, data) {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    const resData = await response.json();
    
    return resData;
  }
  
  // DELETE request 
  async delete(url) {
    const response = await fetch(url, {
        method: 'DELETE', 
        headers: {
          'Content-type': 'application/json'
        }        
      });
    const resData = await response.json();
    
    return resData;
  }
}

export const http = new ezHTTP();
