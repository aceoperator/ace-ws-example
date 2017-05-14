import { Component, OnInit } from '@angular/core';
import { Response} from '@angular/http';
import {FormGroup, FormControl} from '@angular/forms';

import {GroupStatusService} from './groupStatus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  numOperatorsAvailable = 0;
  numOperatorsDND = 0;
  queueSize = 0;
  allOperatorsBusy = true;

  group: FormGroup;
  valuesHidden = true;

  constructor(private groupStatusService: GroupStatusService) {
  }

  ngOnInit() {
        this.group = new FormGroup({
          group : new FormControl('operator'),
          address : new FormControl('https://prod001.quik-j.net')
        });
    }

    onSubmit({ value, valid }: { value: any, valid: boolean }) {
      this.valuesHidden = true;
      console.log("Submitted request for group - " + value.group);
      this.groupStatusService.getGroupStatus(value.address, value.group)
        .map(response => response.json())
        .subscribe(
            response => this.handleResponse(response),
            err=>this.handleError(err)
        );
    }

    private handleResponse(response: any) {
      console.info('Received response: ' + JSON.stringify(response));
      this.numOperatorsAvailable = response.numOperatorsAvailable;
      this.numOperatorsDND = response.numOperatorsDND;
      this.queueSize = response.queueSize;
      this.allOperatorsBusy = response.allOperatorsBusy;
      this.valuesHidden = false;
    }

    private handleError(error: Response) {
        window.alert('An error occured invoking the group status service. See the console log for details');
        console.error(error);
    }
}
