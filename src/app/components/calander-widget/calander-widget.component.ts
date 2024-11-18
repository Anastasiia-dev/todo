import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-calander-widget',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule,],
  providers: [provideNativeDateAdapter()],
  templateUrl: './calander-widget.component.html',
  styleUrl: './calander-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalanderWidgetComponent {

}
