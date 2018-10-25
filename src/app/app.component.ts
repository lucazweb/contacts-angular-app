import { Component, OnInit} from '@angular/core';
import { ContactService  } from './contact.service';
import { Contact } from './contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ContactService],
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor(private contactService: ContactService)
  { }

  contacts: Contact[] = [];
  message: String;
  contact: Contact = new Contact();
  currentContact = new Contact();
  newContactDetail = {};

  ngOnInit() {
    this.getContacts();
  }

  newContact(contact){
    this.contactService.newContact(contact)
      .then(res => {
        this.contact = new Contact();
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

  selectContact(contact){
    console.log(contact);
    this.currentContact = contact;
    // this.newContactDetail.name = this.currentContact.nome;
    // this.newContactDetail.ownerId = this.currentContact.id;
  }

  addDetail(newContactDetail){
    console.log(newContactDetail);
    newContactDetail.ownerId = this.currentContact.id;
    this.contactService.addContactDetail(newContactDetail)
      .then((res)=> {
        console.log(res);
        let contactIndex = this.contacts.findIndex(contact => contact.id == this.currentContact.id);
        this.contacts[contactIndex].contatos.push(newContactDetail);

      });
  }

  deleteContactDetail(contactDetailId){
    console.log('Id do contato a ser deletado', contactDetailId);
    this.contactService.deleteContactDetail(contactDetailId, this.currentContact.id)
      .then((res)=> {
        let contactIndex = this.contacts.findIndex(contact => contact.id == this.currentContact.id);
        this.contacts[contactIndex].contatos = this.contacts[contactIndex].contatos.filter(detail => detail.id !== contactDetailId);
      });
  }



}
