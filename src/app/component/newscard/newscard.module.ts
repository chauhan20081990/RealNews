import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewscardComponent } from './newscard.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
    ],
    declarations: [
        NewscardComponent
    ],
    exports: [
        NewscardComponent
    ]
})
export class NewscardModule { }