import { Component, Input, OnInit } from '@angular/core';
import { RouterEnum } from 'src/app/core/router/router.enum';
import { RouterService } from 'src/app/core/router/router.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  route = RouterEnum;
  @Input() rotaBotaoHome?: RouterEnum;

  constructor(private router: RouterService) { }

  ngOnInit(): void {
    if(!this.rotaBotaoHome){
      this.rotaBotaoHome = this.route.FEEDV2;
    }
  }

  goTo(){
    this.router.navigate(this.rotaBotaoHome);
  }

}
