import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

  constructor(private _http: Http) { }

  newContact(contact){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

     return this._http.post('http://localhost:3000/new-contact', contact, options)
      .toPromise()
      // .then(res => res.json())
      // .catch(err => { console.log(err)})
  }

  getContacts(){
    return this._http.get('http://localhost:3000/contacts')
      .map((res:Response) => res.json());
  }

  deleteContact(id: number){
    return this._http.delete(`http://localhost:3000/contact/${id}`)
		 	.toPromise()
		 	.then(res => res.json())
      .catch(err => {console.log(err)})
  }

  addContactDetail(contactDetail){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(`http://localhost:3000/update-contact-detail/${contactDetail.ownerId}`, contactDetail, options)
    .toPromise()
  }

  deleteContactDetail(id: number, ownerId: number){
    return this._http.delete(`http://localhost:3000/delete-contact-detail/${ownerId}/${id}`)
		 	.toPromise()
  }

}
