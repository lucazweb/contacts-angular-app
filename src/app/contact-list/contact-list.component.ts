import { Component, OnInit } from '@angular/core';
import { ContactService  } from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  providers: [ContactService]
})
export class ContactListComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.getContacts();
  }

  contacts: Contact[];
  message: String;

  contact: Contact = new Contact();


  newContact(contact){
    this.contactService.newContact(contact)
      .then(res => {
        console.log(res);
        this.getContacts();
      })
  }

  getContacts(): void {
    this.contactService.getContacts().subscribe(data =>  this.contacts = data);
  }

  deleteContact(id: number){
    this.contactService.deleteContact(id)
      .then(res => {
        console.log(res);
        this.getContacts();
      });
  }

}
