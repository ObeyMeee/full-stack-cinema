import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-icon-text',
  templateUrl: './icon-text.component.html',
  styleUrls: ['./icon-text.component.css']
})
export class IconTextComponent {
  @Input() linkRef!: string[];
  @Input() iconClass!: string;
  @Input() label!: string;
}
