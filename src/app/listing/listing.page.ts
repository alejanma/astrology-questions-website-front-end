import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NodeService } from '../services/node.service';
import { DataSharingService } from '../services/data-sharing.service';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {

  constructor(private router:Router, private node:NodeService, private dataSharing: DataSharingService) { 
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd)
      {
        //console.log('Navigation is done here!');
      }
    });
  }

  itemList: any[] = [];

  ngOnInit() {
    this.dataSharing.asListObserver.subscribe(
      message => {this.itemList = message;}
    )
    this.updateListing();
  }

  updateListing()
  {
    this.node.getAllItems({}).subscribe({
      next: (res:any) => { console.log(res); this.itemList = res},
      error: (err:any) => {console.log(err)},
      complete: () => {console.log('Complete')} 
    });
  }

  updateQuestion(item:any)
  {
    console.log("The item you are passing is:");
    console.log({id:item.CID,question:item.Question,answer:item.Answer});
    this.router.navigate(['/update'], {state: {id:item.CID,question:item.Question,answer:item.Answer}});
  }
}
