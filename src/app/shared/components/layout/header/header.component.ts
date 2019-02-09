import { Component, OnInit } from '@angular/core';
import { UtilService } from './../../../services/util/util.service';

/**
 * @author: Shoukath Mohammed
 */
@Component({
  selector: 'cvs-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /**
   * @constructor
   * @param: {util<UtilService>}
   */
  constructor(private util: UtilService) {}

  /**
   * @public
   * @type: method<life cycle hook>
   * @return: void
   * @description: N/A
   */
  public ngOnInit(): void { }

  /**
   * @public
   * @param: {e<any>}
   * @return: void
   * @description: N/A
   */
  public onNavigate(e: any): void {
    this.util.navigateTo();
  }
}
