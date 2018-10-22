import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class ContactService {

  constructor(private _http: Http) { }

  getContacts(){
    return this._http.get('http://localhost:3000/contacts')
      .map((res:Response) => res.json());
  }

  deleteContact(id: number){
    return this._http.delete(`http://localhost:3000/contact/${id}`)
		 	.toPromise()
		 	.then(res => res.json().data)
      .catch(err => {console.log(err)})
  }

}
