import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private http:HttpClient) { }

  createDatabaseAndCollection(params: any)
  {    
   return this.http.get('http://localhost:8887/createDBandCollection/',{params});
  }

  addListOfItems(params: any)
  {
    return this.http.post('http://localhost:8887/addListOfItems/',{params});
  }

  getAllItems(params: any)
  {
    return this.http.get('http://localhost:8887/getItemsList/',{params});
  }

  deleteItem(params: any)
  {
    return this.http.delete('http://localhost:8887/deleteItem/',{params});
  }

  deleteAllItem(params: any)
  {
    return this.http.delete('http://localhost:8887/deleteAll/',{params});
  }

  updateItem(params: any)
  {
    return this.http.put('http://localhost:8887/updateItem/',{params});
  }

}
