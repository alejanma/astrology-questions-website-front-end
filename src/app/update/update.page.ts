import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NodeService } from '../services/node.service';
import { DataSharingService } from '../services/data-sharing.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  // Input values

  question:string = '';
  answer:string = '';
  id:string = '';

  constructor(private alertController: AlertController,private dataSharing: DataSharingService,private router:Router, private node: NodeService) { 
    this.updateListing();
  }

  ngOnInit() {
    var data = this.router.getCurrentNavigation()?.extras?.state;
    console.log("Displaying data");
    console.log(data);
    data ? this.displayItem(data) : "";

    this.updateListing();
  }

  async presentUpdateAlert()
  {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Your Item was Updated/Upsert',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentDeleteItemAlert()
  {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Your Item was deleted',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentMissingFieldsAlert()
  {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Your are missing fields!Try Again!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentMissingIDAlert()
  {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Your are missing ID!Try Again!',
      buttons: ['OK']
    });

    await alert.present();
  }


  submit()
  {
    
    if(this.question && this.answer && this.id)
    {
      this.updateItem();
      this.router.navigate(['/main']);
      this.updateListing();
      this.presentUpdateAlert();
    }
    else
    {
      this.presentMissingFieldsAlert();
    }

  }


  //Method to set the data from the database
  displayItem(item:any)
  {
    this.question = item.question;
    this.answer = item.answer;
    this.id = item.id;
    console.log("Displaying item");
  }

  updateItem(){
    console.log({CID: this.id,Question:this.question,Answer:this.answer});
    this.node.updateItem({CID: this.id,Question:this.question,Answer:this.answer}).subscribe({
      next: (res:any) => { console.log(res);},
      error: (err:any) => {console.log(err)},
      complete: () => {console.log('Complete');
    } 
    });
    console.log('Updating Item');
  }

  deleteItem()
  {
    if(this.id){
      this.node.deleteItem({CID: this.id}).subscribe({
        next: (res:any) => { console.log(res);},
        error: (err:any) => {console.log(err)},
        complete: () => {console.log('Complete');this.updateListing();
      } 
      });
      this.router.navigate(['/main']);
      this.updateListing();
      this.presentDeleteItemAlert();
    }
    else{
      this.presentMissingIDAlert();
    }
  }


  updateListing()
  {
    this.node.getAllItems({}).subscribe({
      next: (res:any) => { console.log(res);this.dataSharing.setList(res);},
      error: (err:any) => {console.log(err)},
      complete: () => {console.log('Complete')} 
    });
  }
}
