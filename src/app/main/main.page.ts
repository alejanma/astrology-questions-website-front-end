import { Component, OnInit } from '@angular/core';
import { NodeService } from '../services/node.service';
import { DataSharingService } from '../services/data-sharing.service';
import { AlertController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  // Form Fields
  dbName: string = '';
  clName: string = '';
  
  isDBCreated = false;

  constructor(private router: Router, private alertController: AlertController,private dataSharing: DataSharingService, private node:NodeService) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd)
      {
        //console.log('Navigation is done here in HOME PAGE!');
        this.updateListing();
      }
    });
   }

  ngOnInit() {
    this.dataSharing.isDBObserver.subscribe(message => {
        this.isDBCreated = message;
    });
    this.updateListing();
  }

  async presentCreationAlert()
  {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Your Database and Collection was created',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentBatchLoadAlert()
  {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'The list of items were successfully added as documents',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentDeleteAlert()
  {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'All the items in the collection were deleted',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentMissingFieldsAlert()
  {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'You are missing Database or Collection Name. Try Again!',
      buttons: ['OK']
    });

    await alert.present();
  }


  updateListing()
  {
    this.node.getAllItems({}).subscribe({
      next: (res:any) => { console.log(res);this.dataSharing.setList(res);},
      error: (err:any) => {console.log(err)},
      complete: () => {console.log('Complete')} 
    });
  }

  createDBandCollection()
  {
    if(this.dbName && this.clName){
      const params = {db:this.dbName,cl:this.clName};
      console.log(params);
      this.node.createDatabaseAndCollection(params).subscribe({
        next: (res:any) => { console.log(res);/*this.isDBCreated = res.dbIsCreated;*/ this.dataSharing.setIsDBCreated(res.dbIsCreated);},
        error: (err:any) => {console.log(err)},
        complete: () => {console.log('Complete')} 
      });
      this.presentCreationAlert();
    }
    else{
      this.presentMissingFieldsAlert();
    }
  }

  batchLoadData()
  {
    const params = [
      {CID: "00001", Question: "What is a planet?", Answer: "A planet is a celestial body that orbits around a star, is spherical in shape, and has cleared its orbit of other debris."},
      {CID: "00002", Question: "What is a galaxy?", Answer: "A galaxy is a vast collection of stars, gas, and dust held together by gravity. There are billions of galaxies in the universe."},
      {CID: "00003", Question: "What is a comet?", Answer: "A comet is a small celestial body made of ice, rock, and dust that orbits around the Sun. When it gets close to the Sun, it develops a glowing tail."},
      {CID: "00004", Question: "What is a supernova?", Answer: "A supernova is a powerful and energetic explosion that occurs at the end of a star's life. It releases a tremendous amount of energy and can briefly outshine an entire galaxy."},
      {CID: "00005", Question: "What is a black hole?", Answer: "A black hole is a region in space where the gravitational pull is so strong that nothing, including light, can escape. It is formed from the remnants of a massive star that has collapsed."},
      {CID: "00006", Question: "What is a constellation?", Answer: "A constellation is a group of stars that appear to form a pattern in the sky as seen from Earth. Constellations are used as a way to identify and locate stars."},
      {CID: "00007", Question: "What is a light year?", Answer: "A light year is the distance that light travels in one year in the vacuum of space. It is often used to measure the vast distances between celestial objects."},
      {CID: "00008", Question: "What is the Big Bang Theory?", Answer: "The Big Bang Theory is the leading scientific explanation for the origin of the universe. It states that the universe began as a singularity, a tiny, infinitely hot and dense point, about 13.8 billion years ago, and has been expanding and evolving ever since."}
    ];

    this.node.addListOfItems(params).subscribe({
      next: (res:any) => { console.log(res); this.updateListing();},
      error: (err:any) => {console.log(err)},
      complete: () => {console.log('Complete')} 
    });

    //this.updateListing();
    this.presentBatchLoadAlert()
    //alert('Loading all items from file to DB');
  }

  deleteAllItems()
  {
    this.node.deleteAllItem({}).subscribe({
      next: (res:any) => { console.log(res)},
      error: (err:any) => {console.log(err)},
      complete: () => {console.log('Complete'); this.updateListing()} 
    });
    this.presentDeleteAlert();
    this.updateListing();
   //alert('Deleting all items from DB');
  }
}

